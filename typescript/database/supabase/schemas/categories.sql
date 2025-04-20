drop table if exists categories;

create table
    categories (
        id serial primary key,
        name varchar(255) not null,
        icon varchar(255) not null
    );