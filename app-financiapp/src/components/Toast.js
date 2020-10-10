import React from 'react';
import { Toast } from 'react-bootstrap';

function DetalleAccionToast(props) {
    return <Toast
        className='ml-4'
        onClose={() => props.cerrarToast()}
        show={props.descripcionToast.esVisible}
        delay={3000}
        autohide
    >
            <Toast.Header>
                <strong className="mr-auto">Acción realizada</strong>
            </Toast.Header>
            <Toast.Body className={props.descripcionToast.colorTexto}><strong>{props.descripcionToast.accionRealizada}</strong></Toast.Body>
    </Toast>
}

export default DetalleAccionToast;