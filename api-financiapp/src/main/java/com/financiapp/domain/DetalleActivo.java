package com.financiapp.domain;

import java.math.BigDecimal;
import java.time.LocalDate;

public class DetalleActivo {

    private String nombre;
    private TipoMoneda moneda;
    private LocalDate fechaInicial;
    private BigDecimal montoInicial;
    private LocalDate fechaActual;
    private BigDecimal montoActual;
    private BigDecimal gananciaParcial;
    private BigDecimal gananciaTotal;
    private Long id;

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public TipoMoneda getMoneda() {
        return moneda;
    }

    public void setMoneda(TipoMoneda moneda) {
        this.moneda = moneda;
    }

    public LocalDate getFechaInicial() {
        return fechaInicial;
    }

    public void setFechaInicial(LocalDate fechaInicial) {
        this.fechaInicial = fechaInicial;
    }

    public BigDecimal getMontoInicial() {
        return montoInicial;
    }

    public void setMontoInicial(BigDecimal montoInicial) {
        this.montoInicial = montoInicial;
    }

    public LocalDate getFechaActual() {
        return fechaActual;
    }

    public void setFechaActual(LocalDate fechaActual) {
        this.fechaActual = fechaActual;
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}
