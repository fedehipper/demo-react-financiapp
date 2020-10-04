import React from 'react';
import { ProgressBar } from 'react-bootstrap';

function BarraProgreso(props) {
    const porcentajeProgreso = () => {
        const porcentaje = Math.round(props.valorActual * 100 / props.valorMaximo);
        return porcentaje > 100 ? 100 : porcentaje;
    }

    return <ProgressBar
        variant={props.color}
        now={porcentajeProgreso()}
        label={`${porcentajeProgreso()}%`} />
}

export default BarraProgreso;