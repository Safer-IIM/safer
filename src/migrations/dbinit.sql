CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    username text  NOT NULL,
    email text  NOT NULL,
    password text  NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)