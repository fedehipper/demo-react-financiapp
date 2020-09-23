import React, { } from 'react';

function ModalNuevoGasto() {
    return (
        <div className='modal fade'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>

                    <div className='modal-header'>
                        <h5 className='modal-title'>Nuevo gasto</h5>
                        <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                            <span aria-hidden='true'>&times;</span>
                        </button>
                    </div>

                    <div className='modal-body'>
                        <p>Cuerpa de modal</p>
                    </div>

                    <div className='modal-footer'>
                        <button type='button' className='btn btn-secondary' data-dismiss='modal'>Cancelar</button>
                        <button type='submit' className='btn btn-primary'>Aceptar</button>
                    </div>

                </div>
            </div>
        </div >
    );
}

export default ModalNuevoGasto;

