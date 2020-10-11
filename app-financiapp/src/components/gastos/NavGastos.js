import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import Boton from '../Boton';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

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

export default NavGastos;