package com.financiapp.domain;

import java.math.BigDecimal;

public class Porcentaje {

    private String nombreActivo;
    private BigDecimal porcentajeActivo;

    public String getNombreActivo() {
        return nombreActivo;
    }

    public void setNombreActivo(String nombreActivo) {
        this.nombreActivo = nombreActivo;
    }

    public BigDecimal getPorcentajeActivo() {
        return porcentajeActivo;
    }

    public void setPorcentajeActivo(BigDecimal porcentajeActivo) {
        this.porcentajeActivo = porcentajeActivo;
    }

}
