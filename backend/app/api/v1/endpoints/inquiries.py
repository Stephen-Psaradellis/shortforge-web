"""
Inquiry endpoints
"""

from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.auth import get_current_admin_user
from app.core.database import get_db
from app.models.inquiry import Inquiry
from app.schemas.inquiry import Inquiry as InquirySchema, InquiryCreate, InquiryUpdate

router = APIRouter()

@router.post("/", response_model=InquirySchema)
def create_inquiry(
    *,
    db: Session = Depends(get_db),
    inquiry_in: InquiryCreate,
) -> Any:
    """Create a new inquiry (contact form submission)"""
    inquiry = Inquiry(**inquiry_in.model_dump())
    db.add(inquiry)
    db.commit()
    db.refresh(inquiry)
    return inquiry

@router.get("/", response_model=List[InquirySchema])
def read_inquiries(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user = Depends(get_current_admin_user),
) -> Any:
    """Get all inquiries (admin only)"""
    inquiries = db.query(Inquiry).offset(skip).limit(limit).all()
    return inquiries

@router.get("/{inquiry_id}", response_model=InquirySchema)
def read_inquiry(
    *,
    db: Session = Depends(get_db),
    inquiry_id: int,
    current_user = Depends(get_current_admin_user),
) -> Any:
    """Get inquiry by ID (admin only)"""
    inquiry = db.query(Inquiry).filter(Inquiry.id == inquiry_id).first()
    if not inquiry:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    return inquiry

@router.put("/{inquiry_id}", response_model=InquirySchema)
def update_inquiry(
    *,
    db: Session = Depends(get_db),
    inquiry_id: int,
    inquiry_in: InquiryUpdate,
    current_user = Depends(get_current_admin_user),
) -> Any:
    """Update inquiry (admin only)"""
    inquiry = db.query(Inquiry).filter(Inquiry.id == inquiry_id).first()
    if not inquiry:
        raise HTTPException(status_code=404, detail="Inquiry not found")

    for field, value in inquiry_in.model_dump(exclude_unset=True).items():
        setattr(inquiry, field, value)
    db.add(inquiry)
    db.commit()
    db.refresh(inquiry)
    return inquiry
