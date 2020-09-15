package com.financiapp.service;

import javax.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class FinInversionService {

    private final ActivoService activoService;
    private final MovimientoService movimientoService;

    public FinInversionService(ActivoService activoService, MovimientoService movimientoService) {
        this.activoService = activoService;
        this.movimientoService = movimientoService;
    }

    public void finalizarInversion(Long idActivo) {
        movimientoService.eliminarMovimientosPorIdActivo(idActivo);
        activoService.eliminar(idActivo);
    }

}
