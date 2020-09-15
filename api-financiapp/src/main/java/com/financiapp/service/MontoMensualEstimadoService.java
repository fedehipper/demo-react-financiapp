package com.financiapp.service;

import com.financiapp.domain.MontoMensualEstimado;
import com.financiapp.domain.vo.MontoMensualEstimadoVo;
import com.financiapp.repository.MontoMensualEstimadoRepository;
import java.time.LocalDate;
import javax.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class MontoMensualEstimadoService {

    private final MontoMensualEstimadoRepository montoMensualEstimadoRepository;
    private final UsuarioService usuarioService;

    public MontoMensualEstimadoService(MontoMensualEstimadoRepository montoMensualEstimadoRepository, UsuarioService usuarioService) {
        this.montoMensualEstimadoRepository = montoMensualEstimadoRepository;
        this.usuarioService = usuarioService;
    }

    public String actualizarMontoMensualEstimado(MontoMensualEstimadoVo montoMensualEstimadoVo) {
        var anio = montoMensualEstimadoVo.getAnio();
        var mes = montoMensualEstimadoVo.getMes();

        var fechaHoy = LocalDate.now();

        var fechaPorParametro = LocalDate.of(Integer.valueOf(anio), Integer.valueOf(mes), fechaHoy.getDayOfMonth());

        if (fechaPorParametro.isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("No se puede actualizar un monto estimado a gastar de un mes anterior al actual.");
        }

        var montoEstimado = montoMensualEstimadoVo.getMontoEstimado();

        return montoMensualEstimadoRepository
                .findByUsuarioIdAndAnioAndMes(usuarioService.buscarUsuarioLogueado().getId(), anio, mes)
                .map(montoMensualEstimado -> {
                    montoMensualEstimado.setMontoEstimado(montoEstimado);
                    return montoMensualEstimado.getMontoEstimado();
                })
                .orElseGet(() -> {
                    return montoMensualEstimadoRepository
                            .save(crearMontoMensualEstimado(anio, mes, montoEstimado))
                            .getMontoEstimado();
                });
    }

    public String buscarPorAnioYMes(String anio, String mes) {
        return montoMensualEstimadoRepository
                .findByUsuarioIdAndAnioAndMes(usuarioService.buscarUsuarioLogueado().getId(), anio, mes)
                .map(MontoMensualEstimado::getMontoEstimado)
                .orElseGet(() -> montoMensualEstimadoRepository.save(crearMontoMensualEstimado(anio, mes, "0.00")).getMontoEstimado());
    }

    private MontoMensualEstimado crearMontoMensualEstimado(String anio, String mes, String montoEstimado) {
        var montoMensualEstimado = new MontoMensualEstimado();
        montoMensualEstimado.setAnio(anio);
        montoMensualEstimado.setUsuario(usuarioService.buscarUsuarioLogueado());
        montoMensualEstimado.setMes(mes);
        montoMensualEstimado.setMontoEstimado(montoEstimado);
        return montoMensualEstimado;
    }

}
