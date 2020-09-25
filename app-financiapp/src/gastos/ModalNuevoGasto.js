import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function ModalNuevoGasto(props) {
    const [show, setShow] = useState(false);

    const cerrarModal = () => {
        setShow(false);
        props.cerrarModal();
    }

    const abrirModal = () => setShow(true);

    useEffect(() => {
        if (show !== props.modalNuevoGastoAbierto) {
            abrirModal();
        }
    });

    return (
        <>
            <Modal show={show} onHide={abrirModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title><h5>Nuevo gasto</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cerrarModal}>Cancelar</Button>
                    <Button variant="primary" onClick={cerrarModal}>Aceptar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalNuevoGasto;

