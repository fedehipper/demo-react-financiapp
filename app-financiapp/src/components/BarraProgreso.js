import React from 'react';
import { ProgressBar } from 'react-bootstrap';

function BarraProgreso(props) {
    const porcentajeProgreso = () => {
        const porcentaje = Math.round(props.valorActual * 100 / props.valorMaximo);
        if (props.valorMaximo) {
            if (porcentaje > 100) {
                return 100;
            } else {
                return porcentaje;
            }
        } else {
            return 0;
        }
    }

    return <ProgressBar variant={props.color} now={porcentajeProgreso()} label={`${porcentajeProgreso()}%`} />
}

export default BarraProgreso;