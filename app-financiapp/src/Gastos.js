import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import TablaGastos from './Hola.js';

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

class SelectorPeriodo extends Component {
    render() {
        return <div>
            <select className="form-control">
                {this.props.anios.map(unAnio => <option key={unAnio}>{unAnio}</option>)}
            </select>
        </div>
    }
}

class GastosView extends Component {
    constructor() {
        super();
        this.state = {
            anios: []
        }
    }

    buscarAnios() {
        const apiUrl = 'http://localhost:8097/api/comboAnio';
        fetch(apiUrl)
            .then(response => response.json())
            .then(anios => this.setState({ anios }));
    }

    componentDidMount() {
        this.buscarAnios();
    }

    render() {
        return <div>
            {this.anios}
            <div className="col-2 mb-3">
                <SelectorPeriodo nombreSelect='Anio' anios={this.state.anios} />
            </div>
            <NavGastos />
        </div>
    }
}

export default GastosView;