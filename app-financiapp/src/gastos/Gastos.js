import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './../css/financiapp.css';
import gastosService from './../service/gastosService.js';


function Select(props) {
    return (
        <div className='row'>
            <div className='mr-3 mt-2'>
                <label>{props.nombreSelect}</label>
            </div>
            <div>
                <select className="form-control" onChange={props.setearValorSeleccionado} value={props.valorSeleccionado}>
                    {props.valores.map(unValor => <option value={unValor} key={unValor}>{unValor}</option>)}
                </select>
            </div>
        </div>
    );
}

function ComboAnioYMes(props) {
    return (
        <div className="mb-3 mt-3">
            <h2 className='grosor-titulos mb-4'>Mis Gastos</h2>
            <div className="row ml-0">
                <div className="ml-3">
                    <Select
                        nombreSelect='Año'
                        valorSeleccionado={props.anioSeleccionado}
                        valores={props.comboAnio.aniosASeleccionar}
                        setearValorSeleccionado={props.setearAnioSeleccionado} />
                </div>
                <div className="ml-5">
                    <Select
                        nombreSelect='Mes'
                        valorSeleccionado={props.mesSeleccionado}
                        valores={props.comboMes.mesesASeleccionar}
                        setearValorSeleccionado={props.setearMesSeleccionado}
                    />
                </div>
            </div>
        </div>
    );
}

function TablaGastos(props) {
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
            <tbody>{
                props.gastos.map(unGasto => {
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
                                    onChange={() => props.cambiarNecesidad(unGasto.id)}
                                />
                            </div>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    );
}

function NavGastos(props) {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light pl-2 pr-2">
                <ul className="nav navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <a className="nav-link active" data-toggle="tab" href="#detalle-gastos">Detalle mensual</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#otra">Otra</a>
                    </li>
                </ul>
            </nav >
            <div className="tab-content">
                <div className="tab-pane fade show active" id="detalle-gastos">
                    {props.tablaGastos}
                </div>
                <div className="tab-pane fade" id="otra">
                    {props.otraVistaNav}
                </div>
            </div>
        </div>
    );
}

function GastosView() {
    const [gastos, setGastos] = useState([]);
    const [anioSeleccionado, setAnioSeleccionado] = useState('');
    const [mesSeleccionado, setMesSeleccionado] = useState('');
    const [comboAnio, setComboAnio] = useState({
        anioActual: '',
        aniosASeleccionar: []
    });
    const [comboMes, setComboMes] = useState({
        mesActual: '',
        mesesASeleccionar: []
    });

    useEffect(() => {
        async function buscarAnios() {
            gastosService
                .buscarAnios()
                .then(response => response.json())
                .then(comboAnio => {
                    setComboAnio(comboAnio);
                    setAnioSeleccionado(comboAnio.anioActual);
                    return comboAnio.anioActual;
                })
                .then(anioActual => buscarMesesPorAnioSeleccionado(anioActual));
        }

        async function buscarMesesPorAnioSeleccionado(anioSeleccionado) {
            gastosService.buscarMesesDisponiblesPorAnio(anioSeleccionado)
                .then(response => response.json())
                .then(comboMes => {
                    setComboMes(comboMes);
                    setMesSeleccionado(comboMes.mesActual);
                    return {
                        anioSeleccionado: anioSeleccionado, mesSeleccionado: comboMes.mesActual
                    }
                })
                .then(anioYMesSeleccionados => buscarTodosLosGastos(anioYMesSeleccionados));
        };

        async function buscarTodosLosGastos(anioYMesSeleccionados) {
            gastosService.buscarTodos(anioYMesSeleccionados.anioSeleccionado, anioYMesSeleccionados.mesSeleccionado)
                .then(response => response.json())
                .then(gastos => setGastos(gastos));
        };

        buscarAnios();
    }, []);

    const buscarTodosLosGastos = () => {
        gastosService.buscarTodos(anioSeleccionado, mesSeleccionado)
            .then(response => response.json())
            .then(gastos => setGastos(gastos));
    };

    const buscarTodosLosGastosCuandoCambiaSoloMes = (mesSeleccionado) => {
        gastosService.buscarTodos(anioSeleccionado, mesSeleccionado)
            .then(response => response.json())
            .then(gastos => setGastos(gastos));
    };

    const cambiarNecesidad = (gastoId) => {
        gastosService
            .cambiarNecesidad(gastoId)
            .then(() => buscarTodosLosGastos());
    };

    const buscarMesesPorAnioSeleccionado = (anioSeleccionado) => {
        gastosService.buscarMesesDisponiblesPorAnio(anioSeleccionado)
            .then(response => response.json())
            .then(comboMes => {
                setComboMes(comboMes);
                return comboMes.mesActual;
            })
            .then(mesActual => setMesSeleccionado(mesActual))
            .then(() => buscarTodosLosGastos());
    };

    const setearAnioSeleccionado = (eventoCambioAnio) => {
        const anioSeleccionado = parseInt(eventoCambioAnio.target.value);
        setAnioSeleccionado(anioSeleccionado);
        buscarMesesPorAnioSeleccionado(anioSeleccionado);
    };

    const setearMesSeleccionado = (eventoCambioMes) => {
        const mesSeleccionado = parseInt(eventoCambioMes.target.value);
        setMesSeleccionado(mesSeleccionado);
        buscarTodosLosGastosCuandoCambiaSoloMes(mesSeleccionado);
    };

    return (
        <div>
            <ComboAnioYMes
                comboAnio={comboAnio}
                comboMes={comboMes}
                mesSeleccionado={mesSeleccionado}
                anioSeleccionado={anioSeleccionado}
                setearAnioSeleccionado={setearAnioSeleccionado}
                setearMesSeleccionado={setearMesSeleccionado}
            />
            <NavGastos
                tablaGastos={
                    <TablaGastos
                        gastos={gastos}
                        cambiarNecesidad={cambiarNecesidad}
                    />}
                otraVistaNav={<p>Otra vista nav</p>}
            />
        </div >
    );
}

export default GastosView;