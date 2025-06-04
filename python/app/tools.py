import json


def get_opening_hours(_=None):
    """Returns the restaurant's opening hours from the JSON file."""
    try:
        with open('data/opening_hours.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
        hours = '\n'.join(f'{day}: {times}' for day, times in data.items())
        return hours
    except Exception:
        return "Sorry, I'm unable to retrieve the opening hours right now."


def get_menu(_=None):
    """Returns the restaurant's menu from the JSON file."""
    try:
        with open('data/menu.json', 'r', encoding='utf-8') as f:
            menu = json.load(f)
        output = []
        for section, items in menu.items():
            output.append(f'*{section}*')
            for item in items:
                output.append(f'- {item["name"]} ({item["price"]})')
            output.append('')
        return '\n'.join(output)
    except Exception:
        return "Sorry, I'm unable to retrieve the menu right now."
