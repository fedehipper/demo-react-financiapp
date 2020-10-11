import React, { useState, useEffect } from 'react';
import './../../css/financiapp.css';
import gastosService from '../../service/gastosService.js';
import ModalNuevoGasto from './ModalNuevoGasto.js';
import DetalleMensual from './DetalleMensual';
import ModalEliminacionGasto from './ModalEliminacionGasto';
import GraficoGastos from './GraficoGastos';
import ControlGastos from './ControlGastos';
import ModalEdicionGasto from './ModalEdicionGasto';
import ModalEdicionLimiteGastos from './ModalEdicionLimiteGastos';
import TituloVista from '../TituloVista';
import DetalleAccionToast from '../Toast';
import NavGastos from './NavGastos';
import ComboAnioYMes from './ComboAnioMes';

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
            .then(() => {
                buscarTodosLosGastos(anioSeleccionado, mesSeleccionado);
                setDescripcionToast({ esVisible: true, colorTexto:'text-success', accionRealizada: 'Se ha creado un nuevo gasto.' });
            });
    }

    const editarGasto = (gastoEditado) => {
        gastosService.editarGasto(gastoEditado)
            .then(() => {
                buscarTodosLosGastos(anioSeleccionado, mesSeleccionado);
                setDescripcionToast({ esVisible: true, colorTexto:'text-success', accionRealizada: 'Se ha actualizado el gasto seleccionado.' });
            });
    }

    const eliminarGastoPorId = () => {
        gastosService.eliminarGastoPorId(gastoSeleccionado.id)
            .then(() => {
                buscarTodosLosGastos(anioSeleccionado, mesSeleccionado);
                setDescripcionToast({ esVisible: true, colorTexto: 'text-success', accionRealizada: 'Se ha eliminado el el gasto seleccionado.' });
            });
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
    
    const detalleAccionToastComponent = () => <DetalleAccionToast descripcionToast={descripcionToast} cerrarToast={cerarToast} />
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