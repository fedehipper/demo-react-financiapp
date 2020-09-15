package com.financiapp.service;

import com.financiapp.domain.MetaInversion;
import com.financiapp.domain.TipoMoneda;
import com.financiapp.domain.vo.MetaInversionVo;
import com.financiapp.repository.MetaInversionRepository;
import javax.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class MetaInversionService {

    private final MetaInversionRepository metaInversionRepository;
    private final UsuarioService usuarioService;

    public MetaInversionService(MetaInversionRepository metaInversionRepository, UsuarioService usuarioService) {
        this.metaInversionRepository = metaInversionRepository;
        this.usuarioService = usuarioService;
    }

    public MetaInversion buscarPorTipoMoneda(TipoMoneda tipoMoneda) {
        return metaInversionRepository
                .findByUsuarioIdAndTipoMoneda(usuarioService.buscarUsuarioLogueado().getId(), tipoMoneda);
    }

    public void modificar(MetaInversionVo metaInversionVo) {
        MetaInversion metaInversionAEditar = metaInversionRepository
                .findByUsuarioIdAndTipoMoneda(usuarioService.buscarUsuarioLogueado().getId(), TipoMoneda.valueOf(metaInversionVo.getTipoMoneda()));

        metaInversionAEditar.setFechaLimite(metaInversionVo.getFechaLimite());
        metaInversionAEditar.setMontoASuperar(metaInversionVo.getMontoASuperar());
    }

    public void crear(TipoMoneda tipoMoneda) {
        var metaInversion = crearMetaInversion(tipoMoneda);
        metaInversionRepository.save(metaInversion);
    }

    public void eliminar(TipoMoneda tipoMoneda) {
        metaInversionRepository.deleteByUsuarioIdAndTipoMoneda(usuarioService.buscarUsuarioLogueado().getId(), tipoMoneda);
    }

    private MetaInversion crearMetaInversion(TipoMoneda tipoMoneda) {
        var metaInversion = new MetaInversion();
        metaInversion.setUsuario(usuarioService.buscarUsuarioLogueado());
        metaInversion.setTipoMoneda(tipoMoneda);
        metaInversion.setFechaLimite(null);
        metaInversion.setMontoASuperar(null);
        return metaInversion;
    }

}
