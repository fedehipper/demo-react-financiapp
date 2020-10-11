import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import gastosService from '../../service/gastosService';
import IconoEnAnchor from '../IconoEnAnchor';
import ModalEdicionGasto from './ModalEdicionGasto';
import ModalEliminacionGasto from './ModalEliminacionGasto';

function DetalleMensual(props) {
    const [modalEliminacionGastoAbierto, setModalEliminacionGastoAbierto] = useState(false);
    const [gastos, setGastos] = useState([]);
    const [gastoSeleccionado, setGastoSeleccionado] = useState({});
    const [modalEdicionGastoAbierto, setModalEdicionGastoAbierto] = useState(false);

    // se vuelve a renderizar al cambiar de vista.
    useEffect(() => {
        if (props.buscarGastos) {
            buscarTodosLosGastos();
            props.dejarDeBuscarGastos();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.buscarGastos]);

    const iconoAccion = (icono, color, accion, textoTooltip) => {
        return <IconoEnAnchor
            icono={icono}
            color={color}
            accion={accion}
            textoTooltip={textoTooltip}
        />
    }

    const buscarTodosLosGastos = () => {
        gastosService.buscarTodos(props.anioSeleccionado, props.mesSeleccionado)
            .then(response => response.json())
            .then(gastos => setGastos(gastos));
    };

    const editarGasto = (gastoEditado) => {
        gastosService.editarGasto(gastoEditado)
            .then(() => {
                buscarTodosLosGastos(props.anioSeleccionado, props.mesSeleccionado);
            });
    }

    const eliminarGastoPorId = () => {
        gastosService.eliminarGastoPorId(gastoSeleccionado.id)
            .then(() => {
                buscarTodosLosGastos(props.anioSeleccionado, props.mesSeleccionado);
            });
    }

    const buscarTodosLosGastosALModificarUnaNecesidad = () => {
        gastosService.buscarTodos(props.anioSeleccionado, props.mesSeleccionado)
            .then(response => response.json())
            .then(gastos => setGastos(gastos));
    };

    const cambiarNecesidad = (gastoId) => {
        gastosService
            .cambiarNecesidad(gastoId)
            .then(() => {
                buscarTodosLosGastosALModificarUnaNecesidad();
            });
    };

    const cerrarModalEdicionGasto = () => setModalEdicionGastoAbierto(false);
    const abrirModalEdicionGasto = (gastoSeleccionado) => {
        setGastoSeleccionado(gastoSeleccionado);
        setModalEdicionGastoAbierto(true);
    }

    const cerrarModalEliminacionGasto = () => setModalEliminacionGastoAbierto(false);
    const abrirModalEliminacionGasto = (idGastoSeleccionado, conceptoGastoSeleccionado) => {
        setGastoSeleccionado({ id: idGastoSeleccionado, concepto: conceptoGastoSeleccionado });
        setModalEliminacionGastoAbierto(true);
    }
    
    const modalEliminacionGastoComponent = () => {
        return <ModalEliminacionGasto
            conceptoAEliminar={gastoSeleccionado.concepto}
            modalEliminacionGastoAbierto={modalEliminacionGastoAbierto}
            cerrarModal={cerrarModalEliminacionGasto}
            eliminarGastoPorId={eliminarGastoPorId}
        />
    }

    const modalEdicionGastoComponent = () => {
        return <ModalEdicionGasto
            modalEdicionGastoAbierto={modalEdicionGastoAbierto}
            cerrarModal={cerrarModalEdicionGasto}
            gastoAEditar={gastoSeleccionado}
            editarGasto={editarGasto}
        />
    }

    return (
        <>
            {modalEliminacionGastoComponent()}
            {modalEdicionGastoComponent()}
            <Table size="sm" striped hover bordered>
                <thead className="thead-light text-center">
                    <tr>
                        <th>Concepto</th>
                        <th>Fecha</th>
                        <th>Valor($)</th>
                        <th>Necesario</th>
                        <th colSpan='2'>Acciones</th>
                    </tr>
                </thead>
                <tbody>{
                    gastos.map(unGasto => {
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
                                        onChange={() => cambiarNecesidad(unGasto.id)}
                                    />
                                </div>
                            </td>
                            <td>{iconoAccion(faEdit, 'text-primary',() => abrirModalEdicionGasto(unGasto),  'Editar gasto')}</td>
                            <td>{iconoAccion(faTrash, 'text-danger',() => abrirModalEliminacionGasto(unGasto.id,unGasto.concepto),  'Eliminar gasto')}</td>
                        </tr>
                    })}
                </tbody>
            </Table >
        </>
    );
}

export default DetalleMensual;