import asyncio
import os
from pathlib import Path
from dotenv import load_dotenv
from services.image_generator import get_image_generator_service
from services.prompt_generator import get_aiweekend_prompt

# Load environment variables from .env file
env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)

async def test_parallel_generation():
    """
    Test the parallel image generation functionality
    """
    print("🚀 Starting parallel image generation test...")
    
    # Create output directory
    output_dir = "images_generated/parallel_test"
    os.makedirs(output_dir, exist_ok=True)
    
    # Initialize the service
    image_generator_service = get_image_generator_service()
    
    print("\n📸 Test: Generating 3 images in parallel...")
    prompt = get_aiweekend_prompt("A instagram history publishing a post about the AI weekend HACKATON")
    
    try:
        result = await image_generator_service.generate_multiple_images_parallel(
            prompt=prompt,
            count=3,
            quality="medium",
            size="1024x1024",
            output_format="jpeg",
            save_directory=output_dir,
            filename_prefix="aiweekend"
        )
        
        print(f"✅ Successfully generated {result['total_successful']} images")
        print(f"❌ Failed to generate {result['total_failed']} images")
        
        # Print saved image paths
        for img_data in result['successful']:
            print(f"   📁 Saved: {img_data['image_path']}")
            
    except Exception as e:
        print(f"❌ Error in test: {e}")
    
    print("\n🎉 Parallel image generation test completed!")

if __name__ == "__main__":
    asyncio.run(test_parallel_generation()) 