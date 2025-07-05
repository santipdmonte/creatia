import json
import os
from typing import Dict, List, Optional, Any
from openai import OpenAI
from pydantic import BaseModel
from enum import Enum
from dotenv import load_dotenv

# Cargar variables de entorno desde .env
load_dotenv()

class WeekPlan(BaseModel):
    week_number: int
    planning_description: str
    
class MonthlyPlan(BaseModel):
    semana_1: WeekPlan
    semana_2: WeekPlan
    semana_3: WeekPlan
    semana_4: WeekPlan
    
class MonthlyPlannerService:
    def __init__(self):
        self.client = OpenAI()
        
    def generate_monthly_plan(
        self,
        monthly_strategy: str,
        brand_context: Optional[str] = None,
        month_name: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Genera un plan mensual dividido en 4 semanas.
        
        Args:
            monthly_strategy: Estrategia mensual de alto nivel de la empresa
            brand_context: Contexto opcional de marca
            month_name: Nombre del mes (opcional, para personalizar)
            
        Returns:
            Diccionario con la planificación por semana
        """
        
        # Construir el prompt para el agente de OpenAI
        prompt = self._build_prompt(monthly_strategy, brand_context, month_name)
        
        try:
            # Llamar a OpenAI
            response = self.client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {
                        "role": "system",
                        "content": "Eres un estratega de marketing digital experto especializado en planificación de mediano plazo. Debes dividir estrategias mensuales en planificaciones semanales coherentes y ejecutables. Genera respuestas en formato JSON válido siguiendo exactamente la estructura solicitada."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=0.7,
                max_tokens=2500,
                response_format={"type": "json_object"}
            )
            
            # Parsear la respuesta
            content = response.choices[0].message.content
            monthly_plan = json.loads(content)
            
            return monthly_plan
            
        except Exception as e:
            raise Exception(f"Error al generar el plan mensual: {str(e)}")
    
    def _build_prompt(
        self,
        monthly_strategy: str,
        brand_context: Optional[str] = None,
        month_name: Optional[str] = None
    ) -> str:
        """
        Construye el prompt para el agente de OpenAI.
        """
        
        brand_section = ""
        if brand_context:
            brand_section = f"""
CONTEXTO DE MARCA:
{brand_context}

"""
        
        month_section = f"para el mes de {month_name}" if month_name else ""
        
        prompt = f"""
Actúa como un estratega de marketing digital experto. Necesito que dividas una estrategia mensual en 4 planificaciones semanales coherentes y ejecutables.

ESTRATEGIA MENSUAL {month_section}:
{monthly_strategy}

{brand_section}Tu tarea es dividir esta estrategia mensual en 4 semanas, donde cada semana tenga:
1. Una planificación detallada que será el input para un community manager
2. Coherencia con la estrategia general del mes
3. Progresión lógica semana a semana

INSTRUCCIONES:
1. Analiza la estrategia mensual y identifica los objetivos clave
2. Divide estos objetivos en 4 semanas con progresión lógica
3. Cada semana debe tener una planificación detallada que un community manager pueda usar
4. Asegúrate de que las 4 semanas trabajen juntas hacia los objetivos mensuales

FORMATO DE RESPUESTA (JSON):
{{
  "semana_1": {{
    "week_number": 1,
    "planning_description": "Descripción detallada de la planificación para la semana 1. Esta descripción será el input para el community manager que planificará los posts diarios. Debe ser específica sobre qué comunicar, qué tonos usar, qué objetivos cumplir durante esta semana."
  }},
  "semana_2": {{
    "week_number": 2,
    "planning_description": "Descripción detallada de la planificación para la semana 2. Debe construir sobre la semana 1 y avanzar hacia los objetivos mensuales."
  }},
  "semana_3": {{
    "week_number": 3,
    "planning_description": "Descripción detallada de la planificación para la semana 3. Debe intensificar los esfuerzos y preparar para el cierre del mes."
  }},
  "semana_4": {{
    "week_number": 4,
    "planning_description": "Descripción detallada de la planificación para la semana 4. Debe cerrar la estrategia mensual y preparar para el siguiente mes."
  }}
}}

IMPORTANTE:
- Cada planning_description debe ser suficientemente detallada para que un community manager pueda trabajar con ella
- Debe haber coherencia y progresión entre las 4 semanas
- Considera el timing y flujo natural de una estrategia mensual
- Responde ÚNICAMENTE con el JSON, sin texto adicional
"""
        
        return prompt

def get_monthly_planner_service() -> MonthlyPlannerService:
    """
    Factory function para obtener una instancia del servicio del planificador mensual.
    """
    return MonthlyPlannerService() 