import React, { useState, useEffect } from 'react';

import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, setError] = useState(null);

        const errorConfirmedHandler = () => {
            setError(null);
        };

        /* we use "componentWillMount" in class based components to run this methods before rendering components,
           but in functional components we can't turn that to react hooks by "useEffect".
           we have another way to perform that, as every code before "return" in script,
           will execute before that, we just use them before returning jsx code */

        const reqInterceptor = axios.interceptors.request.use(req => {
            setError(null);
            return req;
        });
        const resInterceptor = axios.interceptors.response.use(res => res, err => {
            setError(err);
        });

        /* using a return function inside "useEffect" will do the cleanup for us,
           and as we have "componentWillUnmount" in class based we could simply convert that
           by returning anonymous function inside "useEffect" */
        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            }
        }, [reqInterceptor, resInterceptor]);

        return (
            <Aux>
                <Modal show={error} modalClosed={errorConfirmedHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        );
    }
};

export default withErrorHandler;