import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import TablaGastos from './TableGastos.js';
import gastosService from './../service/gastosService.js';

class NavGastos extends Component {
    render() {
        return <div className="col">
            <nav className="navbar navbar-expand-lg navbar-light bg-light pl-2 pr-2">
                <ul className="nav navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <a className="nav-link active" data-toggle="tab" href="#detalle-gastos">Detalle mensual</a>
                    </li>
                </ul>
            </nav >
            <div className="tab-content">
                <div className="tab-pane fade show active" id="detalle-gastos">
                    <TablaGastos />
                </div>
            </div>
        </div >
    }
}

class SelectorAnio extends Component {
    render() {
        return <div>
            <label>{this.props.nombreSelect}</label>
            <select className="form-control" onChange={this.props.setearAnioSeleccionado} value={this.props.anioSeleccionado}>
                {this.props.anios.map(unAnio => <option value={unAnio} key={unAnio}>{unAnio}</option>)}
            </select>
        </div>
    }
}

class GastosView extends Component {
    constructor() {
        super();
        this.state = {
            anioSeleccionado: '',
            comboAnio: {
                anioActual: '',
                aniosASeleccionar: []
            },
            comboMes: {
                mesActual: '',
                mesesASeleccionar: []
            }
        }
    }

    buscarAnios() {
        gastosService.buscarAnios()
            .then(response => response.json())
            .then(comboAnio => {
                this.setState({ comboAnio })
                this.setState({ anioSeleccionado: comboAnio.anioActual })
            })
            .then(() => this.buscarMesesPorAnioSeleccionado());
    }

    buscarMesesPorAnioSeleccionado() {
        gastosService.buscarMesesDisponiblesPorAnio(this.state.anioSeleccionado)
            .then(response => response.json())
            .then(comboMes => this.setState({ comboMes }));
    }

    componentDidMount() {
        this.buscarAnios();
    }

    // se puede hacer este tipo de funcion o poner this.setearAnioSeleccionado = this.setearAnioSeleccionado.bind(this);
    // para mantener el contexto, luego de recibir un evento de un hijo para setear el resultado a un estado del padre.
    setearAnioSeleccionado = (eventoCambioAnio) => {
        const anioSeleccionado = parseInt(eventoCambioAnio.target.value);
        this.setState({ anioSeleccionado: anioSeleccionado });
    }

    render() {
        return <div>
            <div className="col-2 mb-3">
                <SelectorAnio
                    nombreSelect='Anio'
                    anioSeleccionado={this.state.anioSeleccionado}
                    anios={this.state.comboAnio.aniosASeleccionar}
                    setearAnioSeleccionado={this.setearAnioSeleccionado} />
            </div>
            <NavGastos />
        </div>
    }
}

export default GastosView;