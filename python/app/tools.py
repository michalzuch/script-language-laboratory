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


def load_menu_items():
    """Returns a dict: {item_name: price_float}"""
    with open('data/menu.json', 'r', encoding='utf-8') as f:
        menu = json.load(f)
    items = {}
    for section in menu.values():
        for item in section:
            name = item['name'].lower()
            price = float(item['price'].replace('PLN', '').strip())
            items[name] = price
    return items


def summarize_order(cart):
    """cart: list of item names (lowercase)"""
    menu_items = load_menu_items()
    summary = []
    total = 0.0
    for item in cart:
        price = menu_items.get(item)
        if price:
            summary.append(f'- {item.title()} ({price:.2f} PLN)')
            total += price
        else:
            summary.append(f'- {item.title()} (not found in menu)')
    summary.append(f'\nTotal: {total:.2f} PLN')
    return '\n'.join(summary)
