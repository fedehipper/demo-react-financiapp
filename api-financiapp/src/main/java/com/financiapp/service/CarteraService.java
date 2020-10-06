package com.financiapp.service;

import com.financiapp.domain.Activo;
import com.financiapp.domain.DetalleActivo;
import com.financiapp.domain.Movimiento;
import com.financiapp.domain.Porcentaje;
import com.financiapp.domain.TipoMoneda;
import com.financiapp.repository.ActivoRepository;
import com.financiapp.repository.CotizacionDolarRepository;
import com.financiapp.repository.MovimientoRepository;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import static java.util.stream.Collectors.toList;
import javax.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class CarteraService {

    private final MovimientoRepository movimientoRepository;
    private final DetalleActivoService detalleActivoService;
    private final ActivoRepository activoRepository;
    private final CotizacionDolarService cotizacionDolarService;
    private final UsuarioService usuarioService;

    public CarteraService(MovimientoRepository movimientoRepository,
            DetalleActivoService detalleActivoService,
            ActivoRepository activoRepository,
            CotizacionDolarService cotizacionDolarService,
            UsuarioService usuarioService) {
        this.movimientoRepository = movimientoRepository;
        this.detalleActivoService = detalleActivoService;
        this.activoRepository = activoRepository;
        this.cotizacionDolarService = cotizacionDolarService;
        this.usuarioService = usuarioService;
    }

    public List<DetalleActivo> obtenerCartera() {
        return buscarTodos()
                .stream()
                .map(movimiento -> movimiento.getActivo().getId())
                .distinct()
                .sorted()
                .map(detalleActivoService::calcularDetalleActivoIndividual)
                .collect(toList());
    }

    public List<TipoMoneda> obtenerTipoMonedas() {
        return List.of(TipoMoneda.values());
    }

    public List<Porcentaje> obtenerPorcentaje() throws IOException {
        var activos = activoRepository.findByUsuarioUsername(usuarioService.getUsuarioLogueado());

        if (activos.isEmpty()) {
            return new ArrayList<>();
        } else {
            var cotizacionDolar = cotizacionDolarService.buscarCotizacion().getLibre();
            var montoTotal = sumarMontos(activos, cotizacionDolar);
            return activos
                    .stream()
                    .map(activo -> {
                        var porcentaje = new Porcentaje();
                        porcentaje.setNombreActivo(activo.getNombre());
                        porcentaje.setPorcentajeActivo(calculoPorcentaje(montoTotal, determinarMontoInvertidoParaActivo(activo, cotizacionDolar)));
                        return porcentaje;
                    })
                    .collect(toList());
        }
    }

    private List<Movimiento> buscarTodos() {
        return movimientoRepository
                .findByUsuarioUsername(usuarioService.getUsuarioLogueado());
    }

    private BigDecimal determinarMontoInvertidoParaActivo(Activo activo, BigDecimal cotizacionDolar) {
        if (TipoMoneda.USD.equals(activo.getTipoMoneda())) {
            return activo.getMontoInvertido().multiply(cotizacionDolar).setScale(2, RoundingMode.FLOOR);
        } else {
            return activo.getMontoInvertido();
        }
    }

    private BigDecimal sumarMontos(List<Activo> activos, BigDecimal cotizacionDolar) {
        return activos
                .stream()
                .map(activo -> determinarMontoInvertidoParaActivo(activo, cotizacionDolar))
                .reduce(BigDecimal.ZERO, (unMonto, otroMonto) -> unMonto.add(otroMonto));
    }

    private BigDecimal calculoPorcentaje(BigDecimal total, BigDecimal cantidad) {
        return cantidad
                .multiply(new BigDecimal("100.00"))
                .divide(total, 2, RoundingMode.FLOOR);
    }

}
