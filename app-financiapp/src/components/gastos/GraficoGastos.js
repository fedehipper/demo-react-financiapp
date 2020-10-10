import Chart from 'chart.js'
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';

var grafico = null;

function GraficoGastos(props) {

    const [chartRef] = useState(React.createRef());

    useEffect(() => {
        if (grafico !== null) {
            grafico.destroy();
        }
        if (props.graficoGastosDisponible) {
            graficar();
        }
    });

    const mensajeGraficoNoDisponible = () => {
        return <Alert variant='warning'>No se encuentra disponible el gráfico de gastos para este período.</Alert>
    }

    const dataSet = (label, data, borderColor, pointBackgroundColor) => {
        return {
            label: label,
            data: data,
            borderColor: borderColor,
            pointBackgroundColor: pointBackgroundColor
        }
    }

    const graficar = () => {
        grafico = new Chart(chartRef.current, {
            type: 'line',
            data: {
                datasets: [
                    dataSet('Gasto disponible hasta la fecha', props.graficoGastos.gastoAcumuladoSinRepetirPorDia, "#007bff", "#007bff"),
                    dataSet('Gasto realizado hasta la fecha', props.graficoGastos.gastoEstimadoAcumuladoPorDiasDelMes, "#dc3545", "#dc3545")
                ],
                labels: props.graficoGastos.diasDelMes
            }
        });
    }

    return props.graficoGastosDisponible ? <canvas ref={chartRef} /> : mensajeGraficoNoDisponible();
}

export default GraficoGastos;

