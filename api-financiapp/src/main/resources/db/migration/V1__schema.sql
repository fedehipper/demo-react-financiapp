CREATE TABLE activo(
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(30),
    meta NUMERIC,
    monto_inicial NUMERIC
);

CREATE TABLE activo_diario(
    id BIGSERIAL PRIMARY KEY,
    fecha DATE,
    monto NUMERIC,
    fin_periodo boolean,
    activo_id BIGINT,
    FOREIGN KEY (activo_id) REFERENCES activo(id)
);