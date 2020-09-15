package com.financiapp.controller.rest;

import com.financiapp.domain.Porcentaje;
import com.financiapp.domain.TipoMoneda;
import com.financiapp.domain.vo.DetalleActivoVo;
import com.financiapp.service.CarteraService;
import com.financiapp.service.DetalleService;
import java.io.IOException;
import java.util.List;
import static java.util.stream.Collectors.toList;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/")
public class CarteraRestController {

    private final CarteraService carteraService;
    private final DetalleService detalleVoService;

    public CarteraRestController(CarteraService carteraService, DetalleService detalleVoService) {
        this.carteraService = carteraService;
        this.detalleVoService = detalleVoService;
    }

    @GetMapping("cartera")
    public List<DetalleActivoVo> obtenerCartera() {
        return carteraService.obtenerCartera()
                .stream()
                .map(detalleActivo -> detalleVoService.formatearDetalleActivo(detalleActivo))
                .collect(toList());
    }

    @GetMapping("porcentaje")
    public List<Porcentaje> obtenerPorcentajes() throws IOException {
        return carteraService.obtenerPorcentaje();
    }

    @GetMapping("tipo-moneda")
    public List<TipoMoneda> obtenerTipoMonedas() {
        return carteraService.obtenerTipoMonedas();
    }

}
