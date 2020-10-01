import Chart from 'chart.js'
import React from 'react';

class LineChart extends React.Component {
    constructor() {
        super();
        this.chartRef = React.createRef();
    }

    componentDidMount() {
        this.myChart = new Chart(this.chartRef.current, {
            type: 'line',
            options: {
                scales: {
                    xAxes: [
                        {
                            type: 'time',
                            time: {
                                unit: 'week'
                            }
                        }
                    ],
                    yAxes: [
                        {
                            ticks: {
                                min: 0
                            }
                        }
                    ]
                }
            },
            data: {
                labels: [1, 2, 3, 4],
                datasets: [{
                    label: 'culo',
                    data: [1, 2, 3, 4],
                    fill: 'none',
                    pointRadius: 2,
                    borderWidth: 1,
                    lineTension: 0
                }]
            }
        });
    }

    render() {
        return <canvas ref={this.chartRef} />;
    }
}
export default LineChart;

