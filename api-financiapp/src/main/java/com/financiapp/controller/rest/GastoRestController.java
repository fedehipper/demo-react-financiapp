package com.financiapp.controller.rest;

import com.financiapp.domain.vo.ComboAniosVo;
import com.financiapp.domain.vo.ComboMesesVo;
import com.financiapp.domain.vo.GastoVo;
import com.financiapp.domain.vo.GraficoBurnUpGastosMensualVo;
import com.financiapp.domain.vo.SumatoriaGastoMesVo;
import com.financiapp.service.GastoModificacionService;
import com.financiapp.service.GastoService;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/")
@CrossOrigin(origins = "http://localhost:3000")
public class GastoRestController {

    private final GastoService gastoService;
    private final GastoModificacionService gastoModificacionService;

    public GastoRestController(GastoService gastoService, GastoModificacionService gastoModificacionService) {
        this.gastoService = gastoService;
        this.gastoModificacionService = gastoModificacionService;
    }

    @GetMapping("gasto")
    public List<GastoVo> buscarGastos(@RequestParam Integer anio, @RequestParam Integer mes) {
        return gastoService.buscarPorAnioYMes(anio, mes);
    }

    @GetMapping("gastoBurnUp")
    public GraficoBurnUpGastosMensualVo buscarGastoBurnUp(@RequestParam String anio, @RequestParam String mes) {
        return gastoService.obtenerBurnUpPorAnioYMes(anio, mes);
    }

    @GetMapping("comboAnio")
    public ComboAniosVo buscarComboAnios() {
        return gastoService.buscarAnios();
    }

    @GetMapping("comboMes")
    public ComboMesesVo buscarComboAnios(@RequestParam Integer anio) {
        return gastoService.buscarMesesPorAnio(anio);
    }

    @PutMapping("gasto/necesidad/{id}")
    public void modificarNecesidad(@PathVariable long id) {
        gastoModificacionService.modificarNecesidad(id);
    }

    @GetMapping("gasto/total")
    public SumatoriaGastoMesVo buscarSumatoriaGastoMes(@RequestParam int mes, @RequestParam int anio) {
        return gastoService.sumatoriaGastoMes(anio, mes);
    }

    @PostMapping("gasto")
    public void crearNuevo(@RequestBody GastoVo gastoVo) {
        gastoService.crearNuevo(gastoVo);
    }

    @PutMapping("gasto/{id}")
    public void modificarExistente(@RequestBody GastoVo gastoVo, @PathVariable Long id) {
        gastoModificacionService.modificarUnGastoPorId(gastoVo, id);
    }

    @DeleteMapping("gasto/{id}")
    public void eliminar(@PathVariable Long id) {
        gastoModificacionService.eliminarPorId(id);
    }

}
