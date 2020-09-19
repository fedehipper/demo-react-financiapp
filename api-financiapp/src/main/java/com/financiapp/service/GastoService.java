package com.financiapp.service;

import com.financiapp.domain.Gasto;
import com.financiapp.domain.Usuario;
import com.financiapp.domain.vo.ComboAniosVo;
import com.financiapp.domain.vo.ComboMesesVo;
import com.financiapp.domain.vo.GastoVo;
import com.financiapp.domain.vo.GraficoBurnUpGastosMensual;
import com.financiapp.domain.vo.SumatoriaGastoMesVo;
import com.financiapp.repository.GastoRepository;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.function.Predicate;
import static java.util.stream.Collectors.toList;
import static java.util.stream.Collectors.toSet;
import java.util.stream.IntStream;
import org.flywaydb.core.internal.util.StringUtils;
import org.springframework.stereotype.Service;

@Service
public class GastoService {

    private final GastoRepository gastoRepository;
    private final UsuarioService usuarioService;
    private final MontoMensualEstimadoService montoMensualEstimadoService;

    public GastoService(GastoRepository gastoRepository, MontoMensualEstimadoService montoMensualEstimadoService, UsuarioService usuarioService) {
        this.gastoRepository = gastoRepository;
        this.usuarioService = usuarioService;
        this.montoMensualEstimadoService = montoMensualEstimadoService;
    }

    public List<GastoVo> buscarPorAnioYMes(Integer anio, Integer mes) {
        return gastosPorAnioYMes(anio, mes)
                .stream()
                .map(this::transformarGastoAGastoVo)
                .collect(toList());
    }

    public ComboAniosVo buscarAnios() {
        var comboAnioVo = new ComboAniosVo();
        comboAnioVo.setAnioActual(LocalDate.now().getYear());
        var aniosASeleccionar = gastoRepository
                .findByUsuarioId(usuarioService.buscarUsuarioLogueado().getId())
                .stream()
                .map(gasto -> gasto.getFecha().getYear())
                .collect(toSet());
        comboAnioVo.setAniosASeleccionar(aniosASeleccionar);
        return comboAnioVo;
    }

    public ComboMesesVo buscarMesesPorAnio(Integer anio) {
        var comboMesesVo = new ComboMesesVo();
        comboMesesVo.setMesActual(LocalDate.now().getMonthValue());
        var mesesASeleccionar = gastoRepository
                .findByUsuarioId(usuarioService.buscarUsuarioLogueado().getId())
                .stream()
                .filter(gasto -> anio.equals(gasto.getFecha().getYear()))
                .map(gasto -> gasto.getFecha().getMonthValue())
                .collect(toSet());
        comboMesesVo.setMesesASeleccionar(mesesASeleccionar);
        return comboMesesVo;
                
    }

    public void crearNuevo(GastoVo gastoVo) {
        generarGastosPorPagos(gastoVo, usuarioService.buscarUsuarioLogueado())
                .forEach(gastoPorPago -> gastoRepository.save(gastoPorPago));
    }

    public GraficoBurnUpGastosMensual obtenerBurnUpPorAnioYMes(String anio, String mes) {
        LocalDate fechaPorParametro = determinarFechaPorParametro(Integer.valueOf(anio), Integer.valueOf(mes));
        var graficoBurnUpGastosMensual = new GraficoBurnUpGastosMensual();
        graficoBurnUpGastosMensual.setDiasDelMes(diasDelMesYAnioSeleccionado(fechaPorParametro));
        graficoBurnUpGastosMensual.setGastoAcumuladoSinRepetirPorDia(gastoAcumuladoSinRepetirPorDia(fechaPorParametro));
        graficoBurnUpGastosMensual.setGastoEstimadoAcumuladoPorDiasDelMes(gastosTodoElMesAcumulados(fechaPorParametro));
        return graficoBurnUpGastosMensual;
    }

    public SumatoriaGastoMesVo sumatoriaGastoMes(int anio, int mes) {
        var sumatoriaGastoMes = new SumatoriaGastoMesVo();
        var gastosPorAnioYMes = gastosPorAnioYMes(anio, mes);
        sumatoriaGastoMes.setGastoTotal(calcularGastoMensualTotal(gastosPorAnioYMes));
        sumatoriaGastoMes.setGastoNecesario(calcularGasto(gastoNecesario(), gastosPorAnioYMes));
        sumatoriaGastoMes.setGastoInnecesario(calcularGasto(gastoInNecesario(), gastosPorAnioYMes));
        return sumatoriaGastoMes;
    }

    private GastoVo transformarGastoAGastoVo(Gasto gasto) {
        var gastoVo = new GastoVo();
        gastoVo.setConcepto(gasto.getConcepto());
        gastoVo.setFecha(gasto.getFecha());
        gastoVo.setId(gasto.getId());
        gastoVo.setNecesario(gasto.isNecesario());
        gastoVo.setValor(gasto.getValor().setScale(2).toString());
        return gastoVo;
    }

    private List<Gasto> generarGastosPorPagos(GastoVo gastoVo, Usuario usuario) {
        return gastoVo.getCantidadPagos() > 1 ? generarGastoMasDeUnPago(gastoVo, usuario) : generarGastoUnicoPago(gastoVo, usuario);
    }

    private List<Gasto> generarGastoMasDeUnPago(GastoVo gastoVo, Usuario usuario) {
        List<Gasto> gastosMasDeUnPago = new ArrayList<>();
        Gasto primerGastoSiEsEnCuotas = null;
        for (int i = 0; i < gastoVo.getCantidadPagos(); i++) {
            var gasto = new Gasto();
            gasto.setConcepto(gastoVo.getConcepto() + " " + (i + 1) + "/" + gastoVo.getCantidadPagos());
            gasto.setUsuario(usuario);
            gasto.setNecesario(gastoVo.isNecesario());
            gasto.setValor(new BigDecimal(gastoVo.getValor()));
            if (i == 0) {
                gasto.setFecha(gastoVo.getFecha());
                primerGastoSiEsEnCuotas = gasto;
            } else {
                gasto.setGasto(primerGastoSiEsEnCuotas);
                gasto.setFecha(calcularFechaPagoConceptoSiguienteMes(gastoVo.getFecha(), i));
            }
            gastosMasDeUnPago.add(gasto);
        }
        return gastosMasDeUnPago;
    }

    private LocalDate calcularFechaPagoConceptoSiguienteMes(LocalDate fechaPago, int numeroPago) {
        int anio = fechaPago.getYear();
        if (mesPagoActualSuperaElAnioActual(fechaPago, numeroPago)) {
            anio++;
        }
        return LocalDate.of(anio, fechaPago.plusMonths(numeroPago).getMonth(), 1);
    }

    private boolean mesPagoActualSuperaElAnioActual(LocalDate fechaPago, int numeroPago) {
        return fechaPago.getMonth().getValue() + numeroPago > 12;
    }

    private List<Gasto> generarGastoUnicoPago(GastoVo gastoVo, Usuario usuario) {
        if (esMesSiguienteAlActual(gastoVo.getFecha()) && diaSuperaAlPrimeroDelMes(gastoVo.getFecha())) {
            throw new IllegalArgumentException("Si el mes supera al corriente, debe seleccionar el dia uno");
        }

        var gasto = new Gasto();
        gasto.setConcepto(gastoVo.getConcepto());
        gasto.setFecha(gastoVo.getFecha());
        gasto.setUsuario(usuario);
        gasto.setNecesario(gastoVo.isNecesario());
        gasto.setValor(new BigDecimal(gastoVo.getValor()));
        return List.of(gasto);
    }

    private boolean esMesSiguienteAlActual(LocalDate fechaPago) {
        return fechaPago.getMonthValue() > LocalDate.now().getMonthValue();
    }

    private boolean diaSuperaAlPrimeroDelMes(LocalDate fechaPago) {
        return fechaPago.getDayOfMonth() > 1;
    }

    private Predicate<Gasto> gastoNecesario() {
        return gasto -> gasto.isNecesario();
    }

    private Predicate<Gasto> gastoInNecesario() {
        return gasto -> !gasto.isNecesario();
    }

    private String calcularGasto(Predicate<Gasto> gastoPredicate, List<Gasto> gastos) {
        return gastos
                .stream()
                .filter(gastoPredicate)
                .map(Gasto::getValor)
                .reduce(BigDecimal.ZERO, (unValor, otroValor) -> unValor.add(otroValor))
                .toString();
    }

    private String calcularGastoMensualTotal(List<Gasto> gastos) {
        return gastos
                .stream()
                .map(Gasto::getValor)
                .reduce(BigDecimal.ZERO, (unValor, otroValor) -> unValor.add(otroValor))
                .toString();
    }

    private List<Gasto> gastosPorAnioYMes(Integer anio, Integer mes) {
        LocalDate fechaInicio = LocalDate.of(anio, mes, 1);
        LocalDate fechaFin = fechaInicio.plusMonths(1).minusDays(1);
        return gastoRepository
                .findByUsuarioIdAndFechaBetweenOrderByFechaDesc(usuarioService.buscarUsuarioLogueado().getId(), fechaInicio, fechaFin);
    }

    private LocalDate determinarFechaPorParametro(int anio, int mes) {
        var hoy = LocalDate.now();
        return fechaPorParametroEsHoy(anio, mes, hoy) ? LocalDate.of(anio, mes, hoy.getDayOfMonth()) : LocalDate.of(anio, mes, 1);
    }

    private boolean fechaPorParametroEsHoy(int anio, int mes, LocalDate hoy) {
        String anioMesPorParametro = anio + rellenarConCeroALaIzquierda(mes);
        String anioMesHoy = hoy.getYear() + rellenarConCeroALaIzquierda(hoy.getMonthValue());
        return anioMesPorParametro.equals(anioMesHoy);
    }

    private String rellenarConCeroALaIzquierda(int mes) {
        return StringUtils.trimOrLeftPad(String.valueOf(mes), 2, '0');
    }

    private List<BigDecimal> gastosTodoElMesAcumulados(LocalDate fechaPorParametro) {
        var gastosPorAnioYMes = gastosPorAnioYMes(fechaPorParametro.getYear(), fechaPorParametro.getMonthValue());
        var cantidadDiasDelMesParaGastos = fechaPorParametro.getDayOfMonth();

        if (!fechaPorParametro.isEqual(LocalDate.now())) {
            cantidadDiasDelMesParaGastos = fechaPorParametro.lengthOfMonth();
        }

        var gastosTodoElMesAcumulado = new ArrayList<BigDecimal>();
        for (int i = 0; i < cantidadDiasDelMesParaGastos; i++) {
            gastosTodoElMesAcumulado.add(BigDecimal.ZERO);
        }

        gastosPorAnioYMes
                .forEach(gasto -> {
                    var posicion = gasto.getFecha().getDayOfMonth() - 1;
                    gastosTodoElMesAcumulado.set(posicion, gastosTodoElMesAcumulado.get(posicion).add(gasto.getValor()));
                });

        for (int i = 1; i < cantidadDiasDelMesParaGastos; i++) {
            gastosTodoElMesAcumulado.set(i, gastosTodoElMesAcumulado.get(i).add(gastosTodoElMesAcumulado.get(i - 1)));
        }

        return gastosTodoElMesAcumulado;
    }

    private List<Integer> diasDelMesYAnioSeleccionado(LocalDate fechaPorParametro) {
        return IntStream
                .range(1, fechaPorParametro.lengthOfMonth() + 1)
                .boxed()
                .collect(toList());
    }

    private List<BigDecimal> gastoAcumuladoSinRepetirPorDia(LocalDate fechaPorParametro) {
        var montoMensualEstimadoPorAnioYMes = montoMensualEstimadoService
                .buscarPorAnioYMes(String.valueOf(fechaPorParametro.getYear()), String.valueOf(fechaPorParametro.getMonthValue()));
        var totalPorDia = new BigDecimal(montoMensualEstimadoPorAnioYMes).divide(new BigDecimal(fechaPorParametro.lengthOfMonth()), RoundingMode.FLOOR);

        List<BigDecimal> gastoAcumuladoSinRepetirPorDia = new ArrayList<>();
        var gatoAcumulado = BigDecimal.ZERO;
        for (int i = 0; i < fechaPorParametro.lengthOfMonth(); i++) {
            gatoAcumulado = gatoAcumulado.add(totalPorDia);
            gastoAcumuladoSinRepetirPorDia.add(gatoAcumulado);
        }
        return gastoAcumuladoSinRepetirPorDia;
    }

}
