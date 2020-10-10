import React from 'react';
import { Toast } from 'react-bootstrap';

function DetalleAccionToast(props) {
    return <Toast onClose={() => props.cerrarToast()} show={props.descripcionToast.esVisible} delay={3000} autohide>
        <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
            <strong className="mr-auto">Bootstrap</strong>
            <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>{props.descripcionToast.accionRealizada}</Toast.Body>
    </Toast>
}

export default DetalleAccionToast;