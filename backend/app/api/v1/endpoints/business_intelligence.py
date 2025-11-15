"""
Business intelligence endpoints
"""

from typing import Any, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.core.database import get_db

router = APIRouter()


@router.get("/domain/{domain_id}")
def get_business_intelligence_by_domain(
    *,
    db: Session = Depends(get_db),
    domain_id: str,
) -> Any:
    """
    Get business intelligence data for a specific domain
    """
    try:
        # Find tables with domain_id column
        domain_tables_query = text("""
            SELECT table_name
            FROM information_schema.columns
            WHERE column_name = 'domain_id'
                AND table_schema = 'public'
            ORDER BY table_name
            LIMIT 1;
        """)

        result = db.execute(domain_tables_query)
        table_row = result.fetchone()

        if not table_row:
            raise HTTPException(
                status_code=404,
                detail="No business intelligence tables found"
            )

        table_name = table_row[0]

        # Query business intelligence data
        data_query = text(f"""
            SELECT * FROM {table_name}
            WHERE domain_id = :domain_id
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
        data = dict(zip(columns, row))

        # Transform arrays and objects back to proper format
        if data.get('key_products') and isinstance(data['key_products'], str):
            data['key_products'] = [x.strip() for x in data['key_products'].split(',')]
        if data.get('competitors') and isinstance(data['competitors'], str):
            data['competitors'] = [x.strip() for x in data['competitors'].split(',')]
        if data.get('pain_points') and isinstance(data['pain_points'], str):
            data['pain_points'] = [x.strip() for x in data['pain_points'].split(',')]
        if data.get('goals') and isinstance(data['goals'], str):
            data['goals'] = [x.strip() for x in data['goals'].split(',')]

        return {"data": data}

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error retrieving business intelligence data: {str(e)}"
        )


@router.get("/health")
def business_intelligence_health() -> Any:
    """
    Health check for business intelligence service
    """
    return {"status": "healthy", "service": "business-intelligence"}
