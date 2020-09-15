CREATE TABLE monto_mensual_estimado (
    id BIGSERIAL PRIMARY KEY,
    monto_estimado VARCHAR,
    usuario_id BIGINT,
    anio VARCHAR,
    mes VARCHAR
);