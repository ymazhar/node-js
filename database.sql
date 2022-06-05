CREATE TABLE Users (
    id SERIAL,
    login varchar(255),
    password varchar(255),
    age int,
    is_deleted boolean
)
