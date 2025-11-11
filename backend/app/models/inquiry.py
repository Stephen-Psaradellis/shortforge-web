"""
Inquiry model for contact form submissions
"""

from enum import Enum
from typing import Optional
from sqlalchemy import Column, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from app.models.base import BaseModel

class InquiryStatus(str, Enum):
    """Inquiry status enumeration"""
    NEW = "new"
    IN_PROGRESS = "in_progress"
    RESPONDED = "responded"
    CLOSED = "closed"

class Inquiry(BaseModel):
    """Inquiry model"""

    __tablename__ = "inquiries"

    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(50))
    company = Column(String(255))
    subject = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    status = Column(String(50), default=InquiryStatus.NEW.value, nullable=False)
    service_interest = Column(String(100))  # AI Agents, Automation, IT Consulting

    # Foreign keys (optional - for registered users)
    user_id = Column(Integer, ForeignKey("users.id"))

    # Relationships
    user = relationship("User", back_populates="inquiries")
