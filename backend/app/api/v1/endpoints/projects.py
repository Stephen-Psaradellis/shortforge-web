"""
Project endpoints
"""

from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.auth import get_current_active_user, get_current_admin_user
from app.core.database import get_db
from app.models.project import Project, ProjectUpdate
from app.models.user import User
from app.schemas.project import (
    Project as ProjectSchema,
    ProjectCreate,
    ProjectUpdate as ProjectUpdateSchema,
    ProjectUpdateCreate,
    ProjectUpdate as ProjectUpdateResponse,
)

router = APIRouter()

@router.post("/", response_model=ProjectSchema)
def create_project(
    *,
    db: Session = Depends(get_db),
    project_in: ProjectCreate,
    current_user = Depends(get_current_admin_user),
) -> Any:
    """Create a new project (admin only)"""
    # Verify client exists
    client = db.query(User).filter(User.id == project_in.client_id).first()
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")

    project = Project(**project_in.model_dump())
    db.add(project)
    db.commit()
    db.refresh(project)
    return project

@router.get("/", response_model=List[ProjectSchema])
def read_projects(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user = Depends(get_current_active_user),
) -> Any:
    """Get projects (filtered by user role)"""
    if current_user.is_admin:
        # Admin sees all projects
        projects = db.query(Project).offset(skip).limit(limit).all()
    else:
        # Client sees only their projects
        projects = (
            db.query(Project)
            .filter(Project.client_id == current_user.id)
            .offset(skip)
            .limit(limit)
            .all()
        )
    return projects

@router.get("/{project_id}", response_model=ProjectSchema)
def read_project(
    *,
    db: Session = Depends(get_db),
    project_id: int,
    current_user = Depends(get_current_active_user),
) -> Any:
    """Get project by ID"""
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    # Check permissions
    if not current_user.is_admin and project.client_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    return project

@router.put("/{project_id}", response_model=ProjectSchema)
def update_project(
    *,
    db: Session = Depends(get_db),
    project_id: int,
    project_in: ProjectUpdateSchema,
    current_user = Depends(get_current_admin_user),
) -> Any:
    """Update project (admin only)"""
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    for field, value in project_in.model_dump(exclude_unset=True).items():
        setattr(project, field, value)
    db.add(project)
    db.commit()
    db.refresh(project)
    return project

@router.post("/{project_id}/updates", response_model=ProjectUpdateResponse)
def create_project_update(
    *,
    db: Session = Depends(get_db),
    project_id: int,
    update_in: ProjectUpdateCreate,
    current_user = Depends(get_current_admin_user),
) -> Any:
    """Create project update (admin only)"""
    # Verify project exists
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    # Ensure update is for correct project
    if update_in.project_id != project_id:
        raise HTTPException(status_code=400, detail="Project ID mismatch")

    update = ProjectUpdate(**update_in.model_dump())
    db.add(update)
    db.commit()
    db.refresh(update)
    return update
