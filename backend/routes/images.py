from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.image_generator import get_image_generator_service
from services.prompt_generator import get_aiweekend_prompt
from typing import Optional

router = APIRouter(prefix="/images", tags=["images"])

class BatchImageRequest(BaseModel):
    prompt: str
    count: int = 3
    quality: str = "medium"
    size: str = "1024x1024"
    output_format: str = "png"
    save_directory: Optional[str] = None
    filename_prefix: Optional[str] = None

class AIWeekendBatchRequest(BaseModel):
    user_input: str
    count: int = 3
    quality: str = "medium"
    size: str = "1024x1024"
    output_format: str = "png"
    save_directory: Optional[str] = None
    filename_prefix: Optional[str] = "ai_weekend"

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
        "filename_prefix": "sunset"
    }
    """
    try:
        if request.count <= 0:
            raise HTTPException(status_code=400, detail="Count must be greater than 0")
        
        if request.count > 10:
            raise HTTPException(status_code=400, detail="Count cannot exceed 10 images per batch")
        
        service = get_image_generator_service()
        result = await service.generate_multiple_images_parallel(
            prompt=request.prompt,
            count=request.count,
            quality=request.quality,
            size=request.size,
            output_format=request.output_format,
            save_directory=request.save_directory,
            filename_prefix=request.filename_prefix
        )
        
        return {
            "message": f"Batch generation completed: {result['total_successful']} successful, {result['total_failed']} failed",
            "results": result
        }
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.post("/generate-ai-weekend-batch")
async def generate_ai_weekend_batch(request: AIWeekendBatchRequest):
    """
    Generate multiple AI Weekend themed images in parallel
    
    Example request:
    {
        "user_input": "A hackathon event with developers coding together",
        "count": 3,
        "quality": "high",
        "size": "1536x1024",
        "output_format": "png",
        "save_directory": "images_generated/ai_weekend",
        "filename_prefix": "hackathon"
    }
    """
    try:
        if request.count <= 0:
            raise HTTPException(status_code=400, detail="Count must be greater than 0")
        
        if request.count > 10:
            raise HTTPException(status_code=400, detail="Count cannot exceed 10 images per batch")
        
        # Generate AI Weekend prompt
        ai_weekend_prompt = get_aiweekend_prompt(request.user_input)
        
        service = get_image_generator_service()
        result = await service.generate_multiple_images_parallel(
            prompt=ai_weekend_prompt,
            count=request.count,
            quality=request.quality,
            size=request.size,
            output_format=request.output_format,
            save_directory=request.save_directory,
            filename_prefix=request.filename_prefix
        )
        
        return {
            "message": f"AI Weekend batch generation completed: {result['total_successful']} successful, {result['total_failed']} failed",
            "prompt_used": ai_weekend_prompt,
            "results": result
        }
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.get("/batch-status/{batch_id}")
async def get_batch_status(batch_id: str):
    """
    Get the status of a batch generation (placeholder for future implementation)
    """
    # This would be implemented with a proper job queue system like Celery or RQ
    return {"message": "Batch status tracking not implemented yet", "batch_id": batch_id} 