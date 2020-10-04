import React, { useEffect, useState } from 'react';
import { Button, Form, FormControl, InputGroup, Modal } from 'react-bootstrap';
import { useStateFromProp } from '../../hook/hooks';

function ModalEdicionGasto(props) {
    const [show, setShow] = useState(false);
    const [valor, setValor] = useStateFromProp(props.gastoAEditar.valor);
    const [fecha, setFecha] = useStateFromProp(props.gastoAEditar.fecha);
    const [concepto, setConcepto] = useStateFromProp(props.gastoAEditar.concepto);

    const cancelar = () => {
        setShow(false);
        props.cerrarModal();
        resetearModal();
    }

    const resetearModal = () => {
        setValor(props.gastoAEditar.valor);
        setConcepto(props.gastoAEditar.concepto);
        setFecha(props.gastoAEditar.fecha);
    }

    const aceptar = (e) => {
        e.preventDefault();
        setShow(false);
        props.cerrarModal();
        props.editarGasto(gastoEditado());
    }

    const gastoEditado = () => {
        return {
            id: props.gastoAEditar.id,
            valor: valor,
            fecha: fecha,
            concepto: concepto
        }
    }

    const abrirModal = () => setShow(true);

    useEffect(() => {
        if (show !== props.modalEdicionGastoAbierto) {
            abrirModal();
        }
    });

    const mostrarFechaSiEsPrimeraCuotaOUnica = () => {
        return props.gastoAEditar.primerCuota ? <>
            <label>Fecha</label>
            <FormControl
                required
                onChange={e => setFecha(e.target.value)}
                value={fecha}
                className='mb-3' />
        </> : <></>
    }

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
                            required
                            onChange={e => setConcepto(e.target.value)}
                            value={concepto}
                            className='mb-3'
                        />
                        <label>Monto</label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>$</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                required
                                onChange={e => setValor(e.target.value)}
                                value={valor}
                            />
                        </InputGroup>
                        {mostrarFechaSiEsPrimeraCuotaOUnica()}
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