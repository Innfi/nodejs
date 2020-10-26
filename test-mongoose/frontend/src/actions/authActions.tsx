import axios from 'axios';
import { Dispatch } from 'redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';


import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING
} from './types';

export const registerUser = (userData: object, history: any) => (dispatch: Dispatch) => {
    axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch((err) => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    });
};