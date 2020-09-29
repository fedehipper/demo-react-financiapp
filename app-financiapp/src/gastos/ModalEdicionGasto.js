import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function ModalEdicionGasto(props) {
    const [show, setShow] = useState(false);

    const cancelar = () => {
        setShow(false);
        props.cerrarModal();
    }

    const aceptar = (e) => {
        e.preventDefault();
        setShow(false);
        props.cerrarModal();
    }


    const abrirModal = () => setShow(true);

    useEffect(() => {
        if (show !== props.modalEdicionGastoAbierto) {
            abrirModal();
        }
    });


    return (
        <>
            <Modal show={show} onHide={cancelar} centered>
                <Modal.Header closeButton>
                    <Modal.Title><h5>Eliminar gasto</h5></Modal.Title>
                </Modal.Header>
                <Form onSubmit={aceptar}>
                    <Modal.Body className='text-center'>
                        <p>Modal edicion gasto</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={cancelar}>Cancelar</Button>
                        <Button variant='danger' type='submit'>Aceptar</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default ModalEdicionGasto;