"""
Inquiry schemas
"""

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr

class InquiryBase(BaseModel):
    """Base inquiry schema"""
    name: str
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    subject: str
    message: str
    service_interest: Optional[str] = None

class InquiryCreate(InquiryBase):
    """Inquiry creation schema"""
    pass

class InquiryUpdate(BaseModel):
    """Inquiry update schema"""
    status: Optional[str] = None

class InquiryInDB(InquiryBase):
    """Inquiry in database schema"""
    id: int
    status: str
    user_id: Optional[int] = None
    created_at: datetime
    updated_at: datetime

class Inquiry(InquiryInDB):
    """Inquiry response schema"""
    pass
