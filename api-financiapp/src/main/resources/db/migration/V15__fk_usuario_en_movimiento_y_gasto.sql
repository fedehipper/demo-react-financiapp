ALTER TABLE movimiento
ADD FOREIGN KEY (usuario_id) REFERENCES usuario(id);

ALTER TABLE gasto
ADD FOREIGN KEY (usuario_id) REFERENCES usuario(id);