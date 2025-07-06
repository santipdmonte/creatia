"""
agent_planner_graph.py
This graph is used to create a react agent with a custom state and tools.
"""

import enum
from typing import Optional, List
from pydantic import BaseModel
from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent
from langgraph.prebuilt.chat_agent_executor import AgentState
from langgraph.checkpoint.memory import MemorySaver
from langchain_core.messages import BaseMessage
from dotenv import load_dotenv

load_dotenv()

checkpointer = MemorySaver()

# Define model and checkpointer
model = ChatOpenAI(model="gpt-4o-mini")

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



# ==== Prompt ====
PROMPT = """
Eres un experto en planificacion de contenido para redes sociales.
En esta ocacion esta realizando la planificacion mensual para el contenido de una empresa.
Este mes la empresa quiere enfocarse en la publicication de su hackaton a fin de mes
"""

def prompt(
    state: State
):
    system_msg = f"{PROMPT}"
    return [{"role": "system", "content": system_msg}]


# ==== Create agent ====
core_supreme_agent = create_react_agent(
    model,
    tools=[],
    prompt=prompt,
    response_format=State,
)

message = "Contenido para la hackaton de fin de mes"

config = {"configurable": {"thread_id": "1"}}

response = core_supreme_agent.invoke({"messages": message})

print(response['structured_response'])

response_dict = response['structured_response'].model_dump() #.dict()
print("--------------------")
print(response_dict)