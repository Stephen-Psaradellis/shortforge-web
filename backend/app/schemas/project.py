"""
Project schemas
"""

from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel

class ProjectBase(BaseModel):
    """Base project schema"""
    title: str
    description: Optional[str] = None
    project_type: str
    budget: Optional[float] = None
    deadline: Optional[datetime] = None

class ProjectCreate(ProjectBase):
    """Project creation schema"""
    client_id: int

class ProjectUpdate(BaseModel):
    """Project update schema"""
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    budget: Optional[float] = None
    deadline: Optional[datetime] = None

class ProjectUpdateBase(BaseModel):
    """Base project update schema"""
    title: str
    content: str
    is_public: bool = True

class ProjectUpdateCreate(ProjectUpdateBase):
    """Project update creation schema"""
    project_id: int

class ProjectUpdateInDB(ProjectUpdateBase):
    """Project update in database schema"""
    id: int
    project_id: int
    created_at: datetime
    updated_at: datetime

class ProjectUpdate(ProjectUpdateInDB):
    """Project update response schema"""
    pass

class ProjectInDB(ProjectBase):
    """Project in database schema"""
    id: int
    status: str
    client_id: int
    created_at: datetime
    updated_at: datetime

class Project(ProjectInDB):
    """Project response schema"""
    updates: List[ProjectUpdate] = []
