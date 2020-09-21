import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './../css/financiapp.css';
import gastosService from './../service/gastosService.js';


class Select extends React.Component {
    render() {
        return <div className='row'>
            <div className='mr-3 mt-2'>
                <label>{this.props.nombreSelect}</label>
            </div>
            <div>
                <select className="form-control" onChange={this.props.setearValorSeleccionado} value={this.props.valorSeleccionado}>
                    {this.props.valores.map(unValor => <option value={unValor} key={unValor}>{unValor}</option>)}
                </select>
            </div>
        </div>
    }
}

class ComboAnioYMes extends React.Component {
    render() {
        return <div className="mb-3 mt-3">
            <h2 className='grosor-titulos mb-4'>Mis Gastos</h2>
            <div className="row ml-0">
                <div className="ml-3">
                    <Select
                        nombreSelect='Año'
                        valorSeleccionado={this.props.anioSeleccionado}
                        valores={this.props.comboAnio.aniosASeleccionar}
                        setearValorSeleccionado={this.props.setearAnioSeleccionado} />
                </div>
                <div className="ml-5">
                    <Select
                        nombreSelect='Mes'
                        valorSeleccionado={this.props.mesSeleccionado}
                        valores={this.props.comboMes.mesesASeleccionar}
                        setearValorSeleccionado={this.props.setearMesSeleccionado}
                    />
                </div>
            </div>
        </div>
    }
}

class TablaGastos extends React.Component {
    render() {
        return <table className="table table-sm table-striped table-hover table-bordered">
            <thead className="thead-light text-center">
                <tr>
                    <th>Concepto</th>
                    <th>Fecha</th>
                    <th>Valor($)</th>
                    <th>Necesario</th>
                </tr>
            </thead>
            <tbody>{
                this.props.gastos.map(unGasto => {
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
                                    onChange={() => this.props.cambiarNecesidad(unGasto.id)}
                                />
                            </div>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    }
}

class GastosView extends React.Component {
    constructor() {
        super();
        this.state = {
            gastos: [],
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

    buscarTodosLosGastos() {
        gastosService.buscarTodos(this.state.anioSeleccionado, this.state.mesSeleccionado)
            .then(response => response.json())
            .then(gastos => this.setState({ gastos }));
    }

    buscarTodosLosGastosCuandoCambiaSoloMes(mesSeleccionado) {
        gastosService.buscarTodos(this.state.anioSeleccionado, mesSeleccionado)
            .then(response => response.json())
            .then(gastos => this.setState({ gastos }));
    }

    cambiarNecesidad = (gastoId) => {
        gastosService
            .cambiarNecesidad(gastoId)
            .then(() => this.buscarTodosLosGastos());
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
            })
            .then(() => this.buscarTodosLosGastos());
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

    // se puede tener en el padre una espera de un evento, para esto en el hijo debe haber un onChange={this.setearMesSeleccionado} junto
    // con un value={valorQue tendrá el target.value} O también se puede llamar a la función con el valor haciendo onChange={() => this.setearMesSeleccionado(valorDeLaLlamada)}
    // en los onChange de acciones "nativas" es mejor onChange con value y en los personalizados se pueden usar amboas.
    setearMesSeleccionado = (eventoCambioMes) => {
        const mesSeleccionado = parseInt(eventoCambioMes.target.value);
        this.setState({ mesSeleccionado: mesSeleccionado });
        this.buscarTodosLosGastosCuandoCambiaSoloMes(mesSeleccionado);
    }

    render() {
        return <div>
            <ComboAnioYMes
                comboAnio={this.state.comboAnio}
                comboMes={this.state.comboMes}
                mesSeleccionado={this.state.mesSeleccionado}
                anioSeleccionado={this.state.anioSeleccionado}
                setearAnioSeleccionado={this.setearAnioSeleccionado}
                setearMesSeleccionado={this.setearMesSeleccionado}
            />
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light pl-2 pr-2">
                    <ul className="nav navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" data-toggle="tab" href="#detalle-gastos">Detalle mensual</a>
                        </li>
                    </ul>
                </nav >
                <div className="tab-content">
                    <div className="tab-pane fade show active" id="detalle-gastos">
                        <TablaGastos
                            gastos={this.state.gastos}
                            cambiarNecesidad={this.cambiarNecesidad}
                        />
                    </div>
                </div>
            </div>

        </div>
    }
}

export default GastosView;