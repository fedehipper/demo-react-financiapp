import React from 'react';
import { Card, Table } from 'react-bootstrap';
import ahorro from '../../img/ahorro.jpg';
import BarraProgreso from '../BarraProgreso';
import LayoutControl from '../LayoutControl';
import { faExclamationTriangle, faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconoEnAnchor from '../IconoEnAnchor';

function ControlGastos(props) {
    const imagenAhorro = () => {
        return <img className="img-fluid" src={ahorro} alt='' />
    }

    const montoLimiteEsSuperado = () => {
        if (props.sumatoriaGastos.gastoTotal > props.montoMensualEstimado) {
            return <div className='text-warning ml-3'><FontAwesomeIcon icon={faExclamationTriangle} /></div>
        }
    }

    const filaTablaSumatoriaGastos = (textoCabecera, textoCuerpo, colorCabecera) => {
        return <tr>
            <th scope="row" className={colorCabecera}>{textoCabecera}</th>
            <td className="text-right">$ {textoCuerpo}</td>
        </tr>
    }

    const tablaSumatoriaGastos = () => {
        return <Table size='sm' hover>
            <tbody>
                {filaTablaSumatoriaGastos('Suma de gastos innecesarios', props.sumatoriaGastos.gastoInnecesario, 'text-danger')}
                {filaTablaSumatoriaGastos('Suma de gastos necesarios', props.sumatoriaGastos.gastoNecesario, 'text-success')}
                {filaTablaSumatoriaGastos('Total', props.sumatoriaGastos.gastoTotal)}
            </tbody>
        </Table>
    }

    const saludar = () => {
        console.log('saludar');
    }

    const limiteGastos = () => {
        return <Card bg='light'>
            <Card.Body className='pb-3 pl-3 pr-3 pt-2'>
                <div className='row'>
                    <Card.Title className='col card-title'>Límite a gastar</Card.Title>
                    <div className='mr-3'>
                        <IconoEnAnchor
                            className='ml-1'
                            textoTooltip='Editar meta a superar'
                            accion={saludar}
                            icono={faEdit}
                        />
                    </div>
                </div>
                <div className='row col p-0 pl-3'>
                    <Card.Text className='mb-0'>Monto límite: <b>$ {props.montoMensualEstimado}</b></Card.Text>
                    {montoLimiteEsSuperado()}
                </div>
                <div className='mt-3'>
                    <BarraProgreso
                        valorActual={props.sumatoriaGastos.gastoTotal}
                        valorMaximo={props.montoMensualEstimado}
                        color='danger'
                    />
                </div>
            </Card.Body>
        </Card >
    }

    return <LayoutControl
        imagen={imagenAhorro()}
        componenteCentral={tablaSumatoriaGastos()}
        componenteLadoDerecho={limiteGastos()}
    />
}

export default ControlGastos;