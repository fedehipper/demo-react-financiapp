CREATE TABLE gasto (
    id BIGSERIAL PRIMARY KEY,
    fecha DATE,
    concepto VARCHAR,
    valor NUMERIC,
    necesario BOOLEAN
)