package com.financiapp.controller.rest;

import com.financiapp.domain.vo.MontoMensualEstimadoVo;
import com.financiapp.service.MontoMensualEstimadoService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MontoMensualEstimadoRestController {

    private final MontoMensualEstimadoService montoMensualEstimadoService;

    public MontoMensualEstimadoRestController(MontoMensualEstimadoService montoMensualEstimadoService) {
        this.montoMensualEstimadoService = montoMensualEstimadoService;
    }

    @GetMapping("/api/montoMensualEstimado")
    public String buscar(@RequestParam String anio, @RequestParam String mes) {
        return montoMensualEstimadoService.buscarPorAnioYMes(anio, mes);
    }

    @PutMapping("/api/montoMensualEstimado")
    public String actualizar(@RequestBody MontoMensualEstimadoVo montoMensualEstimadoVo) {
        return montoMensualEstimadoService.actualizarMontoMensualEstimado(montoMensualEstimadoVo);
    }
}
