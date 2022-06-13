CREATE TABLE Users (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    login varchar(255) not null,
    password varchar(255) not null,
    age int,
    is_deleted boolean
)
