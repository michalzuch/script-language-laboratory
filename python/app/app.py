from dotenv import load_dotenv
from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler
import os

from model import get_restaurant_chain
from tools import get_opening_hours

load_dotenv()

SLACK_APP_TOKEN = os.getenv('SLACK_APP_TOKEN')
SLACK_BOT_TOKEN = os.getenv('SLACK_BOT_TOKEN')

app = App(token=SLACK_BOT_TOKEN)
chain = get_restaurant_chain()


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


@app.event('message')
def handle_message_events(body, say):
    user_input = body.get('event', {}).get('text', '')
    if user_input:
        if is_opening_hours_question(user_input):
            response = get_opening_hours()
            say(response)
        else:
            response = chain.invoke({'input': user_input})
            say(response)


if __name__ == '__main__':
    SocketModeHandler(app, SLACK_APP_TOKEN).start()
