import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button } from 'react-bootstrap';

function Boton(props) {
    return (
        <Button variant={props.color} onClick={props.accion}>
            <FontAwesomeIcon icon={props.icono} /> {props.texto}
        </Button>
    );
}

export default Boton;