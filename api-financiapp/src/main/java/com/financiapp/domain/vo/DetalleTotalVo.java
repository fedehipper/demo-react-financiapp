package com.financiapp.domain.vo;

import com.financiapp.domain.TipoMoneda;

public class DetalleTotalVo {

    private TipoMoneda tipoMoneda;
    private String montoInicial;
    private String montoActual;
    private String gananciaParcial;
    private String gananciaTotal;
    private MetaInversionVo metaInversion;

    public MetaInversionVo getMetaInversion() {
        return metaInversion;
    }

    public void setMetaInversion(MetaInversionVo metaInversionVo) {
        this.metaInversion = metaInversionVo;
    }

    public TipoMoneda getTipoMoneda() {
        return tipoMoneda;
    }

    public void setTipoMoneda(TipoMoneda tipoMoneda) {
        this.tipoMoneda = tipoMoneda;
    }

    public String getMontoInicial() {
        return montoInicial;
    }

    public void setMontoInicial(String montoInicial) {
        this.montoInicial = montoInicial;
    }

    public String getMontoActual() {
        return montoActual;
    }

    public void setMontoActual(String montoActual) {
        this.montoActual = montoActual;
    }

    public String getGananciaParcial() {
        return gananciaParcial;
    }

    public void setGananciaParcial(String gananciaParcial) {
        this.gananciaParcial = gananciaParcial;
    }

    public String getGananciaTotal() {
        return gananciaTotal;
    }

    public void setGananciaTotal(String gananciaTotal) {
        this.gananciaTotal = gananciaTotal;
    }

}
