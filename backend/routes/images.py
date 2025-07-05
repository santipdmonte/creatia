from fastapi import APIRouter, HTTPException, UploadFile, File
from pydantic import BaseModel
from services.image_generator import get_image_generator_service
from services.prompt_generator import get_aiweekend_prompt, get_prompt_edit
from typing import Optional, List
import tempfile
import os

router = APIRouter(prefix="/images", tags=["images"])

class BatchImageRequest(BaseModel):
    prompt: str
    count: int = 3
    quality: str = "medium"
    size: str = "1024x1024"
    output_format: str = "jpeg"
    save_directory: Optional[str] = None
    filename_prefix: Optional[str] = None
    images_url_list: Optional[List[str]] = None

@router.post("/generate-batch")
async def generate_batch_images(request: BatchImageRequest):
    """
    Generate multiple images in parallel with the same prompt
    
    Example request:
    {
        "prompt": "A beautiful sunset over mountains",
        "count": 5,
        "quality": "medium",
        "size": "1024x1024",
        "output_format": "jpeg",
        "save_directory": "images_generated/batch_001",
        "filename_prefix": "sunset",
        "images_url_list": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
    }
    """
    try:
        if request.count <= 0:
            raise HTTPException(status_code=400, detail="Count must be greater than 0")
        
        if request.count > 10:
            raise HTTPException(status_code=400, detail="Count cannot exceed 10 images per batch")
        
        print(request.images_url_list)

        service = get_image_generator_service()
        result = await service.generate_multiple_images_parallel(
            prompt=request.prompt,
            count=request.count,
            quality=request.quality,
            size=request.size,
            output_format=request.output_format,
            save_directory=request.save_directory,
            filename_prefix=request.filename_prefix,
            images_url_list=request.images_url_list
        )
        
        return {
            "message": f"Batch generation completed: {result['total_successful']} successful, {result['total_failed']} failed",
            "results": result
        }
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")