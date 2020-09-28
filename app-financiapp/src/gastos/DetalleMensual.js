import { faTrash } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Table } from 'react-bootstrap';
import IconoEnAnchor from '../IconoEnAnchor';


function DetalleMensual(props) {
    return (
        <Table size="sm" striped hover bordered>
            <thead className="thead-light text-center">
                <tr>
                    <th>Concepto</th>
                    <th>Fecha</th>
                    <th>Valor($)</th>
                    <th>Necesario</th>
                    <th>Acciones</th>
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
                        <td>
                            <IconoEnAnchor
                                icono={faTrash}
                                color='text-danger'
                                accion={props.abrirModalEliminacionGasto}
                                textoTooltip='Eliminar gasto'
                            />
                        </td>
                    </tr>
                })}
            </tbody>
        </Table >
    );
}

export default DetalleMensual;