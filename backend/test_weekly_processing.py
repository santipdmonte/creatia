import asyncio
import json
from pathlib import Path
from dotenv import load_dotenv
from routes.images import weekly_prompt_processing, WeeklyPlanRequest

# Load environment variables
load_dotenv()

async def test_weekly_processing():
    """
    Test the weekly prompt processing functionality with the example JSON
    """
    print("🚀 Starting weekly prompt processing test...")
    
    # Load the example weekly planning JSON
    example_json_path = Path("example_weeply_planning.json")
    
    if not example_json_path.exists():
        print("❌ Example JSON file not found!")
        return
    
    with open(example_json_path, 'r', encoding='utf-8') as f:
        weekly_plan_data = json.load(f)
    
    print(f"📋 Loaded weekly plan with {len(weekly_plan_data.get('weekly_plan', {}))} days")
    
    # Create the request
    request = WeeklyPlanRequest(
        weekly_plan_json=weekly_plan_data,
        base_save_directory="images_generated/weekly_test",
        quality="low",  # Use low quality for faster testing
        size="1024x1024",
        output_format="jpeg",
        images_per_day=3
    )
    
    try:
        print("🎨 Processing weekly plan...")
        result = await weekly_prompt_processing(request)
        
        print(f"\n✅ Weekly processing completed!")
        print(f"📊 Results Summary:")
        print(f"   - Days processed: {result.total_days_processed}")
        print(f"   - Total images generated: {result.total_images_generated}")
        print(f"   - Success: {result.success}")
        
        if result.errors:
            print(f"   - Errors: {len(result.errors)}")
            for error in result.errors:
                print(f"     ❌ {error}")
        
        print(f"\n📁 Day-by-day results:")
        for day, day_result in result.results.items():
            print(f"   {day.capitalize()}:")
            print(f"     - Images generated: {day_result['images_generated']}")
            print(f"     - Reference images: {len(day_result['reference_images'])}")
            if day_result['generation_errors'] > 0:
                print(f"     - Generation errors: {day_result['generation_errors']}")
        
        # Show some example file paths
        print(f"\n📸 Sample generated images:")
        for day, day_result in result.results.items():
            successful_images = day_result['generation_result']['successful']
            if successful_images:
                for img in successful_images[:2]:  # Show first 2 images
                    if 'image_path' in img:
                        print(f"   {img['image_path']}")
        
    except Exception as e:
        print(f"❌ Error during weekly processing: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_weekly_processing()) 