package com.financiapp.domain.vo;

import java.time.LocalDate;

public class MovimientoSalienteVo {

    private LocalDate fecha;
    private String monto;
    private String tipo;

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public String getMonto() {
        return monto;
    }

    public void setMonto(String monto) {
        this.monto = monto;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

}
