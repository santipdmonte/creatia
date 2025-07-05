from fastapi import APIRouter, HTTPException, UploadFile, File
from pydantic import BaseModel
from services.image_generator import get_image_generator_service
from services.prompt_generator import get_aiweekend_prompt, get_prompt_edit
from typing import Optional, List, Dict, Any
import tempfile
import os
import json
from pathlib import Path

router = APIRouter(prefix="/images", tags=["images"])

class BatchImageRequest(BaseModel):
    prompt: str
    count: int = 3
    quality: str = "medium"
    size: str = "1024x1024"
    output_format: str = "jpeg"
    save_directory: Optional[str] = "images_generated/parallel_test"
    filename_prefix: Optional[str] = "aitest_codigo"
    images_url_list: Optional[List[str]] = None

class DailyImageOutput(BaseModel):
    prompt: str
    images_url_list: List[str]

class WeeklyPlanRequest(BaseModel):
    weekly_plan_json: Dict[str, Any]
    base_save_directory: Optional[str] = "images_generated/weekly_plan"
    quality: str = "low"
    size: str = "1024x1024"
    output_format: str = "jpeg"
    images_per_day: int = 3

class WeeklyPlanResponse(BaseModel):
    success: bool
    results: Dict[str, Any]
    total_days_processed: int
    total_images_generated: int
    errors: List[str] = []

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

@router.post("/generate-weekly-plan")
async def generate_weekly_plan(request: WeeklyPlanRequest):
    """
    Process a weekly planning JSON and generate batch images for each day
    
    Example request:
    {
        "weekly_plan_json": {
            "success": true,
            "weekly_plan": {
                "lunes": {
                    "reference_images": ["logo.webp", "avatar.webp"],
                    "description": "Create an impactful post..."
                }
            }
        },
        "base_save_directory": "images_generated/weekly_plan",
        "quality": "medium",
        "images_per_day": 3
    }
    """
    try:
        result = await weekly_prompt_processing(request)
        # Return as plain dictionary to avoid Pydantic serialization issues
        return {
            "success": result.success,
            "results": result.results,
            "total_days_processed": result.total_days_processed,
            "total_images_generated": result.total_images_generated,
            "errors": result.errors
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing weekly plan: {str(e)}")

async def weekly_prompt_processing(request: WeeklyPlanRequest) -> WeeklyPlanResponse:
    """
    Process the weekly planning JSON and generate batch images for each day
    
    Args:
        request: WeeklyPlanRequest containing the weekly plan data and generation settings
        
    Returns:
        WeeklyPlanResponse with results for each day
    """
    service = get_image_generator_service()
    
    # Extract weekly plan data
    weekly_plan_data = request.weekly_plan_json
    
    if not weekly_plan_data.get("success", False):
        raise ValueError("Weekly plan data indicates failure")
    
    weekly_plan = weekly_plan_data.get("weekly_plan", {})
    
    if not weekly_plan:
        raise ValueError("No weekly plan data found")
    
    results = {}
    total_images_generated = 0
    errors = []
    
    # Process each day in the weekly plan
    for day, day_data in weekly_plan.items():
        try:
            print(f"Processing {day}...")
            
            # Get the description (prompt) for the day
            description = day_data.get("description", "")
            if not description:
                error_msg = f"No description found for {day}"
                errors.append(error_msg)
                continue
            
            # Get reference images for the day
            reference_images = day_data.get("reference_images", [])
            
            # Convert reference image paths to full paths
            images_url_list = []
            if reference_images:
                for ref_image in reference_images:
                    # Check if it's a relative path and prepend resources_content/
                    if not ref_image.startswith("/") and not ref_image.startswith("resources_content/"):
                        full_path = f"resources_content/{ref_image}"
                    else:
                        full_path = ref_image
                    
                    # Verify the file exists
                    if Path(full_path).exists():
                        images_url_list.append(full_path)
                    else:
                        print(f"Warning: Reference image not found: {full_path}")
            
            # Create day-specific save directory
            day_save_directory = f"{request.base_save_directory}/{day}"
            
            # Generate enhanced prompt using AI Weekend branding
            enhanced_prompt = get_aiweekend_prompt(description)
            
            # Generate batch images for this day
            batch_result = await service.generate_multiple_images_parallel(
                prompt=enhanced_prompt,
                count=request.images_per_day,
                quality=request.quality,
                size=request.size,
                output_format=request.output_format,
                save_directory=day_save_directory,
                filename_prefix=f"{day}_aiweekend",
                images_url_list=images_url_list if images_url_list else None
            )
            
            # Store results for this day (simplified for serialization)
            generated_image_paths = []
            for img_result in batch_result["successful"]:
                if "image_path" in img_result:
                    generated_image_paths.append(img_result["image_path"])
            
            results[day] = {
                "original_description": description,
                "enhanced_prompt": enhanced_prompt,
                "reference_images": images_url_list,
                "generated_image_paths": generated_image_paths,
                "images_generated": batch_result["total_successful"],
                "generation_errors": batch_result["total_failed"],
                "failed_results": [{"index": f["index"], "error": f["error"]} for f in batch_result["failed"]]
            }
            
            total_images_generated += batch_result["total_successful"]
            
            if batch_result["total_failed"] > 0:
                errors.append(f"{day}: {batch_result['total_failed']} images failed to generate")
            
            print(f"✅ {day}: Generated {batch_result['total_successful']} images")
            
        except Exception as e:
            error_msg = f"Error processing {day}: {str(e)}"
            errors.append(error_msg)
            print(f"❌ {error_msg}")
            continue
    
    return WeeklyPlanResponse(
        success=len(results) > 0,
        results=results,
        total_days_processed=len(results),
        total_images_generated=total_images_generated,
        errors=errors
    )