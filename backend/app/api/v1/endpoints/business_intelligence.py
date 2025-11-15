"""
Business intelligence endpoints
"""

from typing import Any, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.core.database import get_db
from app.services.pitch import pitch_service

router = APIRouter()


@router.get("/domain/{domain_id}")
async def get_business_intelligence_by_domain(
    *,
    db: Session = Depends(get_db),
    domain_id: str,
) -> Any:
    """
    Get business intelligence data for a specific domain
    """
    try:
        # Query intelligence_bundles table for business intelligence data
        data_query = text("""
            SELECT ib.*, bd.domain
            FROM intelligence_bundles ib
            JOIN business_domains bd ON ib.domain_id = bd.id
            WHERE ib.domain_id = :domain_id
            ORDER BY ib.created_at DESC
            LIMIT 1;
        """)

        result = db.execute(data_query, {"domain_id": domain_id})
        row = result.fetchone()

        if not row:
            raise HTTPException(
                status_code=404,
                detail=f"No business intelligence data found for domain {domain_id}"
            )

        # Convert row to dictionary
        columns = result.keys()
        raw_data = dict(zip(columns, row))

        # Transform the intelligence_bundles data into the expected business intelligence format
        transformed_data = {
            "domain_id": raw_data["domain_id"],
            "domain": raw_data["domain"],
            "company_name": raw_data.get("lead_company", ""),
            "industry": raw_data.get("lead_industry", ""),
            "description": raw_data.get("llm_digest", ""),
            "website": f"https://{raw_data['domain']}",
            "location": raw_data.get("lead_location", ""),
            "employee_count": None,  # Not available in current schema
            "revenue_range": None,   # Not available in current schema
            "key_products": _extract_key_products(raw_data),
            "target_audience": None,  # Could be derived from content analysis
            "competitors": [],        # Not available in current schema
            "pain_points": _extract_pain_points(raw_data),
            "goals": _extract_goals(raw_data),
            "budget_range": None,     # Not available in current schema
            "timeline": None,         # Not available in current schema
            "decision_makers": _extract_decision_makers(raw_data),
            "recent_news": [],        # Not available in current schema
            "social_media": _extract_social_media(raw_data),
            "raw_data": raw_data,     # Include the raw data from the database
        }

        # Generate marketing pitch using the business intelligence
        marketing_pitch = None
        try:
            marketing_pitch = await pitch_service.generate_pitch(transformed_data, "Forge Assistant")
        except Exception as pitch_error:
            # Log the error but don't fail the entire request
            print(f"Warning: Failed to generate marketing pitch: {pitch_error}")
            # Could implement fallback pitch here if needed

        return {
            "data": transformed_data,
            "marketing_pitch": marketing_pitch.to_dict() if marketing_pitch else None
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error retrieving business intelligence data: {str(e)}"
        )


def _extract_key_products(data):
    """Extract key products/services from the intelligence data"""
    products = []

    # Try to extract from content summaries
    if data.get("content_summaries"):
        summaries = data["content_summaries"]
        if isinstance(summaries, dict) and "services" in summaries:
            services_text = summaries["services"]
            if isinstance(services_text, str):
                # Simple extraction - could be improved with NLP
                services = [s.strip() for s in services_text.split('\n') if s.strip() and len(s.strip()) > 3]
                products.extend(services[:5])  # Limit to 5

    # Try to extract from keyword signals
    if data.get("keyword_signals") and not products:
        signals = data["keyword_signals"]
        if isinstance(signals, dict) and "top_keywords" in signals:
            keywords = signals["top_keywords"]
            if isinstance(keywords, list):
                # Use top keywords as potential products/services
                products.extend(keywords[:3])

    return products if products else ["Business Services"]


def _extract_pain_points(data):
    """Extract potential pain points from the intelligence data"""
    # This is a simplified extraction - in practice, this would require more sophisticated analysis
    pain_points = []

    # Could analyze content for common business pain points
    # For now, return generic ones based on industry
    industry = data.get("lead_industry", "").lower()
    if "dental" in industry or "dentist" in industry:
        pain_points = [
            "Patient retention and loyalty",
            "Competition from larger dental chains",
            "Managing appointment scheduling efficiently",
            "Keeping up with latest dental technologies"
        ]
    else:
        pain_points = [
            "Increasing operational efficiency",
            "Managing customer relationships",
            "Staying competitive in the market",
            "Scaling business operations"
        ]

    return pain_points


def _extract_goals(data):
    """Extract business goals from the intelligence data"""
    goals = [
        "Grow business revenue and profitability",
        "Improve customer satisfaction and retention",
        "Expand market presence and reach",
        "Leverage technology for competitive advantage"
    ]

    # Customize based on industry
    industry = data.get("lead_industry", "").lower()
    if "dental" in industry or "dentist" in industry:
        goals = [
            "Provide exceptional patient care and outcomes",
            "Build long-term patient relationships",
            "Grow practice through community engagement",
            "Invest in modern dental technologies"
        ]

    return goals


def _extract_decision_makers(data):
    """Extract decision makers from the intelligence data"""
    decision_makers = []

    if data.get("lead_name") and data.get("lead_title"):
        decision_makers.append({
            "name": data["lead_name"],
            "role": data["lead_title"]
        })

    # Could extract more from metadata_insights if available
    if data.get("metadata_insights"):
        insights = data["metadata_insights"]
        if isinstance(insights, dict) and "apollo_contact" in insights:
            apollo_data = insights["apollo_contact"]
            if isinstance(apollo_data, dict):
                name = apollo_data.get("name")
                title = apollo_data.get("title")
                if name and title and name != data.get("lead_name"):
                    decision_makers.append({
                        "name": name,
                        "role": title
                    })

    return decision_makers if decision_makers else [{"name": "Business Owner", "role": "Decision Maker"}]


def _extract_social_media(data):
    """Extract social media information from the intelligence data"""
    social_media = {
        "website": f"https://{data['domain']}"
    }

    # Extract from online_presence if available
    if data.get("online_presence"):
        presence = data["online_presence"]
        if isinstance(presence, dict):
            if "linkedin_url" in presence:
                social_media["linkedin"] = presence["linkedin_url"]

    # Default social media handles (could be improved)
    social_media["twitter"] = f"https://twitter.com/{data['domain'].split('.')[0]}"

    return social_media


@router.get("/health")
def business_intelligence_health() -> Any:
    """
    Health check for business intelligence service
    """
    return {"status": "healthy", "service": "business-intelligence"}
