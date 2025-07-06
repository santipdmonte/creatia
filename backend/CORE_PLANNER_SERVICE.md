# Core Planner Agent Service

The Core Planner Agent Service provides AI-powered content planning functionality using LangGraph and OpenAI's GPT-4o-mini model.

## Overview

This service creates detailed monthly content plans for social media, including:
- Monthly description and objectives
- Content pillars
- 4 weeks of detailed planning
- Daily posts with content descriptions
- Image requirements and descriptions
- Copy text for posts

## API Endpoints

### POST `/core-planner/generate`

Generate a monthly content plan based on a message/context.

**Request Body:**
```json
{
  "message": "Contenido para la hackaton de fin de mes",
  "thread_id": "optional_thread_id"
}
```

**Response:**
```json
{
  "success": true,
  "monthly_plan": {
    "mes": {
      "mes_description": "Plan mensual para hackaton",
      "mes_objetivos": "Objetivos del mes",
      "pilares_contenido": ["Pilar 1", "Pilar 2"],
      "semanas": [
        {
          "semana_description": "Descripción de la semana",
          "semana_objetivos": "Objetivos de la semana",
          "posts": [
            {
              "dia": "lunes",
              "content_description": "Descripción del contenido",
              "is_image_required": true,
              "reference_images": ["image1.jpg"],
              "image_detail_description": "Descripción detallada de la imagen",
              "copy_for_post": "Texto del post"
            }
          ]
        }
      ]
    }
  },
  "thread_id": "thread_id_used"
}
```

### GET `/core-planner/state/{thread_id}`

Get the current state of the agent for a specific thread.

**Response:**
```json
{
  "thread_id": "thread_id",
  "agent_ready": true,
  "model": "gpt-4o-mini"
}
```

### GET `/core-planner/health`

Health check endpoint for the service.

**Response:**
```json
{
  "status": "healthy",
  "service": "core-planner-agent",
  "model": "gpt-4o-mini"
}
```

## Data Models

### Dia (Enum)
- `LUNES`
- `MARTES`
- `MIERCOLES`
- `JUEVES`
- `VIERNES`
- `SABADO`

### DiaPost
- `dia`: Dia enum
- `content_description`: String description of the content
- `is_image_required`: Boolean indicating if image is needed
- `reference_images`: List of reference image paths
- `image_detail_description`: Optional detailed image description
- `copy_for_post`: Optional post copy text

### SemanaState
- `posts`: List of DiaPost objects
- `semana_description`: Week description
- `semana_objetivos`: Week objectives

### MesState
- `semanas`: List of SemanaState objects (4 weeks)
- `mes_description`: Month description
- `mes_objetivos`: Month objectives
- `pilares_contenido`: List of content pillars

## Usage Examples

### Using the Service Directly

```python
from services.core_planner_agent import get_core_planner_agent_service

service = get_core_planner_agent_service()
result = service.generate_monthly_content_plan(
    message="Contenido para la hackaton de fin de mes",
    thread_id="my_thread"
)
```

### Using the API

```bash
# Generate monthly plan
curl -X POST "http://localhost:8000/core-planner/generate" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Contenido para la hackaton de fin de mes",
    "thread_id": "my_thread"
  }'

# Check agent state
curl "http://localhost:8000/core-planner/state/my_thread"

# Health check
curl "http://localhost:8000/core-planner/health"
```

## Testing

Run the test script to verify the service works correctly:

```bash
cd backend
python test_core_planner.py
```

## Dependencies

- `langchain-openai`: For OpenAI integration
- `langgraph`: For agent graph functionality
- `pydantic`: For data validation
- `fastapi`: For API endpoints
- `python-dotenv`: For environment variables

## Environment Variables

Make sure to set your OpenAI API key in the `.env` file:

```
OPENAI_API_KEY=your_api_key_here
```

## Integration

The service is automatically integrated into the main FastAPI application and available at the `/core-planner` prefix. 