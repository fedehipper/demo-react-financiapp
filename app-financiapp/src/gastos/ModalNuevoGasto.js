import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function ModalNuevoGasto(props) {
    const [cantidadPagosDisponibles] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20])
    const [show, setShow] = useState(false);
    const [valor, setValor] = useState('');
    const [cantidadPagos, setCantidadPagos] = useState(1);
    const [fecha, setFecha] = useState(moment(new Date()).format('YYYY-MM-DD'));
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
        setFecha(moment(new Date()).format('YYYY-MM-DD'));
        setConcepto('');
    }

    const cerrarModal = () => {
        setShow(false);
        props.cerrarModal();
        props.crearNuevoGasto(nuevoGasto());
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
                <Modal.Body>
                    <Form>
                        <div className='col pl-0 pr-0'>
                            <label>Concepto</label>
                            <input
                                onChange={e => setConcepto(e.target.value)}
                                value={concepto}
                                className='form-control mb-3'>
                            </input>
                            <label>Cantidad de pagos</label>
                            <select
                                onChange={e => setCantidadPagos(parseInt(e.target.value))}
                                value={cantidadPagos}
                                className='form-control mb-3'>
                                {cantidadPagosDisponibles.map(unaOpcionPago => <option value={unaOpcionPago} key={unaOpcionPago}>{unaOpcionPago}</option>)}
                            </select>
                            <label>Monto</label>
                            <input
                                onChange={e => setValor(e.target.value)}
                                value={valor}
                                className='form-control mb-3'>
                            </input>
                            <label>Fecha a realizar el pago</label>
                            <input
                                onChange={e => setFecha(e.target.value)}
                                value={fecha}
                                className='form-control mb-3'>
                            </input>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cerrarModal}>Cancelar</Button>
                    <Button variant="primary" onClick={cerrarModal}>Aceptar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalNuevoGasto;

