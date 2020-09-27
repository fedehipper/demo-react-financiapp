import React, { useState, useEffect } from 'react';
import './../css/financiapp.css';
import gastosService from './../service/gastosService.js';
import ModalNuevoGasto from './ModalNuevoGasto.js';
import { Nav } from 'react-bootstrap';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import DetalleMensual from './DetalleMensual';
import Boton from '../Boton';

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

function NavGastos(props) {

    const abrirModal = () => {
        props.abrirModal();
    }

    return (
        <div>
            <Nav className="navbar navbar-expand-lg navbar-light bg-light pl-2 pr-2">
                <ul className="nav navbar-nav mr-auto mt-2 mt-lg-0">
                    <Nav.Item>
                        <Nav.Link href='#detalle-gastos'>Detalle mensual</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href='#otra'>Otra</Nav.Link>
                    </Nav.Item>
                </ul>
                <Boton
                    accion={abrirModal}
                    color='danger'
                    icono={faPlusCircle}
                    texto='Nuevo gasto'
                />
            </Nav>
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
    const [modalNuevoGastoAbierto, setModalNuevogastoAbierto] = useState(false);
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
        inicializarGastosPorAnioYMes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const inicializarGastosPorAnioYMes = () => {
        gastosService
            .buscarAnios()
            .then(response => response.json())
            .then(comboAnio => {
                setComboAnio(comboAnio);
                setAnioSeleccionado(comboAnio.anioActual);
                return comboAnio.anioActual;
            })
            .then(anioActual => buscarMesesPorAnioSeleccionado(anioActual));
    };


    const buscarTodosLosGastos = (anioSeleccionado, mesSeleccionado) => {
        gastosService.buscarTodos(anioSeleccionado, mesSeleccionado)
            .then(response => response.json())
            .then(gastos => setGastos(gastos));
    };

    const buscarTodosLosGastosALModificarUnaNecesidad = () => {
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
            .then(() => buscarTodosLosGastosALModificarUnaNecesidad());
    };

    const buscarMesesPorAnioSeleccionado = (anioSeleccionado) => {
        gastosService.buscarMesesDisponiblesPorAnio(anioSeleccionado)
            .then(response => response.json())
            .then(comboMes => {
                setComboMes(comboMes);
                setMesSeleccionado(comboMes.mesActual);
                return {
                    anioSeleccionado: anioSeleccionado, mesSeleccionado: comboMes.mesActual
                }
            })
            .then(anioYMesSeleccionados => buscarTodosLosGastos(anioYMesSeleccionados.anioSeleccionado, anioYMesSeleccionados.mesSeleccionado));
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

    const abrirModal = () => {
        setModalNuevogastoAbierto(true);
    }

    const cerrarModal = () => {
        setModalNuevogastoAbierto(false);
    }

    const crearNuevoGasto = (nuevoGasto) => {
        gastosService.crearGasto(nuevoGasto)
            .then(() => buscarTodosLosGastos(anioSeleccionado, mesSeleccionado));
    }

    return (
        <div>
            <ModalNuevoGasto
                modalNuevoGastoAbierto={modalNuevoGastoAbierto}
                cerrarModal={cerrarModal}
                crearNuevoGasto={crearNuevoGasto}
            />
            <ComboAnioYMes
                comboAnio={comboAnio}
                comboMes={comboMes}
                mesSeleccionado={mesSeleccionado}
                anioSeleccionado={anioSeleccionado}
                setearAnioSeleccionado={setearAnioSeleccionado}
                setearMesSeleccionado={setearMesSeleccionado}
            />
            <NavGastos
                abrirModal={abrirModal}
                tablaGastos={
                    <DetalleMensual
                        gastos={gastos}
                        cambiarNecesidad={cambiarNecesidad}
                    />}
                otraVistaNav={<p>Otra vista nav</p>}
            />
        </div >
    );
}

export default GastosView;