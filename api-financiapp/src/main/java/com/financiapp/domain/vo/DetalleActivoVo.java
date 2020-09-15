package com.financiapp.domain.vo;

import com.financiapp.domain.TipoMoneda;
import java.time.LocalDate;

public class DetalleActivoVo {

    private String nombre;
    private LocalDate fechaInicial;
    private String montoInicial;
    private LocalDate fechaActual;
    private String montoActual;
    private String gananciaParcial;
    private String gananciaTotal;
    private TipoMoneda moneda;
    private Long id;

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public LocalDate getFechaInicial() {
        return fechaInicial;
    }

    public void setFechaInicial(LocalDate fechaInicial) {
        this.fechaInicial = fechaInicial;
    }

    public String getMontoInicial() {
        return montoInicial;
    }

    public void setMontoInicial(String montoInicial) {
        this.montoInicial = montoInicial;
    }

    public LocalDate getFechaActual() {
        return fechaActual;
    }

    public void setFechaActual(LocalDate fechaActual) {
        this.fechaActual = fechaActual;
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

    public TipoMoneda getMoneda() {
        return moneda;
    }

    public void setMoneda(TipoMoneda moneda) {
        this.moneda = moneda;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    
}
