import React from 'react';
import { Button, Card, Table } from 'react-bootstrap';
import ahorro from '../img/ahorro.jpg';
import LayoutControl from '../LayoutControl';

function ControlGastos(props) {
    const imagenAhorro = () => {
        return <img className="img-fluid" src={ahorro} alt='' />
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
            <Card.Body className="pb-3 pl-3 pr-3 pt-2">
                <div className="row">
                    <Card.Title className="col card-title">Límite a gastar</Card.Title>
                    {/* boton */}
                </div>
                <div className="row col">
                    <Card.Text>Monto límite: <b>$ {props.montoMensualEstimado}</b></Card.Text>
                    {/* <i className="text-warning col-2 mt-1 fa fa-exclamation-triangle" v-tooltip title="Monto límite superado"></i> */}
                </div>
                    barra de progreso
            </Card.Body>
        </Card>
    }

    return <LayoutControl
        imagen={imagenAhorro()}
        componenteCentral={tablaSumatoriaGastos()}
        componenteLadoDerecho={limiteGastos()}
    />
}

export default ControlGastos;