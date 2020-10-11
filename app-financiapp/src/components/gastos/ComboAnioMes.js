import React from 'react';

function ComboAnioYMes(props) {
    const select = (nombreSelect, valorSeleccionado, valores, setearValorSeleccionado) => {
        return <div className='row'>
            <div className='mr-3 mt-2'>
                <label>{nombreSelect}</label>
            </div>
            <div>
                <select className="form-control" onChange={setearValorSeleccionado} value={valorSeleccionado}>
                    {valores.map(unValor => <option value={unValor} key={unValor}>{unValor}</option>)}
                </select>
            </div>
        </div>
    }

    return <div className="row ml-0 mb-3">
        <div className="ml-3">
            {select('Año', props.anioSeleccionado, props.comboAnio.aniosASeleccionar, props.setearAnioSeleccionado)}
        </div>
        <div className="ml-5">
            {select('Mes', props.mesSeleccionado, props.comboMes.mesesASeleccionar, props.setearMesSeleccionado)}
        </div>
    </div>
}

export default ComboAnioYMes;
