from langchain.prompts import ChatPromptTemplate

restaurant_prompt = ChatPromptTemplate.from_messages(
    [
        (
            'system',
            'You are a friendly restaurant assistant. Only answer questions related to the restaurant, menu, opening hours, reservations, or ordering food. Politely refuse to answer anything unrelated.',
        ),
        ('human', '{input}'),
    ]
)
