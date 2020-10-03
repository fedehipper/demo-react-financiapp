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
        return <Alert variant='warning'>
            No se encuentra disponible el gráfico de gastos para este período.
        </Alert>
    }

    const graficar = () => {
        grafico = new Chart(chartRef.current, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Gasto disponible hasta la fecha',
                    data: props.graficoGastos.gastoAcumuladoSinRepetirPorDia,
                    borderColor: "#007bff",
                    pointBackgroundColor: "#007bff"
                },
                {
                    label: 'Gasto realizado hasta la fecha',
                    data: props.graficoGastos.gastoEstimadoAcumuladoPorDiasDelMes,
                    borderColor: "#dc3545",
                    pointBackgroundColor: "#dc3545"
                }],
                labels: props.graficoGastos.diasDelMes
            }
        });
    }

    return props.graficoGastosDisponible ? <canvas ref={chartRef} /> : mensajeGraficoNoDisponible();
}

export default GraficoGastos;

