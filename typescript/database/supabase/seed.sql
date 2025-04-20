insert into
    "categories" (name, icon)
values
    ('Electronics', 'LaptopIcon'),
    ('Books', 'ReaderIcon'),
    ('Home & Kitchen', 'HomeIcon'),
    ('Sports', 'PersonIcon');

insert into
    products (name, description, quantity, price, category_id)
values
    (
        'Wireless Headphones',
        'High-quality bluetooth headphones with noise cancellation',
        15,
        199.99,
        1
    ),
    (
        'Smart Watch',
        'Fitness tracking smartwatch with heart rate monitor',
        20,
        299.99,
        1
    ),
    (
        'The Art of Programming',
        'Comprehensive guide to modern programming practices',
        50,
        49.99,
        2
    ),
    (
        'Science Fiction Anthology',
        'Collection of best sci-fi short stories',
        30,
        29.99,
        2
    ),
    (
        'Coffee Maker',
        'Programmable coffee maker with 12-cup capacity',
        10,
        79.99,
        3
    ),
    (
        'Air Fryer',
        'Digital air fryer with multiple cooking presets',
        25,
        129.99,
        3
    ),
    (
        'Yoga Mat',
        'Non-slip exercise yoga mat with carrying strap',
        40,
        24.99,
        4
    ),
    (
        'Dumbbell Set',
        'Adjustable dumbbell set with stand',
        8,
        149.99,
        4
    );