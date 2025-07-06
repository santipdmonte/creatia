from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, Any
from services.core_planner_agent import get_core_planner_agent_service

router = APIRouter(prefix="/core-planner", tags=["core-planner"])

class CorePlannerRequest(BaseModel):
    message: str
    thread_id: Optional[str] = "default"
    company_info: Optional[str] = ""

class CorePlannerResponse(BaseModel):
    success: bool
    monthly_plan: Optional[Dict[Any, Any]] = None
    error: Optional[str] = None
    thread_id: Optional[str] = None

class AgentStateResponse(BaseModel):
    thread_id: str
    agent_ready: bool
    model: str
    error: Optional[str] = None

@router.post("/generate", response_model=CorePlannerResponse)
async def generate_monthly_content_plan(request: CorePlannerRequest):
    """
    Generate a monthly content plan using the Core Planner Agent.
    
    Args:
        request: Contains the planning message/context and optional thread_id
        
    Returns:
        Monthly content plan with detailed weekly and daily breakdown
    """
    try:
        service = get_core_planner_agent_service()
        
        result = service.generate_monthly_content_plan(
            message=request.message,
            thread_id=request.thread_id or "default",
            company_info=request.company_info or ""
        )
        
        return CorePlannerResponse(
            success=result["success"],
            monthly_plan=result.get("monthly_plan"),
            error=result.get("error"),
            thread_id=request.thread_id
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Error generating monthly content plan: {str(e)}"
        )

@router.get("/state/{thread_id}", response_model=AgentStateResponse)
async def get_agent_state(thread_id: str):
    """
    Get the current state of the agent for a specific thread.
    
    Args:
        thread_id: Thread ID to get state for
        
    Returns:
        Agent state information
    """
    try:
        service = get_core_planner_agent_service()
        
        result = service.get_agent_state(thread_id=thread_id)
        
        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])
        
        return AgentStateResponse(
            thread_id=result["thread_id"],
            agent_ready=result["agent_ready"],
            model=result["model"]
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Error getting agent state: {str(e)}"
        )

@router.get("/health")
async def health_check():
    """
    Health check endpoint for the Core Planner Agent service.
    
    Returns:
        Service health status
    """
    try:
        service = get_core_planner_agent_service()
        return {
            "status": "healthy",
            "service": "core-planner-agent",
            "model": "gpt-4o-mini"
        }
    except Exception as e:
        raise HTTPException(
            status_code=503, 
            detail=f"Service unhealthy: {str(e)}"
        ) 