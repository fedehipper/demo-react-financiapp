import React from 'react';
import { Table } from 'react-bootstrap';
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
        return <p>controlar gastos </p>
    }

    return <LayoutControl
        imagen={imagenAhorro()}
        componenteCentral={tablaSumatoriaGastos()}
        componenteLadoDerecho={limiteGastos()}
    />
}

export default ControlGastos;