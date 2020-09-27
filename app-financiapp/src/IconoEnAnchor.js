import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { OverlayTrigger, SafeAnchor, Tooltip } from 'react-bootstrap';

function TooltipOpcional(props) {
    const conTooltip = <OverlayTrigger overlay={<Tooltip>{props.textoTooltip}</Tooltip>}>
        <span className="d-inline-block">
            {props.children}
        </span>
    </OverlayTrigger>

    const sinTooltip = props.children

    return props.textoTooltip ? conTooltip : sinTooltip;
}


function IconoEnAnchor(props) {
    return <div className='text-center'>
        <TooltipOpcional textoTooltip={props.textoTooltip}>
            <SafeAnchor className={props.color} onClick={props.accion}>
                <FontAwesomeIcon icon={props.icono} />
            </SafeAnchor>
        </TooltipOpcional>
    </div >
}

export default IconoEnAnchor;

