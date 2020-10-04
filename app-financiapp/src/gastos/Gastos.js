import React, { useState, useEffect } from 'react';
import './../css/financiapp.css';
import gastosService from './../service/gastosService.js';
import ModalNuevoGasto from './ModalNuevoGasto.js';
import { Nav } from 'react-bootstrap';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import DetalleMensual from './DetalleMensual';
import Boton from '../Boton';
import ModalEliminacionGasto from './ModalEliminacionGasto';
import ModalEdicionGasto from './ModalEdicionGasto';
import GraficoGastos from './GraficoGastos';
import ControlGastos from './ControlGastos';

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
    const select = (nombreSelect, valorSeleccionado, valores, setearValorSeleccionado) => {
        return <Select
            nombreSelect={nombreSelect}
            valorSeleccionado={valorSeleccionado}
            valores={valores}
            setearValorSeleccionado={setearValorSeleccionado} />
    }

    return (
        <div className="mb-3 mt-3">
            <h2 className='grosor-titulos mb-4'>Mis Gastos</h2>
            <div className="row ml-0">
                <div className="ml-3">
                    {select('Año', props.anioSeleccionado, props.comboAnio.aniosASeleccionar, props.setearAnioSeleccionado)}
                </div>
                <div className="ml-5">
                    {select('Mes', props.mesSeleccionado, props.comboMes.mesesASeleccionar, props.setearMesSeleccionado)}
                </div>
            </div>
        </div>
    );
}

function NavGastos(props) {
    const [opcionSeleccionada, setOpcionSeleccionada] = useState('detalle-gastos');

    const abrirModal = () => {
        props.abrirModal();
    }

    const asignarOpcionSeleccionada = () => {
        if (opcionSeleccionada === 'detalle-gastos') {
            return <div className='tab-pane show active'>{props.tablaGastos}</div>
        } else if (opcionSeleccionada === 'grafico-gastos') {
            return <div className='tab-pane'>{props.graficoGastos}</div>
        } else {
            return <div className='tab-pane'>{props.controlGastos}</div>
        }
    }

    const seccionNav = (eventKey, titulo) => {
        return <Nav.Item>
            <Nav.Link eventKey={eventKey}>{titulo}</Nav.Link>
        </Nav.Item>
    }

    return (
        <div>
            <Nav className="navbar navbar-expand-lg navbar-light bg-light pl-2 pr-2" onSelect={setOpcionSeleccionada}>
                <ul className="nav navbar-nav mr-auto mt-2 mt-lg-0">
                    {seccionNav('detalle-gastos', 'Detalle mensual')}
                    {props.graficoGastosDisponible ? seccionNav('grafico-gastos', 'Gráfico mensual') : <></>}
                    {seccionNav('control-gastos', 'Limita tus gastos')}
                </ul>
                <Boton
                    accion={abrirModal}
                    color='danger'
                    icono={faPlusCircle}
                    texto='Nuevo gasto'
                />
            </Nav>
            {asignarOpcionSeleccionada()}
        </div>
    );
}

function GastosView() {
    const [gastoSeleccionado, setGastoSeleccionado] = useState({});
    const [modalEliminacionGastoAbierto, setModalEliminacionGastoAbierto] = useState(false);
    const [modalEdicionGastoAbierto, setModalEdicionGastoAbierto] = useState(false);
    const [modalNuevoGastoAbierto, setModalNuevoGastoAbierto] = useState(false);
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
    const [graficoGastos, setGraficoGastos] = useState({
        diasDelMes: [],
        gastoEstimadoAcumuladoPorDiasDelMes: [],
        gastoAcumuladoSinRepetirPorDia: [],
        disponible: false
    });
    const [sumatoriaGastosPorPeriodoSeleccionado, setSumatoriaGastosPorPeriodoSeleccionado] = useState({
        gastoTotal: '',
        gastoNecesario: '',
        gastoInnecesario: ''
    });

    useEffect(() => {
        inicializarGastosPorAnioYMes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const buscarGraficoGastos = (anio, mes) => {
        gastosService.buscarGraficoGastos(anio, mes)
            .then(response => response.json())
            .then(graficoGastos => setGraficoGastos(graficoGastos));
    }

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
            .then(anioYMesSeleccionados => {
                buscarTodosLosGastos(anioYMesSeleccionados.anioSeleccionado, anioYMesSeleccionados.mesSeleccionado);
                buscarGraficoGastos(anioYMesSeleccionados.anioSeleccionado, anioYMesSeleccionados.mesSeleccionado);
                buscarSumatoriaGastos(anioYMesSeleccionados.anioSeleccionado, anioYMesSeleccionados.mesSeleccionado);
            });
    };

    const setearAnioSeleccionado = (eventoCambioAnio) => {
        const anioSeleccionado = parseInt(eventoCambioAnio.target.value);
        setAnioSeleccionado(anioSeleccionado);
        buscarMesesPorAnioSeleccionado(anioSeleccionado);
        buscarGraficoGastos(anioSeleccionado, mesSeleccionado);
        buscarSumatoriaGastos(anioSeleccionado, mesSeleccionado);
    };

    const setearMesSeleccionado = (eventoCambioMes) => {
        const mesSeleccionado = parseInt(eventoCambioMes.target.value);
        setMesSeleccionado(mesSeleccionado);
        buscarTodosLosGastosCuandoCambiaSoloMes(mesSeleccionado);
        buscarGraficoGastos(anioSeleccionado, mesSeleccionado);
        buscarSumatoriaGastos(anioSeleccionado, mesSeleccionado);
    };

    const abrirModalNuevoGasto = () => {
        setModalNuevoGastoAbierto(true);
    }

    const cerrarModalNuevoGasto = () => {
        setModalNuevoGastoAbierto(false);
    }

    const abrirModalEliminacionGasto = (idGastoSeleccionado, conceptoGastoSeleccionado) => {
        setGastoSeleccionado({ id: idGastoSeleccionado, concepto: conceptoGastoSeleccionado });
        setModalEliminacionGastoAbierto(true);
    }

    const abrirModalEdicionGasto = (gastoSeleccionado) => {
        setGastoSeleccionado(gastoSeleccionado);
        setModalEdicionGastoAbierto(true);
    }

    const cerrarModalEliminacionGasto = () => {
        setModalEliminacionGastoAbierto(false);
    }

    const cerrarModalEdicionGasto = () => {
        setModalEdicionGastoAbierto(false);
    }

    const crearNuevoGasto = (nuevoGasto) => {
        gastosService.crearGasto(nuevoGasto)
            .then(() => buscarTodosLosGastos(anioSeleccionado, mesSeleccionado));
    }

    const editarGasto = (gastoEditado) => {
        gastosService.editarGasto(gastoEditado)
            .then(() => buscarTodosLosGastos(anioSeleccionado, mesSeleccionado));
    }

    const eliminarGastoPorId = () => {
        gastosService.eliminarGastoPorId(gastoSeleccionado.id)
            .then(() => buscarTodosLosGastos(anioSeleccionado, mesSeleccionado))
    }

    const buscarSumatoriaGastos = (anio, mes) => {
        gastosService.buscarSumatoriaGastos(anio, mes)
            .then(response => response.json())
            .then(sumatoriaGastos => setSumatoriaGastosPorPeriodoSeleccionado(sumatoriaGastos));
    }

    return (
        <div>
            <ModalEdicionGasto
                modalEdicionGastoAbierto={modalEdicionGastoAbierto}
                cerrarModal={cerrarModalEdicionGasto}
                gastoAEditar={gastoSeleccionado}
                editarGasto={editarGasto}
            />
            <ModalNuevoGasto
                modalNuevoGastoAbierto={modalNuevoGastoAbierto}
                cerrarModal={cerrarModalNuevoGasto}
                crearNuevoGasto={crearNuevoGasto}
            />
            <ModalEliminacionGasto
                conceptoAEliminar={gastoSeleccionado.concepto}
                modalEliminacionGastoAbierto={modalEliminacionGastoAbierto}
                cerrarModal={cerrarModalEliminacionGasto}
                eliminarGastoPorId={eliminarGastoPorId}
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
                abrirModal={abrirModalNuevoGasto}
                tablaGastos={
                    <DetalleMensual
                        gastos={gastos}
                        cambiarNecesidad={cambiarNecesidad}
                        abrirModalEliminacionGasto={abrirModalEliminacionGasto}
                        abrirModalEdicionGasto={abrirModalEdicionGasto}
                    />}
                graficoGastos={
                    <GraficoGastos
                        graficoGastos={graficoGastos}
                        graficoGastosDisponible={graficoGastos.disponible}
                    />
                }
                controlGastos={<ControlGastos
                    sumatoriaGastos={sumatoriaGastosPorPeriodoSeleccionado}
                />}
                graficoGastosDisponible={graficoGastos.disponible}
            />
        </div >
    );
}

export default GastosView;