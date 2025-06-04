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
user_addresses = {}
user_finished = set()


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
    menu_items = load_menu_items()
    text_lower = text.lower()
    for item in menu_items.keys():
        if re.search(r'\b' + re.escape(item) + r'\b', text_lower):
            return True
    keywords = ['order', 'zamówić', 'poproszę', 'i want', "i'd like", 'zamawiam']
    return any(kw in text_lower for kw in keywords)


def extract_order_items(text):
    menu_items = load_menu_items()
    ordered = []
    text_lower = text.lower()
    for item in menu_items.keys():
        if re.search(r'\b' + re.escape(item) + r'\b', text_lower):
            ordered.append(item)
    return ordered


def looks_like_address(text):
    return bool(re.search(r'\d{1,4}', text)) and (
        any(
            word in text.lower()
            for word in ['ul.', 'street', 'st.', 'avenue', 'aleja', 'al.']
        )
        or ',' in text
    )


def is_unrelated_question(text):
    unrelated_keywords = [
        'f1',
        'formula 1',
        'weather',
        'news',
        'president',
        'politics',
        'stock',
        'kurs',
        'pogoda',
        'notowania',
    ]
    return any(kw in text.lower() for kw in unrelated_keywords)


@app.event('message')
def handle_message_events(body, say):
    user_input = body.get('event', {}).get('text', '')
    user_id = body.get('event', {}).get('user', '')
    if not user_input:
        return

    if user_id in user_finished:
        if is_unrelated_question(user_input):
            say(
                "I'm here to help only with restaurant questions, menu, opening hours, reservations, or ordering food. If you want to order again, just let me know!"
            )
            return
        if any(
            kw in user_input.lower()
            for kw in ["that's all", 'thank you', 'dziękuję', 'to wszystko']
        ):
            say(
                'Thank you! If you need anything else related to our restaurant, just write. Have a great day!'
            )
            return
        if is_order_intent(user_input):
            user_finished.remove(user_id)
            user_orders[user_id] = []
            say('Sure! What would you like to order?')
            return

    if is_opening_hours_question(user_input):
        response = get_opening_hours()
        say(response)
        return

    if is_menu_question(user_input):
        response = get_menu()
        say(response)
        return

    if is_order_intent(user_input):
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
            f'Your order so far:\n{summary}\n\n'
            'If you want to add more, just say so! '
            'To finish your order, please provide your delivery address.'
        )
        return

    if (
        user_id in user_orders
        and len(user_orders[user_id]) > 0
        and looks_like_address(user_input)
    ):
        user_addresses[user_id] = user_input.strip()
        summary = summarize_order(user_orders[user_id])
        address = user_addresses[user_id]
        say(
            f'Thank you! Here is your order summary:\n'
            f'{summary}\n\n'
            f'Delivery address: {address}\n\n'
            'Your order is being processed and will be delivered as soon as possible! 🍽️🚗\n'
            'If you want to place another order, just let me know!'
        )
        user_finished.add(user_id)
        user_orders.pop(user_id, None)
        user_addresses.pop(user_id, None)
        return

    if is_unrelated_question(user_input):
        say(
            "I'm here to help only with restaurant questions, menu, opening hours, reservations, or ordering food."
        )
        return

    response = chain.invoke({'input': user_input})
    say(response)


if __name__ == '__main__':
    SocketModeHandler(app, SLACK_APP_TOKEN).start()
