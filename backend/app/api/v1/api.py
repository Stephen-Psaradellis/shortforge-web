"""
Main API router
"""

from fastapi import APIRouter

from app.api.v1.endpoints import auth, inquiries, projects, payments, business_intelligence

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(inquiries.router, prefix="/inquiries", tags=["inquiries"])
api_router.include_router(projects.router, prefix="/projects", tags=["projects"])
api_router.include_router(payments.router, prefix="/payments", tags=["payments"])
api_router.include_router(business_intelligence.router, prefix="/business-intelligence", tags=["business-intelligence"])
