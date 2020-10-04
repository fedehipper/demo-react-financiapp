import React, { useEffect, useState } from 'react';
import { Button, Form, FormControl, Modal } from 'react-bootstrap';
import { useStateFromProp } from '../../hook/hooks';

function ModalEdicionLimiteGastos(props) {
    const [show, setShow] = useState(false);
    const [limite, setLimite] = useStateFromProp(props.montoMensualEstimado);


    const cancelar = () => {
        setShow(false);
        props.cerrarModal();
        resetearModal();
    }

    const resetearModal = () => {
        setLimite(props.montoMensualEstimado);
    }

    const aceptar = (e) => {
        e.preventDefault();
        setShow(false);
        props.cerrarModal();
        props.editarMontoMensualEstimado(limite);
    }

    const abrirModal = () => setShow(true);

    useEffect(() => {
        if (show !== props.modalEdicionLimiteGastosAbierto) {
            abrirModal();
        }
    });

    return (
        <>
            <Modal show={show} onHide={cancelar} centered>
                <Modal.Header closeButton>
                    <Modal.Title><h5>Nuevo límte mensual</h5></Modal.Title>
                </Modal.Header>
                <Form onSubmit={aceptar}>
                    <Modal.Body>
                        <label>Monto</label>
                        <FormControl
                            required
                            onChange={e => setLimite(e.target.value)}
                            value={limite}
                            className='mb-3'
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={cancelar}>Cancelar</Button>
                        <Button variant='primary' type='submit'>Aceptar</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );


}

export default ModalEdicionLimiteGastos;