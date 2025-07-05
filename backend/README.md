# Creatia Backend

## Weekly Prompt Processing

The backend now includes functionality to process weekly planning JSON files and generate batch images for each day of the week.

### New API Endpoint

#### `POST /images/generate-weekly-plan`

Processes a weekly planning JSON structure and generates batch images for each day.

**Request Body:**
```json
{
  "weekly_plan_json": {
    "success": true,
    "weekly_plan": {
      "lunes": {
        "reference_images": ["logo.webp", "avatars/mascot.webp"],
        "description": "Create an impactful post for AI Weekend..."
      },
      "martes": {
        "reference_images": ["avatars/mascot.webp"],
        "description": "Create an Instagram story using the mascot..."
      }
    }
  },
  "base_save_directory": "images_generated/weekly_plan",
  "quality": "medium",
  "size": "1024x1024",
  "output_format": "jpeg",
  "images_per_day": 3
}
```

**Response:**
```json
{
  "success": true,
  "results": {
    "lunes": {
      "original_description": "Create an impactful post...",
      "enhanced_prompt": "Enhanced prompt with AI Weekend branding...",
      "reference_images": ["resources_content/logo.webp"],
      "generation_result": {...},
      "images_generated": 3,
      "generation_errors": 0
    }
  },
  "total_days_processed": 2,
  "total_images_generated": 6,
  "errors": []
}
```

### Features

- **Batch Processing**: Generates multiple images (default 3) for each day
- **Reference Images**: Uses provided reference images for image editing/enhancement
- **AI Weekend Branding**: Automatically applies AI Weekend brand guidelines to prompts
- **Organized Output**: Creates separate directories for each day
- **Error Handling**: Continues processing even if individual days fail
- **Detailed Results**: Returns comprehensive results for each day

### Usage Examples

1. **Direct Function Call** (see `test_weekly_processing.py`):
```python
from routes.images import weekly_prompt_processing, WeeklyPlanRequest

request = WeeklyPlanRequest(
    weekly_plan_json=weekly_data,
    base_save_directory="images_generated/weekly_test",
    quality="medium",
    images_per_day=3
)

result = await weekly_prompt_processing(request)
```

2. **API Call** (see `example_weekly_api_usage.py`):
```python
import requests

response = requests.post(
    "http://localhost:8000/images/generate-weekly-plan",
    json=payload
)
```

### File Structure

Generated images are organized as:
```
images_generated/
└── weekly_plan/
    ├── lunes/
    │   ├── lunes_aiweekend_0_20231201_120000_abc123.jpeg
    │   ├── lunes_aiweekend_1_20231201_120001_def456.jpeg
    │   └── lunes_aiweekend_2_20231201_120002_ghi789.jpeg
    └── martes/
        ├── martes_aiweekend_0_20231201_120100_jkl012.jpeg
        ├── martes_aiweekend_1_20231201_120101_mno345.jpeg
        └── martes_aiweekend_2_20231201_120102_pqr678.jpeg
```