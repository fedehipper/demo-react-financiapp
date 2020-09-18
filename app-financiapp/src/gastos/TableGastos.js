import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class Gastos extends Component {
    constructor() {
        super();
        this.state = {
            gastos: []
        };
    }

    componentDidMount() {
        this.buscarTodosLosGastos();
    }

    buscarTodosLosGastos() {
        const apiUrl = 'http://localhost:8097/api/gasto?anio=2020&mes=10';
        fetch(apiUrl)
            .then(response => response.json())
            .then(gastos => this.setState({ gastos }));
    }

    cambiarNecesidad(gastoId) {
        const apiUr = 'http://localhost:8097/api/gasto/necesidad/' + gastoId;
        const requestOptions = {
            method: 'PUT'
        };
        fetch(apiUr, requestOptions)
            .then(() => this.buscarTodosLosGastos());
    }

    render() {
        return <tbody>{
            this.state.gastos.map(unGasto => {
                return <tr key={unGasto.id}>
                    <td>{unGasto.concepto}</td>
                    <td className='text-center'>{unGasto.fecha}</td>
                    <td className='text-right'>{unGasto.valor}</td>
                    <td className='text-center'>
                        <div className='form-check'>
                            <input
                                type='checkbox'
                                className='form-check-input'
                                checked={unGasto.necesario}
                                onChange={() => this.cambiarNecesidad(unGasto.id)}
                            />
                        </div>
                    </td>
                </tr>
            })}
        </tbody>
    }
}

class TablaGastos extends Component {
    render() {
        return (
            <table className="table table-sm table-striped table-hover table-bordered">
                <thead className="thead-light text-center">
                    <tr>
                        <th>Concepto</th>
                        <th>Fecha</th>
                        <th>Valor($)</th>
                        <th>Necesario</th>
                    </tr>
                </thead>
                <Gastos />
            </table>
        )
    }
}


export default TablaGastos;

