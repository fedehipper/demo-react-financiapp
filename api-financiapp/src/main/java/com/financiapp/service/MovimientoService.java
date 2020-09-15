package com.financiapp.service;

import com.financiapp.domain.Activo;
import com.financiapp.domain.Movimiento;
import com.financiapp.domain.TipoMovimiento;
import static com.financiapp.domain.TipoMovimiento.ACTUALIZACION;
import static com.financiapp.domain.TipoMovimiento.INVERSION;
import static com.financiapp.domain.TipoMovimiento.RESCATE;
import com.financiapp.domain.Usuario;
import com.financiapp.domain.vo.MovimientoEntranteVo;
import com.financiapp.domain.vo.MovimientoSalienteVo;
import java.time.LocalDate;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.stereotype.Service;
import com.financiapp.repository.ActivoRepository;
import java.math.BigDecimal;
import static java.util.stream.Collectors.toList;
import com.financiapp.repository.MovimientoRepository;
import java.util.HashMap;
import java.util.Map;

@Service
@Transactional
public class MovimientoService {

    private final MovimientoRepository movimientoRepository;
    private final ActivoRepository activoRepository;
    private final ActivoService activoService;
    private final UsuarioService usuarioService;

    public MovimientoService(MovimientoRepository movimientoRepository,
            ActivoRepository activoRepository, ActivoService activoService,
            UsuarioService usuarioService) {
        this.movimientoRepository = movimientoRepository;
        this.activoRepository = activoRepository;
        this.activoService = activoService;
        this.usuarioService = usuarioService;
    }

    public List<MovimientoSalienteVo> buscarPorActivoId(Long activoId) {
        var movimientos = movimientoRepository
                .findTop10ByUsuarioUsernameAndActivoIdOrderByFechaDesc(usuarioService.getUsuarioLogueado(), activoId)
                .stream()
                .map(this::convertirMovimientoAMovimientoSalienteVo)
                .collect(toList());
        movimientos.get(movimientos.size() - 1).setTipo("INVERSIÓN");
        return movimientos;
    }

    public void eliminarMovimientoDeHoyPorActivoId(Long activoId) {
        var usuario = usuarioService.getUsuarioLogueado();

        var movimiento = movimientoRepository
                .findByActivoIdAndFechaAndUsuarioUsername(activoId, LocalDate.now(), usuario)
                .orElseThrow(() -> new IllegalArgumentException("No se puede eliminar un movimiento anterior a la fecha de hoy"));

        if (movimientoRepository.findByActivoIdAndUsuarioUsername(activoId, usuario).size() == 1) {
            throw new IllegalArgumentException("No se puede eliminar el primer movimiento, intente finalizarlo");
        }
        movimientoRepository.deleteById(movimiento.getId());
    }

    public Movimiento realizarMovimientoTipoRescate(Long activoId, BigDecimal montoARescatar) {
        verficarUltimoMovimientoEsHoy(activoId);
        var todosLosMontosDeMovimientosOrdenados = movimientoRepository
                .findByUsuarioUsernameAndActivoIdOrderByFecha(usuarioService.getUsuarioLogueado(), activoId)
                .stream()
                .map(Movimiento::getMonto)
                .collect(toList());
        var montoActual = todosLosMontosDeMovimientosOrdenados.get(todosLosMontosDeMovimientosOrdenados.size() - 1);

        if (montoActual.subtract(montoARescatar).compareTo(BigDecimal.ZERO) == -1) {
            throw new IllegalArgumentException("El monto a rescatar supera el disponible");
        } else {
            var usuario = usuarioService.buscarUsuarioLogueado();
            var activo = activoRepository.findByIdAndUsuarioUsername(activoId, usuario.getUsername());

            var movimientoTipoRescate = crearMovimiento(LocalDate.now(), montoARescatar, activo, RESCATE, usuario);

            actualizarActivo(activo, montoARescatar, RESCATE);

            return movimientoRepository.save(movimientoTipoRescate);
        }
    }

    public Movimiento realizarMovimientoTipoInversion(Long activoId, BigDecimal montoAInvertir) {
        verficarUltimoMovimientoEsHoy(activoId);
        var usuario = usuarioService.buscarUsuarioLogueado();
        var activo = activoRepository.findByIdAndUsuarioUsername(activoId, usuario.getUsername());

        var movimientoTipoInversion = crearMovimiento(LocalDate.now(), montoAInvertir, activo, INVERSION, usuario);

        actualizarActivo(activo, montoAInvertir, INVERSION);

        return movimientoRepository.save(movimientoTipoInversion);
    }

    public void inicializarActivoYMovimiento(MovimientoEntranteVo movimientoVo) {
        var activo = activoService.guardar(movimientoVo.getNombre(), movimientoVo.getMonto(), movimientoVo.getMoneda());
        var usuario = usuarioService.buscarUsuarioLogueado();
        var movimiento = crearMovimiento(LocalDate.now(), movimientoVo.getMonto(), activo, ACTUALIZACION, usuario);

        movimientoRepository.save(movimiento);
    }

    public void eliminarMovimientosPorIdActivo(Long activoId) {
        movimientoRepository
                .findByUsuarioUsernameAndActivoIdOrderByFecha(usuarioService.getUsuarioLogueado(), activoId)
                .forEach(movimientoRepository::delete);
    }

    public void realizarMovimientoTipoActualizacion(MovimientoEntranteVo movimientoVo) {
        if (movimientoVo.getMonto() == null) {
            throw new IllegalArgumentException("No se ingreso monto nuevo");
        }

        verficarUltimoMovimientoEsHoy(movimientoVo.getId());

        var usuario = usuarioService.buscarUsuarioLogueado();
        var activo = activoRepository.findByIdAndUsuarioUsername(movimientoVo.getId(), usuario.getUsername());

        var movimiento = crearMovimiento(LocalDate.now(), movimientoVo.getMonto(), activo, ACTUALIZACION, usuario);

        movimientoRepository.save(movimiento);
    }

    private MovimientoSalienteVo convertirMovimientoAMovimientoSalienteVo(Movimiento movimiento) {
        var movimientoVo = new MovimientoSalienteVo();
        movimientoVo.setFecha(movimiento.getFecha());
        movimientoVo.setMonto(movimiento.getMonto().setScale(2).toString());

        Map<TipoMovimiento, String> tipoMovimientoString = new HashMap<>();
        tipoMovimientoString.put(ACTUALIZACION, "ACTUALIZACIÓN");
        tipoMovimientoString.put(INVERSION, "INVERSIÓN");
        tipoMovimientoString.put(RESCATE, "RESCATE");

        movimientoVo.setTipo(tipoMovimientoString.get(movimiento.getTipo()));
        return movimientoVo;
    }

    private Movimiento crearMovimiento(LocalDate fecha, BigDecimal monto, Activo activo, TipoMovimiento tipo, Usuario usuario) {
        var movimiento = new Movimiento();
        movimiento.setFecha(fecha);
        movimiento.setMonto(monto);
        movimiento.setActivo(activo);
        movimiento.setTipo(tipo);
        movimiento.setUsuario(usuario);
        return movimiento;
    }

    private void verficarUltimoMovimientoEsHoy(Long activoId) {
        var movimientoHoy = movimientoRepository
                .findByActivoIdAndFechaAndUsuarioUsername(activoId, LocalDate.now(), usuarioService.getUsuarioLogueado());
        if (!movimientoHoy.isEmpty()) {
            throw new IllegalArgumentException("Ya realizaste tu movimiento diario");
        }
    }

    private void actualizarActivo(Activo activo, BigDecimal monto, TipoMovimiento tipoMovimiento) {
        if (tipoMovimiento.equals(INVERSION)) {
            activo.setMontoInvertido(activo.getMontoInvertido().add(monto));
        } else {
            activo.setMontoInvertido(activo.getMontoInvertido().subtract(monto));
        }
    }

}
