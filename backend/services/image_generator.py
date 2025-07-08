import base64
import os
from openai import OpenAI
from PIL import Image
from io import BytesIO
from pydantic import BaseModel
from enum import Enum
from typing import Optional, Union, List, Any
import asyncio
import concurrent.futures
from pathlib import Path
import uuid
from datetime import datetime
from dotenv import load_dotenv
from services.prompt_generator import get_aiweekend_prompt
from utils.images_utils import generate_image_path, save_image

class ImageGeneratorService:
    def __init__(self):
        load_dotenv()
        self.client = OpenAI()

    def generate_image(
        self,
        prompt: str,
        quality: str = "medium", # low, medium, high, auto
        size: str = "1024x1024", # 1024x1024, 1536x1024, 1024x1536, 256x256, 512x512, 1792x1024, 1024x1792
        output_format: str = "jpeg", # png, jpeg, webp
        images_list: Optional[List[Any]] = None,
        image_path: Optional[str] = None,
    ):

        if not images_list:
            result = self.client.images.generate(
                model="gpt-image-1",
                prompt=prompt,
                quality=quality,
                output_format=output_format,
                size=size
            )
        else:
            result = self.client.images.edit(
                model="gpt-image-1",
                prompt=prompt,
                quality=quality,
                output_format=output_format,
                size=size,
                image=images_list
            )

        if image_path:
            try:
                save_image(result, image_path)

            except Exception as e:
                print(f"Error saving image: {e}")
                image_path = None

        return result, image_path


    async def _generate_single_image_async(
        self,
        prompt: str,
        quality: str,
        size: str,
        output_format: str,
        images_list: Optional[List[Any]] = None,
        image_index: int = 0
    ):
        """
        Generate a single image asynchronously.
        This runs the synchronous OpenAI call in a thread pool.
        """
        loop = asyncio.get_event_loop()
        
        # Run the synchronous OpenAI call in a thread pool
        with concurrent.futures.ThreadPoolExecutor() as executor:
            result = await loop.run_in_executor(
                executor,
                self.generate_image,
                prompt,
                quality,
                size,
                output_format,
                images_list
            )
        
        return result   
   

    async def _edit_single_image_async(
        self,
        prompt: str,
        images_list: List[Any],
        quality: str,
        size: str,
        output_format: str,
        image_index: int = 0
    ):
        """
        Edit a single image asynchronously.
        This runs the synchronous OpenAI image edit call in a thread pool.
        """
        loop = asyncio.get_event_loop()
        
        # Run the synchronous OpenAI call in a thread pool
        with concurrent.futures.ThreadPoolExecutor() as executor:
            result = await loop.run_in_executor(
                executor,
                self.generate_image,
                prompt,
                quality,                
                size,
                output_format,
                images_list
            )
        
        return result


    async def generate_multiple_images_parallel(
        self,
        prompt: str,
        count: int,
        quality: str = "medium",
        size: str = "1024x1024",
        output_format: str = "jpeg",
        images_url_list: Optional[List[str]] = None,
        save_directory: Optional[str] = None,
        filename_prefix: Optional[str] = None,
    ) -> dict:
        """
        Generate multiple images in parallel with the same prompt.
        
        Args:
            prompt: The prompt to generate images from
            count: Number of images to generate
            quality: Image quality (low, medium, high, auto)
            size: Image size (1024x1024, 1536x1024, etc.)
            output_format: Output format (png, jpeg, webp)
            images_url_list: Optional list of image file paths for editing
            save_directory: Directory to save images (optional)
            filename_prefix: Prefix for saved filenames (optional)
            
        Returns:
            Dictionary containing successful and failed results with metadata
        """
        if count <= 0:
            raise ValueError("Count must be greater than 0")
        
        if count > 10:  # OpenAI rate limiting consideration
            raise ValueError("Count cannot exceed 10 images per batch")

        if images_url_list:
            # Create tasks for parallel execution
            images_list = []
            for url in images_url_list:
                img = open(url, "rb")
                images_list.append(img)

            tasks = []
            for i in range(count):
                task = self._edit_single_image_async(
                    prompt=prompt,
                    images_list=images_list,
                    quality=quality,
                    size=size,
                    output_format=output_format,
                    image_index=i,
                )
                tasks.append(task)       
        else:      
            # Create tasks for parallel execution
            tasks = []
            for i in range(count):
                task = self._generate_single_image_async(
                    prompt=prompt,
                    quality=quality,
                    size=size,
                    output_format=output_format,
                    image_index=i
                )
                tasks.append(task)
   

        # Execute all tasks in parallel
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        # Process results and handle any exceptions
        successful_results = []
        failed_results = []
        
        for i, result in enumerate(results):
            if isinstance(result, Exception):
                failed_results.append({
                    "index": i,
                    "error": str(result),
                    "status": "failed"
                })
            else:
                # Save image if directory is provided
                if save_directory:
                    image_path = generate_image_path(
                        save_directory, 
                        filename_prefix or "generated_image",
                        i,
                        output_format
                    )
                    try:
                        save_image(result, image_path)
                        result_data = {
                            "index": i,
                            "image_path": image_path,
                            "status": "success"
                        }
                    except Exception as e:
                        result_data = {
                            "index": i,
                            "error": f"Failed to save image: {str(e)}",
                            "status": "save_failed"
                        }
                else:
                    # For responses without saving, include basic result info
                    result_data = {
                        "index": i,
                        "status": "success"
                    }
                
                successful_results.append(result_data)

        return {
            "successful": successful_results,
            "failed": failed_results,
            "total_requested": count,
            "total_successful": len(successful_results),
            "total_failed": len(failed_results)
        }


def get_image_generator_service() -> ImageGeneratorService:
    return ImageGeneratorService()
