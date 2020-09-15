package com.financiapp.domain.vo;

import java.math.BigDecimal;
import java.util.List;

public class GraficoBurnUpGastosMensual {

    private List<Integer> diasDelMes;
    private List<BigDecimal> gastoEstimadoAcumuladoPorDiasDelMes;
    private List<BigDecimal> gastoAcumuladoSinRepetirPorDia;

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
