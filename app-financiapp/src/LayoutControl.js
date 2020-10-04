import React from 'react';

function LayoutControl(props) {
    return (
        <div class="row position-relative">
            <div className="col-md-3 p-4">
                {props.imagen}
            </div>
            <div className='col-md-5 position-static p-4'>
                {props.componenteCentral}
            </div>
            <div class="col-md-4 position-static p-4">
                {props.componenteLadoDerecho}
            </div>
        </div >
    );
}

export default LayoutControl;