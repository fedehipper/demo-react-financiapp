package com.financiapp.service;

import com.financiapp.domain.Activo;
import com.financiapp.domain.TipoMoneda;
import com.financiapp.repository.ActivoRepository;
import java.math.BigDecimal;
import java.util.List;
import java.util.NoSuchElementException;
import javax.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ActivoService {

    private final ActivoRepository activoRepository;
    private final UsuarioService usuarioService;
    private final MetaInversionService metaInversionService;

    public ActivoService(ActivoRepository activoRepository, UsuarioService usuarioService, MetaInversionService metaInversionService) {
        this.activoRepository = activoRepository;
        this.usuarioService = usuarioService;
        this.metaInversionService = metaInversionService;
    }

    public Activo guardar(String nombre, BigDecimal montoInicial, String tipoMoneda) {
        reemplazarMetaSiNoExistenActivosParaSuMonedaYExisteMetaPrevia(TipoMoneda.valueOf(tipoMoneda));
        Activo activoGuardado = activoRepository
                .save(crearActivo(nombre, montoInicial, tipoMoneda));

        return activoGuardado;
    }

    public void eliminar(Long activoId) {
        var activoAEliminar = activoRepository
                .findById(activoId)
                .filter(activo -> usuarioService.getUsuarioLogueado().equals(activo.getUsuario().getUsername()))
                .orElseThrow(() -> new NoSuchElementException("Activo no encontrado."));
        activoRepository
                .delete(activoAEliminar);
    }

    public List<Activo> buscarTodos() {
        return activoRepository
                .findByUsuarioUsername(usuarioService.getUsuarioLogueado());
    }

    private void reemplazarMetaSiNoExistenActivosParaSuMonedaYExisteMetaPrevia(TipoMoneda tipoMoneda) {
        var activosPorTipoMoneda = activoRepository
                .findByUsuarioUsernameAndTipoMoneda(usuarioService.getUsuarioLogueado(), tipoMoneda);
        if (activosPorTipoMoneda.isEmpty()) {
            metaInversionService.eliminar(tipoMoneda);
            metaInversionService.crear(tipoMoneda);
        }
    }

    private Activo crearActivo(String nombre, BigDecimal montoInicial, String tipoMoneda) {
        var usuario = usuarioService
                .buscarUsuarioLogueado();
        var activo = new Activo();
        activo.setTipoMoneda(TipoMoneda.valueOf(tipoMoneda));
        activo.setNombre(nombre);
        activo.setMontoInvertido(montoInicial);
        activo.setUsuario(usuario);
        return activo;
    }

}
