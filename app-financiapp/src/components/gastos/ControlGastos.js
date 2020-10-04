import React from 'react';
import { Card, Table } from 'react-bootstrap';
import ahorro from '../../img/ahorro.jpg';
import BarraProgreso from '../BarraProgreso';
import LayoutControl from '../LayoutControl';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ControlGastos(props) {
    const imagenAhorro = () => {
        return <img className="img-fluid" src={ahorro} alt='' />
    }

    const montoLimiteEsSuperado = () => {
        if (props.sumatoriaGastos.gastoTotal > props.montoMensualEstimado) {
            return <div className='text-warning ml-3'><FontAwesomeIcon icon={faExclamationTriangle} /></div>
        }
    }

    const tablaSumatoriaGastos = () => {
        return <Table size='sm' hover>
            <tbody>
                <tr>
                    <th scope="row" className="text-danger">Suma de gastos innecesarios</th>
                    <td className="text-right">$ {props.sumatoriaGastos.gastoInnecesario}</td>
                </tr>
                <tr>
                    <th scope="row" className="text-success">Suma de gastos necesarios</th>
                    <td className="text-right">$ {props.sumatoriaGastos.gastoNecesario}</td>
                </tr>
                <tr>
                    <th scope="row">Total</th>
                    <td className="text-right">$ {props.sumatoriaGastos.gastoTotal}</td>
                </tr>
            </tbody>
        </Table>
    }

    const limiteGastos = () => {
        return <Card bg='light'>
            <Card.Body className='pb-3 pl-3 pr-3 pt-2'>
                <div className='row'>
                    <Card.Title className='col card-title'>Límite a gastar</Card.Title>
                    {/* boton */}
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