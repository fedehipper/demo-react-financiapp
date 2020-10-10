import React from 'react';
import { Toast } from 'react-bootstrap';

function DetalleAccionToast(props) {
    return <Toast onClose={() => props.cerrarToast()} show={props.descripcionToast.esVisible} delay={3000} autohide>
        <Toast.Header>
            <strong className="mr-auto">Acción realizada</strong>
        </Toast.Header>
        <Toast.Body>{props.descripcionToast.accionRealizada}</Toast.Body>
    </Toast>
}

export default DetalleAccionToast;