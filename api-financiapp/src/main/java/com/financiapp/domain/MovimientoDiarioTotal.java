package com.financiapp.domain;

import java.time.LocalDate;
import java.util.List;

public class MovimientoDiarioTotal {

    private List<EstadoTotalMoneda> estadosTotalesDiarios;
    private List<LocalDate> fechasUnion;

    public List<EstadoTotalMoneda> getEstadosTotalesDiarios() {
        return estadosTotalesDiarios;
    }

    public void setEstadosTotalesDiarios(List<EstadoTotalMoneda> estadosTotalesDiarios) {
        this.estadosTotalesDiarios = estadosTotalesDiarios;
    }

    public List<LocalDate> getFechasUnion() {
        return fechasUnion;
    }

    public void setFechasUnion(List<LocalDate> fechasUnion) {
        this.fechasUnion = fechasUnion;
    }

}
