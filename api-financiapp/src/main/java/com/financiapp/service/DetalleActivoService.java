package com.financiapp.service;

import com.financiapp.domain.Activo;
import com.financiapp.domain.Movimiento;
import com.financiapp.domain.DetalleActivo;
import com.financiapp.domain.DetalleTotal;
import com.financiapp.domain.TipoMoneda;
import com.financiapp.domain.TipoMovimiento;
import static com.financiapp.domain.TipoMovimiento.RESCATE;
import com.financiapp.repository.ActivoRepository;
import java.math.BigDecimal;
import java.util.List;
import static java.util.stream.Collectors.toList;
import javax.transaction.Transactional;
import org.springframework.stereotype.Service;
import static com.financiapp.domain.TipoMovimiento.INVERSION;
import com.financiapp.domain.Usuario;
import com.financiapp.repository.MovimientoRepository;
import java.util.function.BinaryOperator;
import static com.financiapp.domain.TipoMovimiento.ACTUALIZACION;

@Service
@Transactional
public class DetalleActivoService {

    private final MovimientoRepository movimientoRepository;
    private final ActivoRepository activoRepository;
    private final UsuarioService usuarioService;

    public DetalleActivoService(
            ActivoRepository activoRepository,
            UsuarioService usuarioService,
            MovimientoRepository movimientoRepository) {
        this.movimientoRepository = movimientoRepository;
        this.activoRepository = activoRepository;
        this.usuarioService = usuarioService;
    }

    public List<DetalleTotal> calcularDetalleMovimientoTotal() {
        var usuario = usuarioService.buscarUsuarioLogueado();
        var monedasEnInversion = buscarTipoMonedasEnInversion(usuario);

        return monedasEnInversion.stream().map(monedaEnInversion -> {

            List<Movimiento> movimientos = buscarMovimientosPorTipoMoneda(monedaEnInversion);

            var detallesActivos = activoRepository
                    .findByUsuarioUsername(usuario.getUsername())
                    .stream()
                    .filter(activo -> monedaEnInversion.equals(activo.getTipoMoneda()))
                    .map(activoVigente -> calcularDetalleActivoIndividual(activoVigente.getId()))
                    .sorted((unDetalleActivo, otroDetalleActivo) -> unDetalleActivo.getFechaActual().compareTo(otroDetalleActivo.getFechaInicial()))
                    .collect(toList());

            var montoInicial = BigDecimal.ZERO;
            var gananciaTotal = BigDecimal.ZERO;

            var fechaUltimaActualizacionDetalle = detallesActivos.get(detallesActivos.size() - 1).getFechaActual();

            var gananciaParcial = detallesActivos
                    .stream()
                    .filter(detalleActivo -> detalleActivo.getFechaActual().equals(fechaUltimaActualizacionDetalle))
                    .map(detalleActivo -> detalleActivo.getGananciaParcial())
                    .reduce(BigDecimal.ZERO, (unaGanancia, otraGanancia) -> unaGanancia.add(otraGanancia));

            var montoActual = BigDecimal.ZERO;
            for (DetalleActivo detalleActivo : detallesActivos) {
                montoInicial = montoInicial.add(detalleActivo.getMontoInicial());
                gananciaTotal = gananciaTotal.add(detalleActivo.getGananciaTotal());
                montoActual = montoActual.add(detalleActivo.getMontoActual());
            }

            var gananciaParcialResultante = (movimientos.size() == 1 ? BigDecimal.ZERO.setScale(2) : gananciaParcial);
            return crearDetalleTotal(monedaEnInversion, gananciaParcialResultante, gananciaTotal, montoActual, montoInicial);

        }).collect(toList());
    }

    public DetalleActivo calcularDetalleActivoIndividual(Long activoId) {
        List<Movimiento> movimientos = movimientoRepository
                .findByUsuarioUsernameAndActivoIdOrderByFecha(usuarioService.getUsuarioLogueado(), activoId);

        if (movimientos.isEmpty()) {
            return null;
        } else {
            return calcularDetalleActivo(movimientos);
        }
    }

    private DetalleTotal crearDetalleTotal(TipoMoneda tipoMoneda,
            BigDecimal gananciaParcial, BigDecimal gananciaTotal,
            BigDecimal montoActual, BigDecimal montoInicial) {
        var detalleTotal = new DetalleTotal();
        detalleTotal.setTipoMoneda(tipoMoneda);
        detalleTotal.setGananciaParcial(gananciaParcial);
        detalleTotal.setGananciaTotal(gananciaTotal);
        detalleTotal.setMontoActual(montoActual);
        detalleTotal.setMontoInicial(montoInicial);
        return detalleTotal;
    }

    private List<Movimiento> buscarMovimientosPorTipoMoneda(TipoMoneda tipoMoneda) {
        return movimientoRepository
                .findByUsuarioUsernameAndActivoTipoMoneda(usuarioService.getUsuarioLogueado(), tipoMoneda);
    }

    private final BinaryOperator<BigDecimal> sumatoria = (unMonto, otroMonto) -> unMonto.add(otroMonto);

    private DetalleActivo calcularDetalleActivo(List<Movimiento> movimientos) {
        var ultimoMovimiento = movimientos.get(movimientos.size() - 1);
        var primerMovimiento = movimientos.get(0);
        var movimientosDiarios = obtenerMovimientosDiarios(movimientos);
        var ultimoMovimientoDiario = ultimoMovimientoDiario(movimientosDiarios);
        var detalleActivo = new DetalleActivo();

        detalleActivo.setNombre(primerMovimiento.getActivo().getNombre());
        detalleActivo.setMoneda(primerMovimiento.getActivo().getTipoMoneda());
        detalleActivo.setFechaActual(ultimoMovimiento.getFecha());
        detalleActivo.setGananciaParcial(determinarGananciaParcial(movimientos, movimientosDiarios));

        var montoInicialConInversionesYRescates = obtenerMontoInicialConInversionesYRescates(movimientos, primerMovimiento.getMonto());

        detalleActivo.setGananciaTotal(determinarGananciaTotal(movimientos));
        detalleActivo.setMontoInicial(montoInicialConInversionesYRescates);
        detalleActivo.setFechaInicial(primerMovimiento.getFecha());

        var montoActual = ultimoMovimientoDiario
                .getMonto()
                .add(sumatoriaUltimosMovimientosSegunTipoDespuesDelUltimoDiario(movimientos, ultimoMovimientoDiario, INVERSION))
                .subtract(sumatoriaUltimosMovimientosSegunTipoDespuesDelUltimoDiario(movimientos, ultimoMovimientoDiario, RESCATE));

        detalleActivo.setMontoActual(montoActual);
        detalleActivo.setId(primerMovimiento.getActivo().getId());

        return detalleActivo;
    }

    private BigDecimal determinarGananciaTotal(List<Movimiento> movimientos) {
        var gananciaTotal = BigDecimal.ZERO;
        var montoAnterior = movimientos.get(0).getMonto();
        for (Movimiento movimiento : movimientos) {
            if (!List.of(INVERSION, RESCATE).contains(movimiento.getTipo())) {
                gananciaTotal = gananciaTotal.add(movimiento.getMonto().subtract(montoAnterior));
                montoAnterior = movimiento.getMonto();
            } else if (INVERSION.equals(movimiento.getTipo())) {
                montoAnterior = montoAnterior.add(movimiento.getMonto());
            } else {
                montoAnterior = montoAnterior.subtract(movimiento.getMonto());
            }
        }
        return gananciaTotal;
    }

    private Movimiento ultimoMovimientoDiario(List<Movimiento> movimientosDiarios) {
        return movimientosDiarios.get(movimientosDiarios.size() - 1);
    }

    private BigDecimal determinarGananciaParcial(List<Movimiento> movimientos, List<Movimiento> movimientosDiarios) {
        if (movimientos.size() == 1 || movimientos.stream().filter(movimiento -> ACTUALIZACION.equals(movimiento.getTipo())).count() == 1) {
            return BigDecimal.ZERO;
        } else {
            var movimientoDiarioAnteriorAlUltimo = movimientosDiarios.get(movimientosDiarios.size() - 2);
            var movimientoDiarioMasReciente = movimientoDiarioMasReciente(movimientos);
            var movimientoAnteriorAlDiarioMasReciente = movimientoAnteriorAlDiarioMasReciente(movimientos, movimientoDiarioMasReciente);

            if (List.of(INVERSION, RESCATE).contains(movimientoAnteriorAlDiarioMasReciente.getTipo())) {
                return BigDecimal.ZERO;
            } else {
                return ultimoMovimientoDiario(movimientosDiarios)
                        .getMonto()
                        .subtract(movimientoDiarioAnteriorAlUltimo.getMonto());
            }
        }
    }

    private Movimiento movimientoDiarioMasReciente(List<Movimiento> movimientos) {
        Movimiento movimientoDiario = null;
        for (Movimiento movimiento : movimientos) {
            if (ACTUALIZACION.equals(movimiento.getTipo())) {
                movimientoDiario = movimiento;
            }
        }
        return movimientoDiario;
    }

    private Movimiento movimientoAnteriorAlDiarioMasReciente(List<Movimiento> movimientos, Movimiento movimientoDiarioMasReciente) {
        return movimientos.get(movimientos.indexOf(movimientoDiarioMasReciente) - 1);
    }

    private BigDecimal obtenerMontoInicialConInversionesYRescates(List<Movimiento> movimientos, BigDecimal primerMontoInvertido) {
        var montoInicial = primerMontoInvertido;
        for (Movimiento movimiento : movimientos) {
            if (INVERSION.equals(movimiento.getTipo())) {
                montoInicial = montoInicial.add(movimiento.getMonto());
            }
            if (RESCATE.equals(movimiento.getTipo())) {
                if (movimiento.getMonto().compareTo(montoInicial) > 0) {
                    throw new IllegalArgumentException("No se puede rescatar un monto mayor al inicial");
                }
                montoInicial = montoInicial.subtract(movimiento.getMonto());
            }
        }
        return montoInicial;
    }

    private List<Movimiento> obtenerMovimientosDiarios(List<Movimiento> movimientos) {
        return movimientos
                .stream()
                .filter(movimiento -> ACTUALIZACION.equals(movimiento.getTipo()))
                .collect(toList());
    }

    private BigDecimal sumatoriaUltimosMovimientosSegunTipoDespuesDelUltimoDiario(List<Movimiento> movimientos, Movimiento movimientoMasReciente, TipoMovimiento tipoMovimiento) {
        return movimientos
                .stream()
                .filter(movimiento -> tipoMovimiento.equals(movimiento.getTipo()) && movimiento.getFecha().isAfter(movimientoMasReciente.getFecha()))
                .map(Movimiento::getMonto)
                .reduce(BigDecimal.ZERO, sumatoria);
    }

    private List<TipoMoneda> buscarTipoMonedasEnInversion(Usuario usuario) {
        return activoRepository
                .findByUsuarioUsername(usuario.getUsername())
                .stream()
                .map(Activo::getTipoMoneda)
                .distinct()
                .collect(toList());
    }

}
