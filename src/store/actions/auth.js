import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = { email: email, password: password, returnSecureToken: true };
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD4Jpt1o_BTiHe0MR78JPBXt4dcrc-jdu0', authData)
            .then(response => {
                dispatch(authSuccess(response.data));
            })
            .catch(err => {
                dispatch(authFail(err));
            });
    };
};