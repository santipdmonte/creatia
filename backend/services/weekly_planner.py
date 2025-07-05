import json
import os
from typing import Dict, List, Optional, Any
from openai import OpenAI
from pydantic import BaseModel
from enum import Enum
from dotenv import load_dotenv

# Cargar variables de entorno desde .env
load_dotenv()

class WeekDay(str, Enum):
    MONDAY = "lunes"
    TUESDAY = "martes"
    WEDNESDAY = "miércoles"
    THURSDAY = "jueves"
    FRIDAY = "viernes"
    SATURDAY = "sábado"
    SUNDAY = "domingo"

class DayPlan(BaseModel):
    reference_images: List[str] = []
    description: str
    
class WeeklyPlan(BaseModel):
    lunes: Optional[DayPlan] = None
    martes: Optional[DayPlan] = None
    miercoles: Optional[DayPlan] = None
    jueves: Optional[DayPlan] = None
    viernes: Optional[DayPlan] = None
    sabado: Optional[DayPlan] = None
    domingo: Optional[DayPlan] = None

class WeeklyPlannerService:
    def __init__(self):
        self.client = OpenAI()
        
    def generate_weekly_plan(
        self,
        high_level_planning: str,
        resources_paths: List[str],
        brand_context: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Genera un plan semanal de publicaciones para redes sociales.
        
        Args:
            high_level_planning: Descripción en alto nivel de la planificación de la semana
            resources_paths: Lista de paths a imágenes disponibles como recursos
            brand_context: Contexto opcional de marca para personalizar el contenido
            
        Returns:
            Diccionario con la planificación por día de la semana
        """
        
        # Construir el prompt para el agente de OpenAI
        prompt = self._build_prompt(high_level_planning, resources_paths, brand_context)
        
        try:
            # Llamar a OpenAI
            response = self.client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {
                        "role": "system",
                        "content": "Eres un community manager experto especializado en crear planificaciones semanales para redes sociales. Debes generar respuestas en formato JSON válido siguiendo exactamente la estructura solicitada."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=0.7,
                max_tokens=2000,
                response_format={"type": "json_object"}
            )
            
            # Parsear la respuesta
            content = response.choices[0].message.content
            weekly_plan = json.loads(content)
            
            return weekly_plan
            
        except Exception as e:
            raise Exception(f"Error al generar el plan semanal: {str(e)}")
    
    def _build_prompt(
        self,
        high_level_planning: str,
        resources_paths: List[str],
        brand_context: Optional[str] = None
    ) -> str:
        """
        Construye el prompt para el agente de OpenAI.
        """
        
        # Crear lista de recursos disponibles
        resources_list = "\n".join([f"- {path}" for path in resources_paths])
        
        brand_section = ""
        if brand_context:
            brand_section = f"""
CONTEXTO DE MARCA:
{brand_context}

"""
        
        prompt = f"""
Actúa como un community manager experto. Necesito que generes una planificación semanal detallada para redes sociales basada en los siguientes inputs:

PLANIFICACIÓN DE ALTO NIVEL:
{high_level_planning}

{brand_section}
RECURSOS DISPONIBLES (imágenes o estilos para referenciar):
# Brand Identity

## Name & Tagline
- Name: AI Weekend (AIWKND)
- Tagline: "Impulsando el futuro, hoy."
- Tone: Futuristic, Playful, Bold, Professional
- Path to logo: "logo_682370ab48bec_medium.webp"

## Color Palette
- Primary: #FF2D87 (Hot pink)
- Secondary: #6C2BFF (Purple) 
- Accent1: #00C2FF (Neon cyan)
- Accent2: #0A0A0A (Near black)
- Background: #1E1E1E (Charcoal dark)
- Text Light: #FFFFFF
- Text Muted: #B0B0B0

## Typography
- Heading Font: Montserrat, sans-serif
- Body Font: Roboto, sans-serif
- Heading Weight: 800
- Body Weight: 400
- Text Transform: Uppercase for headings
- Text Color: #FFFFFF

## Mascot
- Description: 3D stylized mascot with glasses, headphones or megaphone, energetic pose
- Style: Cartoonish 3D, colorful gradients, expressive gestures
- Uses: Hero sections, Call to actions, Support bubble
- Path to image: "avatars/o_1iteckaknngm12do11h953rlftfn.webp"

## Graphics
- Style: Gradient overlays, neomorphic elements, glowing effects
- Iconography: Minimal, neon-outline icons or glyphs
- Shapes: Blobs, Spheres, Geometric stars, Rounded rectangles

## Layout
- Structure: Hero first, followed by key event details
- Alignment: Center-aligned headers, grid-based sections
- Call to Action:
  - Style: Rounded buttons
  - Color: #FF2D87
  - Text Color: #FFFFFF
  - Hover Effect: Glow or slight enlargement

## Components

### Navbar
- Background: black
- Text Color: white
- Font Size: 14px
- Items: Speakers, Sponsors, Agenda, Próximos Eventos, Blog

### Footer
- Style: Minimal dark footer with social links
- Background Color: #0A0A0A
- Text Color: #B0B0B0

### Chat Widget
- Style: Mascot-themed assistant in corner
- Position: bottom-right
- Message Style: Speech bubble

# Event Structure

## Key Elements
- Highlights: Conferencias, Workshops, Hackaton
- Duration: 3 days
- Locations: Buenos Aires, Rosario, Mendoza, Salta
- Companies: Google, AWS, X, Microsoft, Vercel
- Target Audience: Developers, Students, Startups, Tech Enthusiasts

## Sponsors Call
- Style: Highlighted section with CTA
- Button:
  - Text: "QUIERO SPONSOREAR"
  - Color: #FF2D87
  - Rounded: true

# Animation Style
- Transitions: Smooth fade-ins, slides
- Interactive Elements:
  - Hover glowing buttons
  - Mascot animation
  - Scrolling reveals

# Branding Principles
- Consistency: Maintain visual style across locations and dates
- Engagement: Use of mascot and vibrant CTA to keep user attention
- Energy: Colorful, exciting, fast-paced aesthetic for innovation

INSTRUCCIONES:
1. Analiza la planificación de alto nivel y distribúyela estratégicamente a lo largo de la semana
2. Para cada día, selecciona OPCIONALMENTE una o múltiples imágenes de referencia de la lista de recursos disponibles (solo si es relevante)
3. Crea una descripción detallada para cada día que servirá como prompt para otro agente que generará la imagen final
4. La descripción debe ser específica y orientada a la creación de contenido visual para redes sociales
5. Si seleccionas imágenes de referencia, menciona explícitamente en la descripción cómo deben usarse

FORMATO DE RESPUESTA (JSON):
{{
  "lunes": {{
    "reference_images": ["path/to/image1.jpg", "path/to/image2.jpg"] o [],
    "description": "Descripción detallada del contenido a generar"
  }},
  "martes": {{
    "reference_images": ["path/to/image.jpg"] o [],
    "description": "Descripción detallada del contenido a generar"
  }},
  "miercoles": {{
    "reference_images": [],
    "description": "Descripción detallada del contenido a generar"
  }},
  "jueves": {{
    "reference_images": ["path/to/image1.jpg", "path/to/image2.jpg", "path/to/image3.jpg"] o [],
    "description": "Descripción detallada del contenido a generar"
  }},
  "viernes": {{
    "reference_images": ["path/to/image.jpg"] o [],
    "description": "Descripción detallada del contenido a generar"
  }},
  "sabado": {{
    "reference_images": [],
    "description": "Descripción detallada del contenido a generar"
  }},
  "domingo": {{
    "reference_images": ["path/to/image.jpg"] o [],
    "description": "Descripción detallada del contenido a generar"
  }}
}}

IMPORTANTE:
- No todos los días requieren imágenes de referencia (puede ser una lista vacía [])
- Puedes seleccionar múltiples imágenes de referencia para un día si es relevante
- Las descripciones deben ser específicas y creativas
- Mantén consistencia con el tono de marca
- Considera las mejores prácticas de engagement para cada día de la semana
- Responde ÚNICAMENTE con el JSON, sin texto adicional
"""
        
        return prompt

    def validate_resources(self, resources_paths: List[str]) -> List[str]:
        """
        Valida que los recursos (imágenes) existan en el sistema.
        
        Args:
            resources_paths: Lista de paths a validar
            
        Returns:
            Lista de paths válidos
        """
        valid_resources = []
        for path in resources_paths:
            if os.path.exists(path):
                valid_resources.append(path)
            else:
                print(f"Advertencia: El recurso {path} no existe")
        
        return valid_resources

def get_weekly_planner_service() -> WeeklyPlannerService:
    """
    Factory function para obtener una instancia del servicio del planificador semanal.
    """
    return WeeklyPlannerService() 