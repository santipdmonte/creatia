"""
Core Planner Agent Service
This service provides AI-powered content planning functionality using LangGraph.
"""

import enum
from typing import Optional, List
from pydantic import BaseModel
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
from langgraph.prebuilt import create_react_agent
from langgraph.checkpoint.memory import MemorySaver
from dotenv import load_dotenv

load_dotenv()

class Dia(enum.Enum):
    LUNES = "lunes"
    MARTES = "martes"
    MIERCOLES = "miercoles"
    JUEVES = "jueves"
    VIERNES = "viernes"
    SABADO = "sabado"

class DiaPost(BaseModel):
    dia: Dia
    content_description: str
    is_image_required: bool
    reference_images: List[str] = []
    image_detail_description: Optional[str] = None
    copy_for_post: Optional[str] = None

class SemanaState(BaseModel):
    posts: List[DiaPost]
    semana_description: str
    semana_objetivos: str

class MesState(BaseModel):
    semanas: List[SemanaState]
    mes_description: str
    mes_objetivos: str
    pilares_contenido: List[str]

class State(BaseModel):
    mes: MesState

class CorePlannerAgentService:
    """
    Service for AI-powered content planning using LangGraph.
    """
    
    def __init__(self):
        self.checkpointer = MemorySaver()
        self.model = ChatOpenAI(model="gpt-4o-mini")
        self.agent = self._create_agent()
    
    def _create_agent(self):
        """Create the LangGraph agent with proper configuration."""
        return create_react_agent(
            self.model,
            tools=[],
            prompt=self._get_prompt,
            response_format=State,
        )
    
    def _get_prompt(self, state: State):
        """Generate the system prompt for the agent."""
        system_msg = """
        Eres un experto en planificación de contenido para redes sociales.
        En esta ocasión estás realizando la planificación mensual para el contenido de una empresa.
        
        Tu tarea es crear un plan mensual detallado que incluya:
        - Descripción general del mes y objetivos
        - Pilares de contenido principales
        - 4 semanas de planificación
        - Para cada semana: descripción, objetivos y posts diarios
        - Para cada post: descripción del contenido, si requiere imagen, imágenes de referencia, descripción detallada de la imagen y copy del post
        
        Asegúrate de que el contenido sea coherente, atractivo y alineado con los objetivos de la empresa.
        """
        return [{"role": "system", "content": system_msg}]
    
    def generate_monthly_content_plan(self, message: str, thread_id: str = "default") -> dict:
        """
        Generate a monthly content plan based on the provided message.
        
        Args:
            message: The content planning request/context
            thread_id: Thread ID for conversation continuity
            
        Returns:
            Dictionary containing the generated monthly plan
        """
        try:
            config = {"configurable": {"thread_id": thread_id}}

            response = self.agent.invoke(
                input={
                    "messages": [HumanMessage(content=message)]
                },
                config=config,
            )
            
            if 'structured_response' in response:
                return {
                    "success": True,
                    "monthly_plan": response['structured_response'].model_dump(),
                    "raw_response": response
                }
            else:
                return {
                    "success": False,
                    "error": "No structured response received from agent",
                    "raw_response": response
                }
                
        except Exception as e:
            return {
                "success": False,
                "error": f"Error generating monthly content plan: {str(e)}"
            }
    
    def get_agent_state(self, thread_id: str = "default") -> dict:
        """
        Get the current state of the agent for a specific thread.
        
        Args:
            thread_id: Thread ID to get state for
            
        Returns:
            Dictionary containing agent state information
        """
        try:
            config = {"configurable": {"thread_id": thread_id}}
            # This would depend on the specific LangGraph implementation
            # For now, return basic info
            return {
                "thread_id": thread_id,
                "agent_ready": True,
                "model": "gpt-4o-mini"
            }
        except Exception as e:
            return {
                "error": f"Error getting agent state: {str(e)}"
            }

def get_core_planner_agent_service() -> CorePlannerAgentService:
    """
    Factory function to get an instance of the CorePlannerAgentService.
    """
    return CorePlannerAgentService()