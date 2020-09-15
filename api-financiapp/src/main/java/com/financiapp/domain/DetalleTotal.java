package com.financiapp.domain;

import java.math.BigDecimal;

public class DetalleTotal {

    private TipoMoneda tipoMoneda;
    private BigDecimal montoInicial;
    private BigDecimal montoActual;
    private BigDecimal gananciaParcial;
    private BigDecimal gananciaTotal;

    public TipoMoneda getTipoMoneda() {
        return tipoMoneda;
    }

    public void setTipoMoneda(TipoMoneda tipoMoneda) {
        this.tipoMoneda = tipoMoneda;
    }

    public BigDecimal getMontoInicial() {
        return montoInicial;
    }

    public void setMontoInicial(BigDecimal montoInicial) {
        this.montoInicial = montoInicial;
    }

    public BigDecimal getMontoActual() {
        return montoActual;
    }

    public void setMontoActual(BigDecimal montoActual) {
        this.montoActual = montoActual;
    }

    public BigDecimal getGananciaParcial() {
        return gananciaParcial;
    }

    public void setGananciaParcial(BigDecimal gananciaParcial) {
        this.gananciaParcial = gananciaParcial;
    }

    public BigDecimal getGananciaTotal() {
        return gananciaTotal;
    }

    public void setGananciaTotal(BigDecimal gananciaTotal) {
        this.gananciaTotal = gananciaTotal;
    }

}
