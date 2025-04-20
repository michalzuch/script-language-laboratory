drop table if exists products;

create table
    products (
        id serial primary key,
        name varchar(255) not null,
        description text,
        quantity integer not null,
        price decimal(10, 2) not null,
        category_id integer references categories (id)
    );