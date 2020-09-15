package com.financiapp.domain.vo;

import java.math.BigDecimal;
import java.time.LocalDate;

public class MetaInversionVo {

    private LocalDate fechaLimite;
    private BigDecimal montoASuperar;
    private String tipoMoneda;
    private boolean fechaVencida;

    public boolean isFechaVencida() {
        return fechaVencida;
    }

    public void setFechaVencida(boolean fechaVencida) {
        this.fechaVencida = fechaVencida;
    }

    public String getTipoMoneda() {
        return tipoMoneda;
    }

    public void setTipoMoneda(String tipoMoneda) {
        this.tipoMoneda = tipoMoneda;
    }

    public LocalDate getFechaLimite() {
        return fechaLimite;
    }

    public void setFechaLimite(LocalDate fechaLimite) {
        this.fechaLimite = fechaLimite;
    }

    public BigDecimal getMontoASuperar() {
        return montoASuperar;
    }

    public void setMontoASuperar(BigDecimal montoASuperar) {
        this.montoASuperar = montoASuperar;
    }

}
