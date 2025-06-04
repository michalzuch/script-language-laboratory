from dotenv import load_dotenv
from model import get_restaurant_chain
from tools import get_opening_hours, get_menu, load_menu_items, summarize_order
from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler
import os
import re

load_dotenv()

SLACK_APP_TOKEN = os.getenv('SLACK_APP_TOKEN')
SLACK_BOT_TOKEN = os.getenv('SLACK_BOT_TOKEN')

app = App(token=SLACK_BOT_TOKEN)
chain = get_restaurant_chain()
user_orders = {}


def is_opening_hours_question(text):
    keywords = [
        'opening hours',
        'when are you open',
        'what time do you open',
        'what time do you close',
        'godziny otwarcia',
        'kiedy jesteście otwarci',
        'o której otwieracie',
        'o której zamykacie',
    ]
    return any(kw in text.lower() for kw in keywords)


def is_menu_question(text):
    keywords = [
        'menu',
        'what do you serve',
        'what can I order',
        'dania',
        'karta dań',
        'co mogę zamówić',
        'pokaż menu',
    ]
    return any(kw in text.lower() for kw in keywords)


def is_order_intent(text):
    keywords = ['order', 'zamówić', 'poproszę', 'i want', "i'd like", 'zamawiam']
    return any(kw in text.lower() for kw in keywords)


def extract_order_items(text):
    menu_items = load_menu_items()
    ordered = []
    text_lower = text.lower()
    for item in menu_items.keys():
        if re.search(r'\b' + re.escape(item) + r'\b', text_lower):
            ordered.append(item)
    return ordered


@app.event('message')
def handle_message_events(body, say):
    user_input = body.get('event', {}).get('text', '')
    user_id = body.get('event', {}).get('user', '')
    if user_input:
        if is_opening_hours_question(user_input):
            response = get_opening_hours()
            say(response)
        elif is_menu_question(user_input):
            response = get_menu()
            say(response)
        elif is_order_intent(user_input):
            items = extract_order_items(user_input)
            if not items:
                say(
                    "I couldn't find any menu items in your order. Please specify what you'd like to order using the names from our menu."
                )
                return
            if user_id not in user_orders:
                user_orders[user_id] = []
            user_orders[user_id].extend(items)
            summary = summarize_order(user_orders[user_id])
            say(
                f'Your order so far:\n{summary}\n\nIf you want to add more, just say so! To finish your order, please provide your address.'
            )
        else:
            response = chain.invoke({'input': user_input})
            say(response)


if __name__ == '__main__':
    SocketModeHandler(app, SLACK_APP_TOKEN).start()
