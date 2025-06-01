import json


def get_opening_hours(_=None):
    try:
        with open('data/opening_hours.json', 'r', encoding='utf-8') as file:
            data = json.load(file)
        hours = '\n'.join(f'{day}: {times}' for day, times in data.items())
        return hours
    except Exception:
        return "Sorry, I'm unable to retrieve the opening hours right now."
