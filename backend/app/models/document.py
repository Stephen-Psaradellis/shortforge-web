"""
Document model for file uploads
"""

from typing import Optional
from sqlalchemy import Column, ForeignKey, Integer, String

from app.models.base import BaseModel

class Document(BaseModel):
    """Document model"""

    __tablename__ = "documents"

    filename = Column(String(255), nullable=False)
    original_filename = Column(String(255), nullable=False)
    file_path = Column(String(500), nullable=False)
    file_size = Column(Integer, nullable=False)
    content_type = Column(String(100), nullable=False)
    description = Column(String(500))

    # Foreign keys
    project_id = Column(Integer, ForeignKey("projects.id"))
    uploaded_by_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    # Relationships
    project = relationship("Project", back_populates="documents")
    uploaded_by = relationship("User")
