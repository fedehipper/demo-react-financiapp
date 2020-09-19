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
            <select className="form-control" onChange={this.props.setearAnioSeleccionado}>
                {this.props.anios.map(unAnio => <option key={unAnio}>{unAnio}</option>)}
            </select>
        </div>
    }
}

class GastosView extends Component {
    constructor() {
        super();
        this.state = {
            anioSeleccionado: '',
            anios: []
        }
    }

    buscarAnios() {
        gastosService.buscarAnios()
            .then(response => response.json())
            .then(anios => this.setState({ anios }));
    }

    componentDidMount() {
        this.buscarAnios();
    }

    // se puede hacer este tipo de funcion o poner this.setearAnioSeleccionado = this.setearAnioSeleccionado.bind(this);
    // para mantener el contexto, luego de recibir un evento de un hijo para setear el resultado a un estado del padre.
    setearAnioSeleccionado = (eventoCambioAnio) => {
        this.setState({ anioSeleccionado: eventoCambioAnio.target.value });
    }

    render() {
        return <div>
            {this.anios}
            <div className="col-2 mb-3">
                <SelectorAnio
                    nombreSelect='Anio'
                    anios={this.state.anios}
                    setearAnioSeleccionado={this.setearAnioSeleccionado} />
            </div>
            <NavGastos />
        </div>
    }
}

export default GastosView;