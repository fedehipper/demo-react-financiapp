import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function ModalNuevoGasto(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        props.cerrarModal();
    }

    const handleShow = () => setShow(true);

    // ver cuando cambie la props.modalNuevoGastoAbierto -> llamar a handleShow
    useEffect(() => {
        if (props.modalNuevoGastoAbierto) {
            console.log("cambia estado");
            handleShow();
        }
    });

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
      </Button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
          </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
          </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalNuevoGasto;

