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
        self.model = ChatOpenAI(model="o3")
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
    
    def generate_monthly_content_plan(self, message: str, thread_id: str = "default", company_info: str = "") -> dict:
        """
        Generate a monthly content plan based on the provided message.
        
        Args:
            message: The content planning request/context
            thread_id: Thread ID for conversation continuity
            company_info: Company information including brand identity, target audience, etc.
            
        Returns:
            Dictionary containing the generated monthly plan
        """
        try:
            config = {"configurable": {"thread_id": thread_id}}

            # Construir el mensaje completo con información de la empresa
            full_message = message
            if company_info:
                full_message = f"""
Actuá como un estratega de marketing digital senior. Tu tarea es analizar la información de esta empresa y crear una planificación *mensual* completa, alineada con su identidad, branding y objetivos de negocio.

La información de marca (branding, tono, misión, públicos, productos, etc.) es:⁠
{company_info}
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

Si algún dato no está explícito, podés inferirlo desde el resto del contexto.

INSTRUCCIONES:
1.⁠ ⁠Analizá profundamente el contenido de ⁠ company_info ⁠.
2.⁠ ⁠Extraé los elementos clave: tono, identidad, audiencia, objetivos, pilares estratégicos, estilo de comunicación.
3.⁠ ⁠Establecé *los objetivos del mes* de forma específica y medible (ej: aumentar interacciones, posicionar servicio, educar sobre X).
4.⁠ ⁠Identificá los *pilares de contenido* más relevantes para esta marca (ej: venta, educación, comunidad, inspiración).
5.⁠ ⁠Dividí el mes en *4 semanas*, cada una con:
   - Una descripción de enfoque general
   - Objetivos concretos de esa semana
   - Una lista de posteos detallados (7 objetos ⁠ DiaPost ⁠, uno por día)
6.⁠ ⁠Cada posteo debe incluir:
   - ⁠ dia ⁠: día de la semana (lunes, martes…)
   - ⁠ content_description ⁠: descripción general del tema
   - ⁠ is_image_required ⁠: si necesita imagen o no
   - ⁠ image_detail_description ⁠: descripción para que la IA cree la imagen
   - ⁠ copy_for_post ⁠: copy claro, humano y accionable
   - ⁠ reference_images ⁠: dejar como lista vacía (la IA los completará en otro paso)

7.⁠ ⁠Mantené el tono profesional pero cercano, respetando el estilo de la marca.
8.⁠ ⁠Cada post debe tener un *propósito* claro (ej: generar confianza, educar, inspirar, mostrar un producto, generar comunidad).
9.⁠ ⁠Asegurate que haya variedad de tipos de posteo (reels, carruseles, testimonios, lifestyle, educativo, etc.).

Por favor, utiliza la información de la empresa para crear un plan de contenido personalizado que se alinee con su identidad de marca, público objetivo, productos/servicios y valores.

SOLICITUD DE PLANIFICACIÓN:
{message}
"""

            response = self.agent.invoke(
                input={
                    "messages": [HumanMessage(content=full_message)]
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
                "model": "o3"
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