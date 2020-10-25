import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import carteraService from './../../service/carteraService.js';

function CarteraActivos() {
    const [carteraActivos, setCarteraActivos] = useState([]);

    const buscarCarteraActivos = () => {
        carteraService.buscarCarteraActivos()
            .then(response => response.json())
            .then(cartera => setCarteraActivos(cartera));
    }

    useEffect(() => {
        buscarCarteraActivos(); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <Table size="sm" hover>
        <thead className="thead-light text-center">
                <tr>
                    <th>Activo</th>
                    <th>Moneda</th>
                    <th>Período</th>
                    <th>Monto invertido</th>
                    <th>Monto al día</th>
                    <th>Variación parcial</th>
                    <th>Ganancia total</th>
                </tr>
            </thead>
            <tbody>{
                carteraActivos.map(activo => {
                    return <tr key={activo.id}>
                        <td>{activo.nombre}</td>
                        <td className='text-center'>{activo.moneda}</td>
                        <td className='text-center'>{activo.fechaInicial} - {activo.fechaActual}</td>
                        <td className='text-right'>{activo.montoInicial}</td>
                        <td className='text-right'>{activo.montoActual}</td>
                        <td className='text-right'>{activo.gananciaParcial}</td>
                        <td className='text-right'>{activo.gananciaTotal}</td>
                    </tr>
                })}
            </tbody>
    </Table>
}

export default CarteraActivos;