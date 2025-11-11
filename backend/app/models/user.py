"""
User model and related schemas
"""

from enum import Enum
from typing import Optional
from sqlalchemy import Boolean, Column, String, Text
from sqlalchemy.orm import relationship

from app.models.base import BaseModel

class UserRole(str, Enum):
    """User role enumeration"""
    CLIENT = "client"
    ADMIN = "admin"
    SUPER_ADMIN = "super_admin"

class User(BaseModel):
    """User model"""

    __tablename__ = "users"

    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    company = Column(String(255))
    role = Column(String(50), default=UserRole.CLIENT.value, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    is_verified = Column(Boolean, default=False, nullable=False)
    phone = Column(String(50))
    bio = Column(Text)

    # Relationships
    projects = relationship("Project", back_populates="client")
    inquiries = relationship("Inquiry", back_populates="user")

    @property
    def is_admin(self) -> bool:
        """Check if user is admin or super admin"""
        return self.role in [UserRole.ADMIN.value, UserRole.SUPER_ADMIN.value]

    @property
    def is_super_admin(self) -> bool:
        """Check if user is super admin"""
        return self.role == UserRole.SUPER_ADMIN.value
