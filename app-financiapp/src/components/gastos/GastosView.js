import React, { useState, useEffect } from 'react';
import './../../css/financiapp.css';
import gastosService from '../../service/gastosService.js';
import ModalNuevoGasto from './ModalNuevoGasto.js';
import { Nav } from 'react-bootstrap';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import DetalleMensual from './DetalleMensual';
import Boton from '../Boton';
import ModalEliminacionGasto from './ModalEliminacionGasto';
import GraficoGastos from './GraficoGastos';
import ControlGastos from './ControlGastos';
import ModalEdicionGasto from './ModalEdicionGasto';
import ModalEdicionLimiteGastos from './ModalEdicionLimiteGastos';
import TituloVista from '../TituloVista';
import DetalleAccionToast from '../Toast';

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

    return <div className="row ml-0 mb-3">
        <div className="ml-3">
            {select('Año', props.anioSeleccionado, props.comboAnio.aniosASeleccionar, props.setearAnioSeleccionado)}
        </div>
        <div className="ml-5">
            {select('Mes', props.mesSeleccionado, props.comboMes.mesesASeleccionar, props.setearMesSeleccionado)}
        </div>
    </div>
}

function NavGastos(props) {
    const [opcionSeleccionada, setOpcionSeleccionada] = useState('detalle-gastos');

    const abrirModal = () => props.abrirModal();

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

    return <div>
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
}

function GastosView() {
    const [gastoSeleccionado, setGastoSeleccionado] = useState({});
    const [modalEliminacionGastoAbierto, setModalEliminacionGastoAbierto] = useState(false);
    const [modalEdicionGastoAbierto, setModalEdicionGastoAbierto] = useState(false);
    const [modalNuevoGastoAbierto, setModalNuevoGastoAbierto] = useState(false);
    const [modalEdicionLimiteGastosAbierto, setModalEdicionLimiteGastosAbierto] = useState(false);
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
    const [montoMensualEstimado, setMontoMensualEstimado] = useState(0.00);
    const [descripcionToast, setDescripcionToast] = useState({
        esVisible: false,
        accionRealizada: ''
    })

    useEffect(() => {
        inicializarGastosPorAnioYMes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const cerarToast = () => {
        setDescripcionToast({ esVisible: false });
    }

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
            .then(() => {
                buscarTodosLosGastosALModificarUnaNecesidad();
                setDescripcionToast({ esVisible: true, colorTexto:'text-success', accionRealizada: 'Se ha actualizado la necesidad del gasto.' });
            });
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
                asignarEstadoPor(anioYMesSeleccionados.anioSeleccionado, anioYMesSeleccionados.mesSeleccionado);
            });
    };

    const setearAnioSeleccionado = (eventoCambioAnio) => {
        const anioSeleccionado = parseInt(eventoCambioAnio.target.value);
        setAnioSeleccionado(anioSeleccionado);
        buscarMesesPorAnioSeleccionado(anioSeleccionado);
        asignarEstadoPor(anioSeleccionado, mesSeleccionado);
    };

    const setearMesSeleccionado = (eventoCambioMes) => {
        const mesSeleccionado = parseInt(eventoCambioMes.target.value);
        setMesSeleccionado(mesSeleccionado);
        buscarTodosLosGastosCuandoCambiaSoloMes(mesSeleccionado);
        asignarEstadoPor(anioSeleccionado, mesSeleccionado);
    };

    const asignarEstadoPor = (anio, mes) => {
        buscarGraficoGastos(anio, mes);
        buscarSumatoriaGastos(anio, mes);
        buscarMontoMensualEstimado(anio, mes);
    }

    const cerrarModalEliminacionGasto = () => setModalEliminacionGastoAbierto(false);
    const abrirModalEliminacionGasto = (idGastoSeleccionado, conceptoGastoSeleccionado) => {
        setGastoSeleccionado({ id: idGastoSeleccionado, concepto: conceptoGastoSeleccionado });
        setModalEliminacionGastoAbierto(true);
    }

    const cerrarModalEdicionLimiteGastos = () => setModalEdicionLimiteGastosAbierto(false);
    const abrirModalEdicionLimiteGastos = () => setModalEdicionLimiteGastosAbierto(true);

    const cerrarModalEdicionGasto = () => setModalEdicionGastoAbierto(false);
    const abrirModalEdicionGasto = (gastoSeleccionado) => {
        setGastoSeleccionado(gastoSeleccionado);
        setModalEdicionGastoAbierto(true);
    }

    const abrirModalNuevoGasto = () => setModalNuevoGastoAbierto(true);
    const cerrarModalNuevoGasto = () => setModalNuevoGastoAbierto(false);

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

    const buscarMontoMensualEstimado = (anio, mes) => {
        gastosService.buscarMontoMensualEstimado(anio, mes)
            .then(response => response.json())
            .then(montoMensualEstimado => setMontoMensualEstimado(montoMensualEstimado));
    }

    const editarMontoMensualEstimado = (monto) => {
        const montoMensualAEditar = {
            anio: anioSeleccionado,
            mes: mesSeleccionado,
            montoEstimado: monto
        }
        gastosService.editarMontoMensualEstimado(montoMensualAEditar)
            .then(() => {
                buscarMontoMensualEstimado(anioSeleccionado, mesSeleccionado);
                setDescripcionToast({ esVisible: true, colorTexto:'text-success', accionRealizada: 'Se ha actualizado el monto mensual estimado.' });
            });
    }

    
    const modalEdicionGastoComponent = () => {
        return <ModalEdicionGasto
            modalEdicionGastoAbierto={modalEdicionGastoAbierto}
            cerrarModal={cerrarModalEdicionGasto}
            gastoAEditar={gastoSeleccionado}
            editarGasto={editarGasto}
        />
    }
    
    const modalNuevoGastoComponent = () => {
        return <ModalNuevoGasto
            modalNuevoGastoAbierto={modalNuevoGastoAbierto}
            cerrarModal={cerrarModalNuevoGasto}
            crearNuevoGasto={crearNuevoGasto}
        />
    }
    
    const modalEliminacionGastoComponent = () => {
        return <ModalEliminacionGasto
            conceptoAEliminar={gastoSeleccionado.concepto}
            modalEliminacionGastoAbierto={modalEliminacionGastoAbierto}
            cerrarModal={cerrarModalEliminacionGasto}
            eliminarGastoPorId={eliminarGastoPorId}
        />
    }
    
    const modalEdicionLimiteGastoComponent = () => {
        return <ModalEdicionLimiteGastos
            modalEdicionLimiteGastosAbierto={modalEdicionLimiteGastosAbierto}
            cerrarModal={cerrarModalEdicionLimiteGastos}
            montoMensualEstimado={montoMensualEstimado}
            editarMontoMensualEstimado={editarMontoMensualEstimado}
        />
    }
    
    const comboAnioMesComponent = () => {
        return <ComboAnioYMes
            comboAnio={comboAnio}
            comboMes={comboMes}
            mesSeleccionado={mesSeleccionado}
            anioSeleccionado={anioSeleccionado}
            setearAnioSeleccionado={setearAnioSeleccionado}
            setearMesSeleccionado={setearMesSeleccionado}
        />
    }
    
    const detalleMensualComponent = () => {
        return <DetalleMensual
            gastos={gastos}
            cambiarNecesidad={cambiarNecesidad}
            abrirModalEliminacionGasto={abrirModalEliminacionGasto}
            abrirModalEdicionGasto={abrirModalEdicionGasto}
        />
    }
    
    const detalleAccionToastComponent = () => {
        return <DetalleAccionToast 
            descripcionToast={descripcionToast}
            cerrarToast={cerarToast} />
    }

    const graficoGastosComponent = () => <GraficoGastos graficoGastos={graficoGastos} graficoGastosDisponible={graficoGastos.disponible}/>
    
    const controlGastosComponent = () => {
        return <ControlGastos
            sumatoriaGastos={sumatoriaGastosPorPeriodoSeleccionado}
            montoMensualEstimado={montoMensualEstimado}
            abrirModal={abrirModalEdicionLimiteGastos}
        />
    }
    
    const navGastosComponent = () => {
        return <NavGastos
            abrirModal={abrirModalNuevoGasto}
            tablaGastos={detalleMensualComponent()}
            graficoGastos={graficoGastosComponent()}
            controlGastos={controlGastosComponent()}
            graficoGastosDisponible={graficoGastos.disponible}
        />
    }

    return <div className='mt-3'>
        {modalEdicionGastoComponent()}
        {modalNuevoGastoComponent()}
        {modalEliminacionGastoComponent()}
        {modalEdicionLimiteGastoComponent()}
        <div className='row'>
            <div className='col-9'>
                <TituloVista titulo='Mis gastos' />
            </div>
            <div className='col-3'>
                {detalleAccionToastComponent()} 
            </div>
        </div>
        {comboAnioMesComponent()}
        {navGastosComponent()}
    </div >
}

export default GastosView;