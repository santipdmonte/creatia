from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, List, Optional, Any
from services.strategist import get_strategist_service
from services.monthly_planner import get_monthly_planner_service
from services.weekly_planner import get_weekly_planner_service

# Crear el router
router = APIRouter(prefix="/strategist", tags=["strategist"])

class StrategistRequest(BaseModel):
    company_info: str
    campaign_focus: Optional[str] = None
    month_name: Optional[str] = None

class StrategistResponse(BaseModel):
    monthly_strategy: str
    brand_context: str

class FullStrategistRequest(BaseModel):
    company_info: str
    campaign_focus: Optional[str] = None
    month_name: Optional[str] = None
    image_resources: List[str] = []

class WeeklyPlanSummary(BaseModel):
    week_number: int
    planning_description: str
    total_days: int
    has_posts: bool

class FullStrategistResponse(BaseModel):
    monthly_strategy: str
    brand_context: str
    weekly_plans: List[WeeklyPlanSummary]
    complete_monthly_posts: Dict[str, Any]

@router.post("/generate", response_model=StrategistResponse)
async def generate_strategy(request: StrategistRequest):
    """
    Genera una estrategia mensual basada en la información de la empresa.
    
    Este endpoint solo ejecuta el agente strategist y devuelve la estrategia mensual.
    """
    try:
        # Obtener el servicio strategist
        strategist_service = get_strategist_service()
        
        # Generar la estrategia mensual
        result = strategist_service.generate_monthly_strategy(
            company_info=request.company_info,
            campaign_focus=request.campaign_focus,
            month_name=request.month_name
        )
        
        return StrategistResponse(
            monthly_strategy=result["monthly_strategy"],
            brand_context=result["brand_context"]
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al generar estrategia: {str(e)}")

@router.post("/generate-full", response_model=FullStrategistResponse)
async def generate_full_strategy(request: FullStrategistRequest):
    """
    Genera una estrategia completa que incluye:
    1. Estrategia mensual (strategist)
    2. Planificación mensual dividida en 4 semanas (monthly-planner)
    3. Contenido diario para cada semana (weekly-planner)
    
    Este endpoint ejecuta toda la cadena: strategist → monthly-planner → weekly-planner
    """
    try:
        # Paso 1: Generar estrategia mensual con strategist
        strategist_service = get_strategist_service()
        strategy_result = strategist_service.generate_monthly_strategy(
            company_info=request.company_info,
            campaign_focus=request.campaign_focus,
            month_name=request.month_name
        )
        
        # Paso 2: Generar plan mensual con monthly-planner
        monthly_planner_service = get_monthly_planner_service()
        monthly_plan = monthly_planner_service.generate_monthly_plan(
            monthly_strategy=strategy_result["monthly_strategy"],
            brand_context=strategy_result["brand_context"]
        )
        
        # Paso 3: Generar contenido diario para cada semana con weekly-planner
        weekly_planner_service = get_weekly_planner_service()
        
        complete_monthly_posts = {}
        weekly_summaries = []
        
        for week in monthly_plan["weekly_plans"]:
            week_number = week["week_number"]
            planning_description = week["planning_description"]
            
            # Generar contenido diario para esta semana
            weekly_result = weekly_planner_service.generate_weekly_plan(
                weekly_planning_text=planning_description,
                brand_context=strategy_result["brand_context"],
                image_resources=request.image_resources
            )
            
            # Agregar al resultado completo
            complete_monthly_posts[f"week_{week_number}"] = weekly_result
            
            # Crear resumen de la semana
            weekly_summaries.append(WeeklyPlanSummary(
                week_number=week_number,
                planning_description=planning_description,
                total_days=len(weekly_result["weekly_plan"]),
                has_posts=len(weekly_result["weekly_plan"]) > 0
            ))
        
        return FullStrategistResponse(
            monthly_strategy=strategy_result["monthly_strategy"],
            brand_context=strategy_result["brand_context"],
            weekly_plans=weekly_summaries,
            complete_monthly_posts=complete_monthly_posts
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al generar estrategia completa: {str(e)}")

@router.post("/validate-info")
async def validate_company_info(request: Dict[str, str]):
    """
    Valida que la información de la empresa sea suficiente para generar una estrategia.
    """
    try:
        company_info = request.get("company_info", "")
        
        # Validaciones básicas
        if not company_info or len(company_info.strip()) < 100:
            return {
                "valid": False,
                "message": "La información de la empresa es muy corta. Necesita al menos 100 caracteres.",
                "length": len(company_info)
            }
        
        # Buscar elementos clave
        essential_elements = ["marca", "brand", "producto", "servicio", "cliente", "audiencia", "objetivo"]
        found_elements = [elem for elem in essential_elements if elem.lower() in company_info.lower()]
        
        if len(found_elements) < 3:
            return {
                "valid": False,
                "message": "La información parece incompleta. Debería incluir información sobre la marca, productos/servicios, audiencia y objetivos.",
                "found_elements": found_elements,
                "length": len(company_info)
            }
        
        return {
            "valid": True,
            "message": "La información parece suficiente para generar una estrategia.",
            "found_elements": found_elements,
            "length": len(company_info)
        }
        
    except Exception as e:
        return {
            "valid": False,
            "message": f"Error al validar la información: {str(e)}",
            "length": 0
        } 