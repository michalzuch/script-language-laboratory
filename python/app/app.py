from dotenv import load_dotenv
from model import get_restaurant_chain
from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler
import os

load_dotenv()

SLACK_APP_TOKEN = os.getenv('SLACK_APP_TOKEN')
SLACK_BOT_TOKEN = os.getenv('SLACK_BOT_TOKEN')

app = App(token=SLACK_BOT_TOKEN)
chain = get_restaurant_chain()


@app.event('message')
def handle_message_events(body, say):
    user_input = body.get('event', {}).get('text', '')
    if user_input:
        response = chain.invoke({'input': user_input})
        say(response)


if __name__ == '__main__':
    SocketModeHandler(app, SLACK_APP_TOKEN).start()
