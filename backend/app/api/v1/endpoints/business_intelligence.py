# """
# Business Intelligence API endpoints - Aligned with SupaGent implementation

# Provides comprehensive business intelligence data access with search capabilities,
# scraped content management, and intelligence bundle retrieval.
# """

# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from typing import Optional, List
# import logging

# from app.core.database import get_db
# from app.schemas.business_intelligence import (
#     BusinessIntelligenceResponse,
#     BusinessIntelligenceSearchRequest,
#     BusinessIntelligenceSearchResponse,
#     BusinessIntelligenceProfileResponse,
# )

# logger = logging.getLogger(__name__)

# router = APIRouter()


# @router.get("/domain/{domain_id}", response_model=BusinessIntelligenceResponse)
# async def get_business_intelligence(
#     domain_id: str,
#     db: Session = Depends(get_db)
# ):
#     """
#     Get comprehensive business intelligence data for a specific domain.

#     Returns complete intelligence bundle including scraped content, lead profile,
#     and enrichment data - aligned with SupaGent's IntelligenceBundle structure.
#     """
#     try:
#         # Use fixed table name for security - no dynamic table name injection
#         from sqlalchemy import text as sql_text

#         query = sql_text("""
#             SELECT * FROM business_intelligence
#             WHERE domain_id = :domain_id
#             LIMIT 1
#         """)
#         result = db.execute(query, {"domain_id": domain_id})

#         row = result.fetchone()

#         if not row:
#             logger.info(f"No business intelligence data found for domain_id: {domain_id}")
#             raise HTTPException(
#                 status_code=404,
#                 detail=f"No business intelligence data found for domain {domain_id}"
#             )

#         # Convert to dict and build comprehensive response
#         data = dict(row)
#         data['domain_id'] = domain_id
#         data['domain'] = domain_id  # domain_id and domain are the same in our simplified structure

#         logger.info(f"Successfully retrieved business intelligence for domain_id: {domain_id}")
#         return BusinessIntelligenceResponse(data=data)

#     except HTTPException:
#         raise
#     except Exception as e:
#         logger.error(f"Error retrieving business intelligence for domain {domain_id}: {str(e)}")
#         raise HTTPException(
#             status_code=500,
#             detail="Internal server error retrieving business intelligence"
#         )


# @router.post("/search/{domain}", response_model=BusinessIntelligenceSearchResponse)
# async def search_business_intelligence(
#     domain: str,
#     request: BusinessIntelligenceSearchRequest,
#     db: Session = Depends(get_db)
# ):
#     """
#     Search business intelligence content for a specific domain.

#     Uses vectorized content search to find relevant information within scraped content.
#     Aligned with SupaGent's search_business_intelligence tool.
#     """
#     try:
#         # In a full implementation, this would use vector similarity search
#         # For now, we'll do a simple text search in scraped content
#         query = request.query.lower()
#         content_types = request.content_types or ['services', 'about', 'team', 'blog', 'general']
#         limit = request.limit

#         # Search in business intelligence content (simplified for security)
#         from sqlalchemy import text as sql_text

#         search_query = sql_text("""
#             SELECT company_name, industry, description, key_products, pain_points, goals
#             FROM business_intelligence
#             WHERE domain_id = :domain_id
#               AND (
#                 LOWER(company_name) LIKE :query_pattern
#                 OR LOWER(industry) LIKE :query_pattern
#                 OR LOWER(description) LIKE :query_pattern
#               )
#             LIMIT 1
#         """)

#         search_result = db.execute(search_query, {
#             "domain_id": domain,
#             "query_pattern": f"%{query}%"
#         })

#         rows = search_result.fetchall()

#         results = []
#         for row in rows:
#             company_name, industry, description, key_products, pain_points, goals = row

#             # Create content snippet from description
#             content = description or ""
#             content_lower = content.lower()
#             query_pos = content_lower.find(query)
#             if query_pos >= 0:
#                 start = max(0, query_pos - 100)
#                 end = min(len(content), query_pos + len(query) + 100)
#                 snippet = "..." + content[start:end] + "..."
#             else:
#                 snippet = content[:200] + "..."

#             results.append({
#                 "domain": domain,
#                 "content_type": "business_info",
#                 "title": f"{company_name} - {industry}",
#                 "url": f"https://{domain}",
#                 "content_snippet": snippet,
#                 "relevance_score": None,  # Would be calculated in vector search
#                 "metadata": {
#                     "company_name": company_name,
#                     "industry": industry,
#                     "key_products": key_products,
#                     "pain_points": pain_points,
#                     "goals": goals
#                 }
#             })

#         return BusinessIntelligenceSearchResponse(
#             results=results,
#             total_results=len(results),
#             query=request.query,
#             domain=domain
#         )

#     except Exception as e:
#         logger.error(f"Error searching business intelligence for domain {domain}: {str(e)}")
#         raise HTTPException(
#             status_code=500,
#             detail="Internal server error searching business intelligence"
#         )


# @router.get("/profile/{domain}", response_model=BusinessIntelligenceProfileResponse)
# async def get_business_profile(
#     domain: str,
#     db: Session = Depends(get_db)
# ):
#     """
#     Get comprehensive business profile and intelligence summary.

#     Returns structured business information including services, team, about information,
#     and contact details - aligned with SupaGent's get_business_profile tool.
#     """
#     try:
#         # Get basic business intelligence data
#         bi_response = await get_business_intelligence(domain, db)
#         bi_data = bi_response.data

#         # Get additional content for profile (simplified and secure)
#         from sqlalchemy import text as sql_text

#         content_query = db.execute(sql_text("""
#             SELECT 'business_info' as content_type, COUNT(*) as count
#             FROM business_intelligence
#             WHERE domain_id = :domain_id
#         """), {"domain_id": domain})

#         content_stats = dict(content_query.fetchall())

#         # Build comprehensive profile similar to SupaGent's implementation
#         profile = {
#             "BUSINESS PROFILE": domain.upper(),
#             "COMPANY INFORMATION": {
#                 "Name": bi_data.company_name or "Unknown",
#                 "Industry": bi_data.industry or "Unknown",
#                 "Location": bi_data.location or "Unknown",
#                 "Email": getattr(bi_data, "primary_email", "Not found"),
#                 "Source": getattr(bi_data, "source", "Unknown")
#             }
#         }

#         # Add services information
#         if bi_data.key_products:
#             profile["SERVICES"] = bi_data.key_products[:3]  # Limit to 3 items

#         # Add about information
#         if bi_data.description:
#             profile["ABOUT"] = bi_data.description[:500] + "..." if len(bi_data.description) > 500 else bi_data.description

#         # Add team information if available in decision makers
#         if bi_data.decision_makers:
#             team_info = []
#             for dm in bi_data.decision_makers[:3]:  # Limit to 3
#                 if dm.get("name"):
#                     team_info.append(f"{dm['name']} ({dm.get('role', 'Unknown Role')})")
#             if team_info:
#                 profile["TEAM"] = team_info

#         # Add scraped content summaries if available
#         if bi_data.scraped_content:
#             for content_type, items in bi_data.scraped_content.items():
#                 if items and len(items) > 0:
#                     content_type_upper = content_type.upper()
#                     if content_type_upper not in profile:
#                         # Combine first few items
#                         combined_content = " ".join([item["content"][:200] for item in items[:2]])
#                         if combined_content:
#                             profile[content_type_upper] = combined_content[:500] + "..." if len(combined_content) > 500 else combined_content

#         # Determine intelligence availability
#         intelligence_available = bi_data.intelligence_bundle is not None
#         content_types_available = list(content_stats.keys()) if content_stats else []

#         # Agent configuration status (would check for agent files in full implementation)
#         agent_configured = False  # Simplified for our implementation

#         return BusinessIntelligenceProfileResponse(
#             profile=profile,
#             domain=domain,
#             intelligence_available=intelligence_available,
#             agent_configured=agent_configured,
#             content_types_available=content_types_available,
#             last_updated=bi_data.intelligence_bundle.generated_at if bi_data.intelligence_bundle else None
#         )

#     except HTTPException as e:
#         if e.status_code == 404:
#             # Return empty profile for domains without data
#             return BusinessIntelligenceProfileResponse(
#                 profile={"BUSINESS PROFILE": domain.upper(), "STATUS": "No intelligence data available"},
#                 domain=domain,
#                 intelligence_available=False,
#                 agent_configured=False,
#                 content_types_available=[]
#             )
#         raise
#     except Exception as e:
#         logger.error(f"Error retrieving business profile for domain {domain}: {str(e)}")
#         raise HTTPException(
#             status_code=500,
#             detail="Internal server error retrieving business profile"
#         )


# @router.get("/health")
# async def business_intelligence_health():
#     """Health check for business intelligence endpoints"""
#     return {"status": "healthy", "service": "business-intelligence-api"}
