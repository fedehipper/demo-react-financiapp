import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './../css/financiapp.css';
import TablaGastos from './TablaGastos.js';
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

class Select extends Component {
    render() {
        return <div>
            <label>{this.props.nombreSelect}</label>
            <select className="form-control" onChange={this.props.setearValorSeleccionado} value={this.props.valorSeleccionado}>
                {this.props.valores.map(unValor => <option value={unValor} key={unValor}>{unValor}</option>)}
            </select>
        </div>
    }
}

class GastosView extends Component {
    constructor() {
        super();
        this.state = {
            anioSeleccionado: '',
            mesSeleccionado: '',
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
                this.setState({ comboAnio });
                this.setState({ anioSeleccionado: comboAnio.anioActual });
                return comboAnio.anioActual;
            })
            .then(anioActual => this.buscarMesesPorAnioSeleccionado(anioActual));
    }

    buscarMesesPorAnioSeleccionado(anioSeleccionado) {
        gastosService.buscarMesesDisponiblesPorAnio(anioSeleccionado)
            .then(response => response.json())
            .then(comboMes => {
                this.setState({ comboMes });
                this.setState({ mesSeleccionado: comboMes.mesActual });
            });
    }

    componentDidMount() {
        this.buscarAnios();
    }

    // se puede hacer este tipo de funcion o poner this.setearAnioSeleccionado = this.setearAnioSeleccionado.bind(this);
    // para mantener el contexto, luego de recibir un evento de un hijo para setear el resultado a un estado del padre.
    setearAnioSeleccionado = (eventoCambioAnio) => {
        const anioSeleccionado = parseInt(eventoCambioAnio.target.value);
        this.setState({ anioSeleccionado: anioSeleccionado });
        this.buscarMesesPorAnioSeleccionado(anioSeleccionado);
    }

    setearMesSeleccionado = (eventoCambioMes) => {
        const mesSeleccionado = parseInt(eventoCambioMes.target.value);
        this.setState({ mesSeleccionado: mesSeleccionado });
    }

    render() {
        return <div>
            <div className="col-2 mb-3 mt-3">
                <h2 className='grosor-titulos'>Mis Gastos</h2>
                <Select
                    nombreSelect='Año'
                    valorSeleccionado={this.state.anioSeleccionado}
                    valores={this.state.comboAnio.aniosASeleccionar}
                    setearValorSeleccionado={this.setearAnioSeleccionado} />
                <Select
                    nombreSelect='Mes'
                    valorSeleccionado={this.state.mesSeleccionado}
                    valores={this.state.comboMes.mesesASeleccionar}
                    setearValorSeleccionado={this.setearMesSeleccionado}
                />
            </div>
            <NavGastos />
        </div>
    }
}

export default GastosView;