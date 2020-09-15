CREATE TABLE meta_inversion (
    id BIGSERIAL PRIMARY KEY,
    monto_a_superar NUMERIC,
    fecha_limite DATE,
    usuario_id BIGINT,
    tipo_moneda VARCHAR,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);