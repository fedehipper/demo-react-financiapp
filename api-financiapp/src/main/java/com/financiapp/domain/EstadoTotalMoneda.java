package com.financiapp.domain;

import java.util.List;

public class EstadoTotalMoneda {

    private TipoMoneda tipoMoneda;
    private List<EstadoTotalDiario> estadosTotalesDiarios;

    public TipoMoneda getTipoMoneda() {
        return tipoMoneda;
    }

    public void setTipoMoneda(TipoMoneda tipoMoneda) {
        this.tipoMoneda = tipoMoneda;
    }

    public List<EstadoTotalDiario> getEstadosTotalesDiarios() {
        return estadosTotalesDiarios;
    }

    public void setEstadosTotalesDiarios(List<EstadoTotalDiario> estadosTotalesDiarios) {
        this.estadosTotalesDiarios = estadosTotalesDiarios;
    }

}
