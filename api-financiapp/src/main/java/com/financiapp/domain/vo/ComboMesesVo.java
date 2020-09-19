package com.financiapp.domain.vo;

import java.util.Set;

public class ComboMesesVo {

    private int mesActual;
    private Set<Integer> mesesASeleccionar;

    public int getMesActual() {
        return mesActual;
    }

    public void setMesActual(int mesActual) {
        this.mesActual = mesActual;
    }

    public Set<Integer> getMesesASeleccionar() {
        return mesesASeleccionar;
    }

    public void setMesesASeleccionar(Set<Integer> mesesASeleccionar) {
        this.mesesASeleccionar = mesesASeleccionar;
    }

}
