import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ModalNuevoGasto(props) {
    const [cantidadPagosDisponibles] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20])
    const [show, setShow] = useState(false);
    const [valor, setValor] = useState('');
    const [cantidadPagos, setCantidadPagos] = useState(1);
    const [fecha, setFecha] = useState(new Date());
    const [concepto, setConcepto] = useState('');

    const nuevoGasto = () => {
        return {
            valor: valor,
            cantidadPagos: cantidadPagos,
            fecha: fecha,
            concepto: concepto,
            necesario: true
        }
    }

    const resetearModal = () => {
        setValor('');
        setCantidadPagos(1);
        setFecha(new Date());
        setConcepto('');
    }

    const aceptar = (e) => {
        e.preventDefault();
        setShow(false);
        props.cerrarModal();
        props.crearNuevoGasto(nuevoGasto());
        resetearModal();
    }

    const cancelar = () => {
        setShow(false);
        props.cerrarModal();
        resetearModal();
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
                <Form onSubmit={aceptar}>
                    <Modal.Body>
                        <Form.Group as={Col} className='pl-0 pr-0'>
                            <Form.Label>Concepto</Form.Label>
                            <Form.Control
                                required
                                onChange={e => setConcepto(e.target.value)}
                                value={concepto}
                                className='mb-3'>
                            </Form.Control>
                            <Form.Label>Cantidad de pagos</Form.Label>
                            <select
                                onChange={e => setCantidadPagos(parseInt(e.target.value))}
                                value={cantidadPagos}
                                className='form-control mb-3'>
                                {cantidadPagosDisponibles
                                    .map(unaOpcionPago => <option value={unaOpcionPago} key={unaOpcionPago}>{unaOpcionPago}</option>)}
                            </select>
                            <Form.Label>Monto</Form.Label>
                            <Form.Control
                                required
                                onChange={e => setValor(e.target.value)}
                                value={valor}
                                className='form-control mb-3'>
                            </Form.Control>
                            <Form.Label>Fecha a realizar el pago</Form.Label>
                            <div>
                                <DatePicker
                                    className='form-control'
                                    dateFormat="yyyy-MM-dd"
                                    selected={fecha}
                                    onChange={nuevaFecha => setFecha(nuevaFecha)} />
                            </div>
                        </Form.Group>
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

export default ModalNuevoGasto;

