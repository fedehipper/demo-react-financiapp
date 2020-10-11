import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Table } from 'react-bootstrap';
import IconoEnAnchor from '../IconoEnAnchor';


function DetalleMensual(props) {

    const iconoAccion = (icono, color, accion, textoTooltip) => {
        return <IconoEnAnchor
            icono={icono}
            color={color}
            accion={accion}
            textoTooltip={textoTooltip}
        />
    }

    return <Table size="sm" striped hover bordered>
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
                    <td>{iconoAccion(faEdit, 'text-primary',() => props.abrirModalEdicionGasto(unGasto),  'Editar gasto')}</td>
                    <td>{iconoAccion(faTrash, 'text-danger',() => props.abrirModalEliminacionGasto(unGasto.id,unGasto.concepto),  'Eliminar gasto')}</td>
                </tr>
            })}
        </tbody>
    </Table >
}

export default DetalleMensual;