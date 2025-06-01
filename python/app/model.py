from langchain_ollama import OllamaLLM
from prompts import restaurant_prompt

MODEL_NAME = 'phi4'


def get_restaurant_chain():
    llm = OllamaLLM(model=MODEL_NAME)
    chain = restaurant_prompt | llm
    return chain
