package com.financiapp.domain.vo;

import com.financiapp.domain.DetalleActivo;
import java.util.List;

public class CarteraVo {

    private String nombre;
    private List<DetalleActivo> activosDetallados;

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public List<DetalleActivo> getActivosDetallados() {
        return activosDetallados;
    }

    public void setActivosDetallados(List<DetalleActivo> activosDetallados) {
        this.activosDetallados = activosDetallados;
    }

}
