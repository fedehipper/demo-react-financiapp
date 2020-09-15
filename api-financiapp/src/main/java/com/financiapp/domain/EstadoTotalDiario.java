package com.financiapp.domain;

import java.math.BigDecimal;
import java.time.LocalDate;

public class EstadoTotalDiario {

    private BigDecimal montoTotal;
    private LocalDate fechaConMontoAcumulado;

    public BigDecimal getMontoTotal() {
        return montoTotal;
    }

    public void setMontoTotal(BigDecimal montoTotal) {
        this.montoTotal = montoTotal;
    }

    public LocalDate getFechaConMontoAcumulado() {
        return fechaConMontoAcumulado;
    }

    public void setFechaConMontoAcumulado(LocalDate fechaConMontoAcumulado) {
        this.fechaConMontoAcumulado = fechaConMontoAcumulado;
    }

}
