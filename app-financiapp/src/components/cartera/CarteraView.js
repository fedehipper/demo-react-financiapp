import TituloVista from '../TituloVista';
import React from 'react';
import CarteraActivos from './CarteraActivos';


function Cartera() {
    return <div className="mb-3 mt-3">
        <TituloVista titulo='Mi cartera' />
        <CarteraActivos/>
    </div>
}

export default Cartera;