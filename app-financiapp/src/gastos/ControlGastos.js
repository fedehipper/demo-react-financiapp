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
        return <div class="card bg-light">
            <div class="card-body pb-3 pl-3 pr-3 pt-2">
                <div class="row">
                    <h5 class="col card-title">Límite a gastar</h5>
                        boton
                            </div>
                <div class="row col">
                    <div>Monto límite: <b>$ 1232.23</b></div>
                    <i v-if="montoLimiteEsSuperado" class="text-warning col-2 mt-1 fa fa-exclamation-triangle" v-tooltip title="Monto límite superado"></i>
                </div>
                    barra de progreso
                </div>
        </div>
    }

    return <LayoutControl
        imagen={imagenAhorro()}
        componenteCentral={tablaSumatoriaGastos()}
        componenteLadoDerecho={limiteGastos()}
    />
}

export default ControlGastos;