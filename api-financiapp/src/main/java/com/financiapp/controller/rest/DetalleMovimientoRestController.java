package com.financiapp.controller.rest;

import com.financiapp.domain.vo.DetalleTotalVo;
import com.financiapp.domain.vo.MetaInversionVo;
import com.financiapp.service.DetalleActivoService;
import com.financiapp.service.DetalleService;
import com.financiapp.service.MetaInversionService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/")
public class DetalleMovimientoRestController {

    private final DetalleActivoService detalleMovimientoService;
    private final DetalleService detalleService;
    private final MetaInversionService metaInversionService;

    public DetalleMovimientoRestController(DetalleActivoService detalleMovimientoService,
            DetalleService detalleVoService, MetaInversionService metaInversionService) {
        this.detalleMovimientoService = detalleMovimientoService;
        this.detalleService = detalleVoService;
        this.metaInversionService = metaInversionService;
    }

    @GetMapping("detalle-activo")
    public List<DetalleTotalVo> obtenerDetalleMovimiento() {
        return detalleService
                .formatearDetalleTotal(detalleMovimientoService.calcularDetalleMovimientoTotal());
    }

    @PutMapping("meta")
    public void moficarMeta(@RequestBody MetaInversionVo metaInversionVo) {
        metaInversionService.modificar(metaInversionVo);
    }

}
