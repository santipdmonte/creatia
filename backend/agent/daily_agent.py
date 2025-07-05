"""
agent_planner_graph.py
This graph is used to create a react agent with a custom state and tools.
"""

from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt.chat_agent_executor import AgentState
from langchain_core.messages import AnyMessage
from typing import Annotated

from langmem.short_term import SummarizationNode
from langchain_core.messages.utils import count_tokens_approximately
from typing import Any

from langchain_core.tools import InjectedToolCallId
from langgraph.types import Command
from langchain_core.messages import ToolMessage

from state import ViajeState

from langgraph.types import interrupt


# Define model and checkpointer
model = ChatOpenAI(model="gpt-4o-mini")
checkpointer = MemorySaver()


class CustomState(AgentState):
    image_generation_prompt: str


# ==== Prompt ====
PROMPT = """
Creame un prompt detallado para generar una imagen para una historia de instagram.
El prompt debe ser detallado y descriptivo, para que la imagen sea lo mas realista posible.
El prompt debe ser en español.
El prompt debe ser en formato markdown.
El prompt debe ser en formato markdown.
"""

def prompt(
    state: CustomState
):
    system_msg = f"{PROMPT} El prompt actual es: {state['image_generation_prompt']}"
    return [{"role": "system", "content": system_msg}] + list(state["messages"])


# ==== Tools ====
def apply_itinerary_modifications(
    tool_call_id: Annotated[str, InjectedToolCallId],
    new_itinerary: ViajeState,
    #new_itinerary: str,
    new_itinerary_modifications_summary: str,
    # Itinerary: ItineraryState
) :
    """
    Modify the itinerary.
    
    input:
        - new_itinerary: ViajeState
        - new_itinerary_modifications_summary: str
    """

    user_feedback = interrupt(  
        f"Se van a aplicar las siguientes modificaciones al itinerario: {new_itinerary_modifications_summary}. "
        "¿Estás de acuerdo? [Si (s)] (Mencionar cambios si no estas de acuerdo)"
    )

    user_feedback = user_feedback["messages"].lower()

    print(f"====\n \n User feedback: {user_feedback} \n ====")

    if user_feedback == "s" or user_feedback == "si":
        # TODO: Apply the modifications to the itinerary in the DB

        return Command(update={
            "itinerary": new_itinerary,
            # update the message history
            "messages": [
                ToolMessage(
                    "Successfully applied itinerary modifications",
                    tool_call_id=tool_call_id
                )
            ]
        }) 
    
    else:
        return Command(update={
            "messages": [
                ToolMessage(
                    f"El usuario no aceptó las modificaciones al itinerario, esta fue su respuesta: {user_feedback}",
                    tool_call_id=tool_call_id
                )
            ]
        })

tools = [apply_itinerary_modifications]


# ==== Create agents ====
itinerary_agent = create_react_agent(
    model,
    tools=tools,
    prompt=prompt,
    checkpointer=checkpointer,
    state_schema=CustomState,
)
