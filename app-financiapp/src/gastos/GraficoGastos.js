import Chart from 'chart.js'
import React from 'react';

class LineChart extends React.Component {
    constructor(props) {
        super();
        this.chartRef = React.createRef();
    }

    componentDidMount() {
        this.myChart = new Chart(this.chartRef.current, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Gasto disponible hasta la fecha',
                    data: this.props.graficoGastos.gastoAcumuladoSinRepetirPorDia,
                    borderColor: "#007bff",
                    pointBackgroundColor: "#007bff"
                },
                {
                    label: 'Gasto realizado hasta la fecha',
                    data: this.props.graficoGastos.gastoEstimadoAcumuladoPorDiasDelMes,
                    borderColor: "#dc3545",
                    pointBackgroundColor: "#dc3545"
                }],
                labels: this.props.graficoGastos.diasDelMes
            }
        });
    }

    render() {
        return <canvas ref={this.chartRef} />;
    }
}
export default LineChart;

