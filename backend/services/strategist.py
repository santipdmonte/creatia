import json
import os
from typing import Dict, List, Optional, Any
from openai import OpenAI
from pydantic import BaseModel
from enum import Enum
from dotenv import load_dotenv

# Cargar variables de entorno desde .env
load_dotenv()

class StrategistService:
    def __init__(self):
        self.client = OpenAI()
        
    def generate_monthly_strategy(
        self,
        company_info: str,
        campaign_focus: Optional[str] = None,
        month_name: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Genera una estrategia mensual basada en la información de la empresa.
        
        Args:
            company_info: String con toda la información de la empresa concatenada
            campaign_focus: Enfoque específico de la campaña (opcional)
            month_name: Nombre del mes para personalizar
            
        Returns:
            Diccionario con la estrategia mensual y contexto de marca
        """
        
        # Construir el prompt para el agente strategist
        prompt = self._build_strategist_prompt(company_info, campaign_focus, month_name)
        
        try:
            # Llamar a OpenAI
            response = self.client.chat.completions.create(
                model="o3",
                messages=[
                    {
                        "role": "system",
                        "content": "Eres un estratega de marketing digital senior con 15+ años de experiencia. Te especializas en crear estrategias mensuales coherentes y ejecutables basadas en el análisis profundo de marcas, audiencias y mercados. Generas respuestas en formato JSON válido siguiendo exactamente la estructura solicitada."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                response_format={"type": "json_object"}
            )
            
            # Parsear la respuesta
            content = response.choices[0].message.content
            strategy_result = json.loads(content)
            
            return strategy_result
            
        except Exception as e:
            raise Exception(f"Error al generar la estrategia mensual: {str(e)}")
    
    def _build_strategist_prompt(
        self,
        company_info: str,
        campaign_focus: Optional[str] = None,
        month_name: Optional[str] = None
    ) -> str:
        """
        Construye el prompt para el agente strategist.
        """
        
        # Sección de enfoque específico
        focus_section = ""
        if campaign_focus:
            focus_section = f"""
ENFOQUE ESPECÍFICO DE LA CAMPAÑA:
{campaign_focus}

"""
        
        # Sección del mes
        month_section = f"para el mes de {month_name}" if month_name else ""
        
        prompt = f"""
Actúa como un estratega de marketing digital senior. Tu tarea es analizar la información de esta empresa y crear una estrategia mensual {month_section} que sea coherente, ejecutable y alineada con sus objetivos de negocio.

INFORMACIÓN DE LA EMPRESA:
{company_info}

{focus_section}INSTRUCCIONES:
1. Analiza profundamente la información de la empresa proporcionada
2. Extrae los elementos clave: marca, audiencia, productos, objetivos, competencia, etc.
3. Identifica los objetivos más importantes y realistas para el mes
4. Crea una estrategia mensual detallada que aproveche las fortalezas de la marca
5. Define claramente el contexto de marca para mantener consistencia
6. Asegúrate de que la estrategia sea específica y accionable

La estrategia debe incluir:
- Contexto y situación actual de la marca
- Objetivos específicos y medibles para el mes
- Estrategia general y approach
- Detalles del público objetivo y segmentación
- Propuesta de valor clara
- Consideraciones especiales y challenges
- Métricas de éxito

FORMATO DE RESPUESTA (JSON):
{{
  "monthly_strategy": "ESTRATEGIA MENSUAL: [Título de la campaña/estrategia]

CONTEXTO:
[Análisis de la situación actual de la marca, mercado y oportunidades basado en la información proporcionada]

OBJETIVOS DEL MES:
[Lista numerada de 3-5 objetivos específicos y medibles]

DETALLES [DEL PRODUCTO/SERVICIO/EVENTO PRINCIPAL]:
[Información detallada sobre el foco principal del mes]

PÚBLICO OBJETIVO:
[Segmentación detallada con demografía, psicografía y comportamientos]

PROPUESTA DE VALOR:
[Propuesta de valor específica para este mes]

ESTRATEGIA POR SEMANAS:
[Descripción de alto nivel de cómo se desarrollará la estrategia semana a semana]

TONO Y ESTILO:
[Guías específicas de tono, estilo y personalidad de comunicación]

MENSAJES CLAVE:
[Lista de mensajes principales que deben estar presentes]

CALL TO ACTIONS:
[CTAs específicos para este mes]

MÉTRICAS DE ÉXITO:
[KPIs específicos y medibles]

CONSIDERACIONES ESPECIALES:
[Challenges, competencia, timing, presupuesto, etc.]",

  "brand_context": "[Contexto completo de marca que incluya personalidad, valores, tono, colores, audiencia, etc. que será usado por los siguientes servicios para mantener consistencia]"
}}

IMPORTANTE:
- La monthly_strategy debe ser extremadamente detallada y específica
- Debe estar lista para ser usada por un monthly-planner
- El brand_context debe capturar toda la esencia de la marca
- Usa los datos reales de la empresa, no inventes información
- Mantén el tono profesional pero accionable
- Responde ÚNICAMENTE con el JSON, sin texto adicional
"""
        
        return prompt

def get_strategist_service() -> StrategistService:
    """
    Factory function para obtener una instancia del servicio strategist.
    """
    return StrategistService() 