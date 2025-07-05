from fastapi import APIRouter, HTTPException
from services.resources import get_resources_service

router = APIRouter(prefix="/resources", tags=["resources"])

@router.get("/templates")
async def get_templates():
    """Get all available templates"""
    try:
        service = get_resources_service()
        templates = service.get_templates()
        return {"templates": templates}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/elements")
async def get_elements():
    """Get all available elements"""
    try:
        service = get_resources_service()
        elements = service.get_elements()
        return {"elements": elements}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/avatars")
async def get_avatars():
    """Get all available avatars"""
    try:
        service = get_resources_service()
        avatars = service.get_avatars()
        return {"avatars": avatars}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/images")
async def get_images():
    """Get all available images"""
    try:
        service = get_resources_service()
        images = service.get_images()
        return {"images": images}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
