CREATE TABLE rol (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR
);

CREATE TABLE usuario (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR,
    password VARCHAR,
    enabled BOOLEAN,
    rol_id BIGINT,
    FOREIGN KEY (rol_id) REFERENCES rol(id)
);

