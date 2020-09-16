package com.financiapp.controller.rest;

import com.financiapp.domain.vo.MovimientoEntranteVo;
import com.financiapp.domain.vo.MovimientoSalienteVo;
import com.financiapp.service.MovimientoService;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/")
@CrossOrigin(origins = "http://localhost:3000")
public class MovimientoRestController {

    private final MovimientoService movimientoService;

    public MovimientoRestController(MovimientoService movimientoService) {
        this.movimientoService = movimientoService;
    }

    @PostMapping("movimiento")
    public void actualizar(@RequestBody MovimientoEntranteVo activo) {
        movimientoService.realizarMovimientoTipoActualizacion(activo);
    }

    @PostMapping("activo")
    public void inicializar(@RequestBody MovimientoEntranteVo movimiento) {
        movimientoService.inicializarActivoYMovimiento(movimiento);
    }

    @PostMapping("movimiento/inversion-nueva")
    public void realizarMovimientoTipoInversion(@RequestParam long activoId, @RequestParam BigDecimal monto) {
        movimientoService.realizarMovimientoTipoInversion(activoId, monto);
    }

    @PostMapping("movimiento/rescate")
    public void realizarMovimientoTipoRescate(@RequestParam long activoId, @RequestParam BigDecimal monto) {
        movimientoService.realizarMovimientoTipoRescate(activoId, monto);
    }
    
    @DeleteMapping("movimiento/activo/{activoId}")
    public void eliminarMovimeintoPorId(@PathVariable long activoId) {
        movimientoService.eliminarMovimientoDeHoyPorActivoId(activoId);
    }
    
    @GetMapping("movimiento/activo/{activoId}")
    public List<MovimientoSalienteVo> buscarTodosPorActivoId(@PathVariable long activoId) {
        return movimientoService.buscarPorActivoId(activoId);
    }

}
