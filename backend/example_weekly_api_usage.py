import json
import requests
from pathlib import Path

def test_weekly_api():
    """
    Example of how to use the weekly planning API endpoint
    """
    # Load the example weekly planning JSON
    example_json_path = Path("example_weeply_planning.json")
    
    if not example_json_path.exists():
        print("❌ Example JSON file not found!")
        return
    
    with open(example_json_path, 'r', encoding='utf-8') as f:
        weekly_plan_data = json.load(f)
    
    # API endpoint URL (assuming the server is running on localhost:8000)
    url = "http://localhost:8000/images/generate-weekly-plan"
    
    # Request payload
    payload = {
        "weekly_plan_json": weekly_plan_data,
        "base_save_directory": "images_generated/weekly_api_test",
        "quality": "medium",
        "size": "1024x1024", 
        "output_format": "jpeg",
        "images_per_day": 3
    }
    
    try:
        print("🚀 Sending request to weekly planning API...")
        print(f"📋 Processing {len(weekly_plan_data.get('weekly_plan', {}))} days")
        
        # Make the API request
        response = requests.post(url, json=payload)
        
        if response.status_code == 200:
            result = response.json()
            print(f"✅ API request successful!")
            print(f"📊 Results:")
            print(f"   - Days processed: {result['total_days_processed']}")
            print(f"   - Total images generated: {result['total_images_generated']}")
            print(f"   - Success: {result['success']}")
            
            if result.get('errors'):
                print(f"   - Errors: {len(result['errors'])}")
                for error in result['errors']:
                    print(f"     ❌ {error}")
            
            print(f"\n📁 Results by day:")
            for day, day_result in result['results'].items():
                print(f"   {day.capitalize()}: {day_result['images_generated']} images generated")
                
        else:
            print(f"❌ API request failed with status code: {response.status_code}")
            print(f"Response: {response.text}")
            
    except requests.exceptions.ConnectionError:
        print("❌ Could not connect to the API. Make sure the server is running on localhost:8000")
    except Exception as e:
        print(f"❌ Error making API request: {e}")

if __name__ == "__main__":
    test_weekly_api() 