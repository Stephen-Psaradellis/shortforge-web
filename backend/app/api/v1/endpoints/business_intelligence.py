"""
Business Intelligence API endpoints - Aligned with SupaGent implementation

Provides comprehensive business intelligence data access with search capabilities,
scraped content management, and intelligence bundle retrieval.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional, List
import logging

from app.core.database import get_db
from app.schemas.business_intelligence import (
    BusinessIntelligenceResponse,
    BusinessIntelligenceSearchRequest,
    BusinessIntelligenceSearchResponse,
    BusinessIntelligenceProfileResponse,
)

logger = logging.getLogger(__name__)

router = APIRouter()


@router.get("/domain/{domain_id}", response_model=BusinessIntelligenceResponse)
async def get_business_intelligence(
    domain_id: str,
    db: Session = Depends(get_db)
):
    """
    Get comprehensive business intelligence data for a specific domain.

    Returns complete intelligence bundle including scraped content, lead profile,
    and enrichment data - aligned with SupaGent's IntelligenceBundle structure.
    """
    try:
        # Discover business intelligence tables
        tables_result = db.execute("""
            SELECT table_name
            FROM information_schema.columns
            WHERE column_name = 'domain_id'
              AND table_schema = 'public'
            ORDER BY table_name;
        """)

        tables = tables_result.fetchall()

        if not tables:
            logger.warning("No tables with domain_id column found")
            raise HTTPException(
                status_code=404,
                detail="No business intelligence data tables found"
            )

        # Try to find business_intelligence table first, then fallback to any table with domain_id
        business_tables = [
            row[0] for row in tables
            if any(keyword in row[0].lower() for keyword in ['business', 'intelligence', 'company'])
        ]

        table_name = business_tables[0] if business_tables else tables[0][0]

        # Query the main business intelligence data
        result = db.execute(f"""
            SELECT * FROM {table_name}
            WHERE domain_id = :domain_id
            LIMIT 1;
        """, {"domain_id": domain_id})

        row = result.fetchone()

        if not row:
            logger.info(f"No business intelligence data found for domain_id: {domain_id}")
            raise HTTPException(
                status_code=404,
                detail=f"No business intelligence data found for domain {domain_id}"
            )

        # Convert to dict and build comprehensive response
        data = dict(row)
        data['domain_id'] = domain_id
        data['domain'] = domain_id  # domain_id and domain are the same in our simplified structure

        # Try to load additional intelligence bundle data if available
        # This would come from more advanced tables in a full SupaGent implementation
        intelligence_bundle = None
        scraped_content = None

        try:
            # Check for scraped content (would be in a separate table in full implementation)
            scraped_result = db.execute("""
                SELECT content_type, url, title, content, metadata_json, scraped_at
                FROM scraped_contents
                WHERE domain_id = (
                    SELECT id FROM business_domains WHERE domain = :domain
                )
                ORDER BY content_type, scraped_at DESC
            """, {"domain": domain_id})

            scraped_rows = scraped_result.fetchall()
            if scraped_rows:
                scraped_content = {}
                for row in scraped_rows:
                    content_type = row[0]
                    if content_type not in scraped_content:
                        scraped_content[content_type] = []

                    scraped_content[content_type].append({
                        "url": row[1],
                        "title": row[2],
                        "content": row[3],
                        "content_type": content_type,
                        "metadata": row[4] or {},
                        "scraped_at": row[5].isoformat() if row[5] else None
                    })

        except Exception as e:
            logger.debug(f"Could not load scraped content for {domain_id}: {e}")
            # Continue without scraped content

        # Build comprehensive response
        comprehensive_data = {
            **data,
            "intelligence_bundle": intelligence_bundle,
            "scraped_content": scraped_content
        }

        logger.info(f"Successfully retrieved comprehensive business intelligence for domain_id: {domain_id}")
        return BusinessIntelligenceResponse(data=comprehensive_data)

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving business intelligence for domain {domain_id}: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Internal server error retrieving business intelligence"
        )


@router.post("/search/{domain}", response_model=BusinessIntelligenceSearchResponse)
async def search_business_intelligence(
    domain: str,
    request: BusinessIntelligenceSearchRequest,
    db: Session = Depends(get_db)
):
    """
    Search business intelligence content for a specific domain.

    Uses vectorized content search to find relevant information within scraped content.
    Aligned with SupaGent's search_business_intelligence tool.
    """
    try:
        # In a full implementation, this would use vector similarity search
        # For now, we'll do a simple text search in scraped content
        query = request.query.lower()
        content_types = request.content_types or ['services', 'about', 'team', 'blog', 'general']
        limit = request.limit

        # Search in scraped content
        search_result = db.execute("""
            SELECT content_type, url, title, content, metadata_json
            FROM scraped_contents sc
            JOIN business_domains bd ON sc.domain_id = bd.id
            WHERE bd.domain = :domain
              AND sc.content_type = ANY(:content_types)
              AND LOWER(sc.content) LIKE :query_pattern
            ORDER BY sc.scraped_at DESC
            LIMIT :limit
        """, {
            "domain": domain,
            "content_types": content_types,
            "query_pattern": f"%{query}%",
            "limit": limit
        })

        rows = search_result.fetchall()

        results = []
        for row in rows:
            content_type, url, title, content, metadata = row

            # Create content snippet around the query
            content_lower = content.lower()
            query_pos = content_lower.find(query)
            if query_pos >= 0:
                start = max(0, query_pos - 100)
                end = min(len(content), query_pos + len(query) + 100)
                snippet = "..." + content[start:end] + "..."
            else:
                snippet = content[:200] + "..."

            results.append({
                "domain": domain,
                "content_type": content_type,
                "title": title,
                "url": url,
                "content_snippet": snippet,
                "relevance_score": None,  # Would be calculated in vector search
                "metadata": metadata or {}
            })

        return BusinessIntelligenceSearchResponse(
            results=results,
            total_results=len(results),
            query=request.query,
            domain=domain
        )

    except Exception as e:
        logger.error(f"Error searching business intelligence for domain {domain}: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Internal server error searching business intelligence"
        )


@router.get("/profile/{domain}", response_model=BusinessIntelligenceProfileResponse)
async def get_business_profile(
    domain: str,
    db: Session = Depends(get_db)
):
    """
    Get comprehensive business profile and intelligence summary.

    Returns structured business information including services, team, about information,
    and contact details - aligned with SupaGent's get_business_profile tool.
    """
    try:
        # Get basic business intelligence data
        bi_response = await get_business_intelligence(domain, db)
        bi_data = bi_response.data

        # Build comprehensive profile similar to SupaGent's implementation
        profile = {
            "BUSINESS PROFILE": domain.upper(),
            "COMPANY INFORMATION": {
                "Name": bi_data.company_name or "Unknown",
                "Industry": bi_data.industry or "Unknown",
                "Location": bi_data.location or "Unknown",
                "Email": getattr(bi_data, "primary_email", "Not found"),
                "Source": getattr(bi_data, "source", "Unknown")
            }
        }

        # Add services information
        if bi_data.key_products:
            profile["SERVICES"] = bi_data.key_products[:3]  # Limit to 3 items

        # Add about information
        if bi_data.description:
            profile["ABOUT"] = bi_data.description[:500] + "..." if len(bi_data.description) > 500 else bi_data.description

        # Add team information if available in decision makers
        if bi_data.decision_makers:
            team_info = []
            for dm in bi_data.decision_makers[:3]:  # Limit to 3
                if dm.get("name"):
                    team_info.append(f"{dm['name']} ({dm.get('role', 'Unknown Role')})")
            if team_info:
                profile["TEAM"] = team_info

        # Add scraped content summaries if available
        if bi_data.scraped_content:
            for content_type, items in bi_data.scraped_content.items():
                if items and len(items) > 0:
                    content_type_upper = content_type.upper()
                    if content_type_upper not in profile:
                        # Combine first few items
                        combined_content = " ".join([item["content"][:200] for item in items[:2]])
                        if combined_content:
                            profile[content_type_upper] = combined_content[:500] + "..." if len(combined_content) > 500 else combined_content

        # Determine intelligence availability
        intelligence_available = bi_data.intelligence_bundle is not None
        content_types_available = list(bi_data.scraped_content.keys()) if bi_data.scraped_content else []

        # Agent configuration status (would check for agent files in full implementation)
        agent_configured = False  # Simplified for our implementation

        return BusinessIntelligenceProfileResponse(
            profile=profile,
            domain=domain,
            intelligence_available=intelligence_available,
            agent_configured=agent_configured,
            content_types_available=content_types_available,
            last_updated=bi_data.intelligence_bundle.generated_at if bi_data.intelligence_bundle else None
        )

    except HTTPException as e:
        if e.status_code == 404:
            # Return empty profile for domains without data
            return BusinessIntelligenceProfileResponse(
                profile={"BUSINESS PROFILE": domain.upper(), "STATUS": "No intelligence data available"},
                domain=domain,
                intelligence_available=False,
                agent_configured=False,
                content_types_available=[]
            )
        raise
    except Exception as e:
        logger.error(f"Error retrieving business profile for domain {domain}: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Internal server error retrieving business profile"
        )


@router.get("/health")
async def business_intelligence_health():
    """Health check for business intelligence endpoints"""
    return {"status": "healthy", "service": "business-intelligence-api"}
