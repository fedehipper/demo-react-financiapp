package com.financiapp.domain.vo;

import java.util.Set;

public class ComboAniosVo {

    private int anioActual;
    private Set<Integer> aniosASeleccionar;

    public int getAnioActual() {
        return anioActual;
    }

    public void setAnioActual(int anioActual) {
        this.anioActual = anioActual;
    }

    public Set<Integer> getAniosASeleccionar() {
        return aniosASeleccionar;
    }

    public void setAniosASeleccionar(Set<Integer> aniosASeleccionar) {
        this.aniosASeleccionar = aniosASeleccionar;
    }

}
