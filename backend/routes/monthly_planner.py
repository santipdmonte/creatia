from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from services.monthly_planner import get_monthly_planner_service
from services.weekly_planner import get_weekly_planner_service

router = APIRouter(prefix="/monthly-planner", tags=["monthly-planner"])

class MonthlyPlanRequest(BaseModel):
    monthly_strategy: str
    brand_context: Optional[str] = None
    month_name: Optional[str] = None

class MonthlyPlanResponse(BaseModel):
    success: bool
    monthly_plan: Optional[Dict[str, Any]] = None
    error: Optional[str] = None

class FullMonthlyPlanRequest(BaseModel):
    monthly_strategy: str
    resources_paths: List[str]
    brand_context: Optional[str] = None
    month_name: Optional[str] = None

class FullMonthlyPlanResponse(BaseModel):
    success: bool
    monthly_plan: Optional[Dict[str, Any]] = None
    weekly_social_plans: Optional[Dict[str, Any]] = None
    error: Optional[str] = None

@router.post("/generate")
async def generate_monthly_plan(request: MonthlyPlanRequest) -> MonthlyPlanResponse:
    """
    Genera un plan mensual dividido en 4 semanas.
    
    Args:
        request: Contiene la estrategia mensual y contexto de marca
        
    Returns:
        Plan mensual con 4 planificaciones semanales
    """
    try:
        service = get_monthly_planner_service()
        
        # Generar el plan mensual
        monthly_plan = service.generate_monthly_plan(
            monthly_strategy=request.monthly_strategy,
            brand_context=request.brand_context,
            month_name=request.month_name
        )
        
        return MonthlyPlanResponse(
            success=True,
            monthly_plan=monthly_plan
        )
        
    except Exception as e:
        return MonthlyPlanResponse(
            success=False,
            error=f"Error al generar el plan mensual: {str(e)}"
        )

@router.post("/generate-full")
async def generate_full_monthly_plan(request: FullMonthlyPlanRequest) -> FullMonthlyPlanResponse:
    """
    Genera un plan mensual completo: divide en 4 semanas y genera plan semanal detallado para cada una.
    
    Args:
        request: Contiene la estrategia mensual, recursos y contexto de marca
        
    Returns:
        Plan mensual y planes semanales detallados con imágenes y descripciones por día
    """
    try:
        monthly_service = get_monthly_planner_service()
        weekly_service = get_weekly_planner_service()
        
        # Paso 1: Generar plan mensual (4 semanas)
        print("🗓️  Generando plan mensual...")
        monthly_plan = monthly_service.generate_monthly_plan(
            monthly_strategy=request.monthly_strategy,
            brand_context=request.brand_context,
            month_name=request.month_name
        )
        
        # Paso 2: Para cada semana, generar plan semanal detallado
        print("📅 Generando planes semanales detallados...")
        weekly_social_plans = {}
        
        for week_key, week_data in monthly_plan.items():
            if week_key.startswith("semana_"):
                print(f"   Procesando {week_key}...")
                
                # Validar recursos disponibles
                valid_resources = weekly_service.validate_resources(request.resources_paths)
                
                # Generar plan semanal usando la descripción del monthly planner
                weekly_plan = weekly_service.generate_weekly_plan(
                    high_level_planning=week_data["planning_description"],
                    resources_paths=valid_resources,
                    brand_context=request.brand_context
                )
                
                # Agregar metadatos de la semana
                weekly_social_plans[week_key] = {
                    "week_number": week_data["week_number"],
                    "planning_description": week_data["planning_description"],
                    "daily_posts": weekly_plan
                }
        
        print("✅ Plan mensual completo generado!")
        
        return FullMonthlyPlanResponse(
            success=True,
            monthly_plan=monthly_plan,
            weekly_social_plans=weekly_social_plans
        )
        
    except Exception as e:
        return FullMonthlyPlanResponse(
            success=False,
            error=f"Error al generar el plan mensual completo: {str(e)}"
        ) 