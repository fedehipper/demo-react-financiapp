package com.financiapp.domain.vo;

import java.time.LocalDate;

public class GastoVo {

    private Long id;
    private boolean primerCuota;
    private LocalDate fecha;
    private String concepto;
    private String valor;
    private boolean necesario;
    private Integer cantidadPagos;

    public boolean isPrimerCuota() {
        return primerCuota;
    }

    public void setPrimerCuota(boolean primerCuota) {
        this.primerCuota = primerCuota;
    }

    public Integer getCantidadPagos() {
        return cantidadPagos;
    }

    public void setCantidadPagos(Integer cantidadPagos) {
        this.cantidadPagos = cantidadPagos;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getValor() {
        return valor;
    }

    public void setValor(String valor) {
        this.valor = valor;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public String getConcepto() {
        return concepto;
    }

    public void setConcepto(String concepto) {
        this.concepto = concepto;
    }

    public boolean isNecesario() {
        return necesario;
    }

    public void setNecesario(boolean necesario) {
        this.necesario = necesario;
    }

}
