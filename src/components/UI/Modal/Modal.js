import React from 'react';

import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props => {

    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div
                className={classes.Modal}
                style={{ transform: props.show ? 'translateY(0)' : 'translateY(-100vh)', opacity: props.show ? '1' : '0' }}
            >
                {props.children}
            </div>
        </Aux>
    );
}

/* instead of using "shouldComponentUpdate" we can use React.memo,
   and for its logic react memo recieves anonymous function as second argument
   but there is a slightly difference between this two:
   the way they act is exactly opposite so 
   we should change "!==" with "===" and "||" with "&&" */
export default React.memo(Modal, (prevProps, nextProps) => nextProps.show === prevProps.show && nextProps.children === prevProps.children);