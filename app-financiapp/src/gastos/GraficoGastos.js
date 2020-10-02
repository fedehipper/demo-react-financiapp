import Chart from 'chart.js'
import React, { useEffect, useState } from 'react';

function GraficoGastos(props) {

    const [chartRef] = useState(React.createRef());

    useEffect(() => {
        graficar();
    });

    const graficar = () => {
        return new Chart(chartRef.current, {
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
        })
    }

    return <canvas ref={chartRef} />;
}

export default GraficoGastos;

