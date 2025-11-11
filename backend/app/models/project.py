"""
Project model and related schemas
"""

from enum import Enum
from typing import Optional
from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from app.models.base import BaseModel

class ProjectStatus(str, Enum):
    """Project status enumeration"""
    PLANNING = "planning"
    IN_PROGRESS = "in_progress"
    ON_HOLD = "on_hold"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class ProjectType(str, Enum):
    """Project type enumeration"""
    AI_AGENTS = "ai_agents"
    AUTOMATION = "automation"
    IT_CONSULTING = "it_consulting"
    CUSTOM = "custom"

class Project(BaseModel):
    """Project model"""

    __tablename__ = "projects"

    title = Column(String(255), nullable=False)
    description = Column(Text)
    status = Column(String(50), default=ProjectStatus.PLANNING.value, nullable=False)
    project_type = Column(String(50), nullable=False)
    budget = Column(Float)
    deadline = Column(DateTime(timezone=True))

    # Foreign keys
    client_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    # Relationships
    client = relationship("User", back_populates="projects")
    updates = relationship("ProjectUpdate", back_populates="project", cascade="all, delete-orphan")
    documents = relationship("Document", back_populates="project", cascade="all, delete-orphan")

class ProjectUpdate(BaseModel):
    """Project update model"""

    __tablename__ = "project_updates"

    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    is_public = Column(Boolean, default=True, nullable=False)

    # Foreign keys
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)

    # Relationships
    project = relationship("Project", back_populates="updates")
