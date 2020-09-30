import React, { useEffect, useState } from 'react';
import { Button, Form, FormControl, Modal } from 'react-bootstrap';

function ModalEdicionGasto(props) {
    const [show, setShow] = useState(false);
    const [valor, setValor] = useState('');
    const [fecha, setFecha] = useState('');
    const [concepto, setConcepto] = useState('');

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
            console.log('veces que entra');
            setValor(props.gastoAEditar.valor);
            setFecha(props.gastoAEditar.fecha);
            setConcepto(props.gastoAEditar.concepto);
            abrirModal();
        }
    });

    return (
        <>
            <Modal show={show} onHide={cancelar} centered>
                <Modal.Header closeButton>
                    <Modal.Title><h5>Editar gasto</h5></Modal.Title>
                </Modal.Header>
                <Form onSubmit={aceptar}>
                    <Modal.Body>
                        <label>Concepto</label>
                        <FormControl
                            onChange={e => setConcepto(e.target.value)}
                            value={concepto}
                            className='mb-3'
                        />
                        <label>Monto</label>
                        <FormControl
                            onChange={e => setValor(e.target.value)}
                            value={valor}
                            className='mb-3'
                        />
                        <label>Fecha</label>
                        <FormControl
                            onChange={e => setFecha(e.target.value)}
                            value={fecha}
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

export default ModalEdicionGasto;