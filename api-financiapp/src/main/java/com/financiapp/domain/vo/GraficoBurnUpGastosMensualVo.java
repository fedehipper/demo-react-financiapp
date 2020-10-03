package com.financiapp.domain.vo;

import java.math.BigDecimal;
import java.util.List;

public class GraficoBurnUpGastosMensualVo {

    private List<Integer> diasDelMes;
    private List<BigDecimal> gastoEstimadoAcumuladoPorDiasDelMes;
    private List<BigDecimal> gastoAcumuladoSinRepetirPorDia;
    private boolean disponible;

    public boolean isDisponible() {
        return disponible;
    }

    public void setDisponible(boolean disponible) {
        this.disponible = disponible;
    }

    public List<Integer> getDiasDelMes() {
        return diasDelMes;
    }

    public void setDiasDelMes(List<Integer> diasDelMes) {
        this.diasDelMes = diasDelMes;
    }

    public List<BigDecimal> getGastoEstimadoAcumuladoPorDiasDelMes() {
        return gastoEstimadoAcumuladoPorDiasDelMes;
    }

    public void setGastoEstimadoAcumuladoPorDiasDelMes(List<BigDecimal> gastoEstimadoAcumuladoPorDiasDelMes) {
        this.gastoEstimadoAcumuladoPorDiasDelMes = gastoEstimadoAcumuladoPorDiasDelMes;
    }

    public List<BigDecimal> getGastoAcumuladoSinRepetirPorDia() {
        return gastoAcumuladoSinRepetirPorDia;
    }

    public void setGastoAcumuladoSinRepetirPorDia(List<BigDecimal> gastoAcumuladoSinRepetirPorDia) {
        this.gastoAcumuladoSinRepetirPorDia = gastoAcumuladoSinRepetirPorDia;
    }

}
