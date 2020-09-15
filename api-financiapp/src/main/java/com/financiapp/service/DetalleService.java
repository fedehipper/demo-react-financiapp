package com.financiapp.service;

import com.financiapp.domain.DetalleActivo;
import com.financiapp.domain.DetalleTotal;
import com.financiapp.domain.MetaInversion;
import com.financiapp.domain.vo.DetalleActivoVo;
import com.financiapp.domain.vo.DetalleTotalVo;
import com.financiapp.domain.vo.MetaInversionVo;
import java.time.LocalDate;
import java.util.List;
import static java.util.stream.Collectors.toList;
import org.springframework.stereotype.Service;

@Service
public class DetalleService {

    private final MetaInversionService metaInversionService;

    public DetalleService(MetaInversionService metaInversionService) {
        this.metaInversionService = metaInversionService;
    }

    public List<DetalleTotalVo> formatearDetalleTotal(List<DetalleTotal> detallesTotales) {
        return detallesTotales
                .stream()
                .map(this::transformarDetalleTotalADetalleTotalVo)
                .collect(toList());
    }

    public DetalleActivoVo formatearDetalleActivo(DetalleActivo detalleActivo) {
        var detalleActivoVo = new DetalleActivoVo();
        detalleActivoVo.setGananciaParcial(detalleActivo.getGananciaParcial().setScale(2).toString());
        detalleActivoVo.setGananciaTotal(detalleActivo.getGananciaTotal().setScale(2).toString());
        detalleActivoVo.setMontoActual(detalleActivo.getMontoActual().setScale(2).toString());
        detalleActivoVo.setMontoInicial(detalleActivo.getMontoInicial().setScale(2).toString());
        detalleActivoVo.setNombre(detalleActivo.getNombre());
        detalleActivoVo.setMoneda(detalleActivo.getMoneda());
        detalleActivoVo.setId(detalleActivo.getId());
        detalleActivoVo.setFechaActual(detalleActivo.getFechaActual());
        detalleActivoVo.setFechaInicial(detalleActivo.getFechaInicial());
        return detalleActivoVo;
    }

    private DetalleTotalVo transformarDetalleTotalADetalleTotalVo(DetalleTotal detalleTotal) {
        var metaPorTipoMoneda = metaInversionService.buscarPorTipoMoneda(detalleTotal.getTipoMoneda());

        var detalleTotalVo = new DetalleTotalVo();
        detalleTotalVo.setMetaInversion(transforMarMetaAMetaInversionVo(metaPorTipoMoneda));
        detalleTotalVo.setTipoMoneda(detalleTotal.getTipoMoneda());
        detalleTotalVo.setGananciaParcial(detalleTotal.getGananciaParcial().setScale(2).toString());
        detalleTotalVo.setGananciaTotal(detalleTotal.getGananciaTotal().setScale(2).toString());
        detalleTotalVo.setMontoActual(detalleTotal.getMontoActual().setScale(2).toString());
        detalleTotalVo.setMontoInicial(detalleTotal.getMontoInicial().setScale(2).toString());
        return detalleTotalVo;
    }

    private MetaInversionVo transforMarMetaAMetaInversionVo(MetaInversion metaInversion) {
        var metaInversionVo = new MetaInversionVo();
        metaInversionVo.setFechaLimite(metaInversion.getFechaLimite());
        metaInversionVo.setMontoASuperar(metaInversion.getMontoASuperar());
        metaInversionVo.setTipoMoneda(metaInversion.getTipoMoneda().toString());
        if (metaInversion.getFechaLimite() == null) {
            metaInversionVo.setFechaVencida(false);
        } else if (metaInversion.getFechaLimite().compareTo(LocalDate.now()) < 0) {
            metaInversionVo.setFechaVencida(true);
        }
        return metaInversionVo;
    }

}
