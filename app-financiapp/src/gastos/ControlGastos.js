import React from 'react';

function ControlGastos(props) {
    return (
        <div>
            <li>{props.sumatoriaGastos.gastoTotal}</li>
            <li>{props.sumatoriaGastos.gastoNecesario}</li>
            <li>{props.sumatoriaGastos.gastoInnecesario}</li>
        </div>
    );
}

export default ControlGastos;