from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from services.weekly_planner import get_weekly_planner_service

router = APIRouter(prefix="/weekly-planner", tags=["weekly-planner"])

class WeeklyPlanRequest(BaseModel):
    high_level_planning: str
    resources_paths: List[str]
    brand_context: Optional[str] = None

class WeeklyPlanResponse(BaseModel):
    success: bool
    weekly_plan: Optional[Dict[str, Any]] = None
    error: Optional[str] = None

@router.post("/generate")
async def generate_weekly_plan(request: WeeklyPlanRequest) -> WeeklyPlanResponse:
    """
    Genera un plan semanal de publicaciones para redes sociales.
    
    Args:
        request: Contiene la planificación de alto nivel, recursos disponibles y contexto de marca
        
    Returns:
        Plan semanal desglosado por día con imágenes de referencia y descripciones
    """
    try:
        service = get_weekly_planner_service()
        
        # Validar recursos antes de generar el plan
        valid_resources = service.validate_resources(request.resources_paths)
        
        if not valid_resources:
            return WeeklyPlanResponse(
                success=False,
                error="No se encontraron recursos válidos en las rutas proporcionadas"
            )
        
        # Generar el plan semanal
        weekly_plan = service.generate_weekly_plan(
            high_level_planning=request.high_level_planning,
            resources_paths=valid_resources,
            brand_context=request.brand_context
        )
        
        return WeeklyPlanResponse(
            success=True,
            weekly_plan=weekly_plan
        )
        
    except Exception as e:
        return WeeklyPlanResponse(
            success=False,
            error=f"Error al generar el plan semanal: {str(e)}"
        )

@router.post("/validate-resources")
async def validate_resources(resources_paths: List[str]) -> Dict[str, Any]:
    """
    Valida que los recursos (imágenes) existan en el sistema.
    
    Args:
        resources_paths: Lista de paths a validar
        
    Returns:
        Información sobre recursos válidos e inválidos
    """
    try:
        service = get_weekly_planner_service()
        valid_resources = service.validate_resources(resources_paths)
        invalid_resources = [path for path in resources_paths if path not in valid_resources]
        
        return {
            "success": True,
            "valid_resources": valid_resources,
            "invalid_resources": invalid_resources,
            "total_valid": len(valid_resources),
            "total_invalid": len(invalid_resources)
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 