# Restaurant Chatbot in Python

## Prerequisites

1. Install [uv](https://docs.astral.sh/uv/)

2. Set up a Slack App:
   - Create a new [Slack App](https://api.slack.com/quickstart)
   - Add Bot Token Scopes: `chat:write`, `im:history`, `app_mentions:read`
   - Install the app to your workspace
   - Copy the Bot User OAuth Token and App-Level Token
   - Add tokens to `.env` file

## Running the Application

Run the application:

```bash
cd app
uv run app.py
```
