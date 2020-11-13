import axios, { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';


import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING
} from './types';

export interface RegisterProps {
    isAuthenticated: boolean;
    history: string[];
    errors: any;
    registerUser(userData: object, history: string[]): void;
}

export interface RegisterState {
    name: string;
    email: string;
    password: string;
    password2: string;
    errors: any;
    isAuthenticated: boolean;
}

export const registerUser = (userData: object, history: string[]) => (dispatch: Dispatch) => {
    console.log('userData: ', userData);
    console.log('history: ', history);

    axios
    .post('/api/users/register', userData)
    .then((res: AxiosResponse) => history.push('/login'))
    .catch((err) => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    });
};

export const loginUser = (userData: object) => (dispatch: Dispatch) => {
    axios.post('/api/users/login', userData)
    .then((res: AxiosResponse) => {
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
    })
    .catch((err: any) => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));
}

export const setCurrentUser = (decoded: unknown) => {
    return { type: USER_LOADING };
};

export const logoutUser = () => (dispatch: Dispatch) => {
    localStorage.removeItem("jwtToken");
    setAuthToken(''); //FIXME
    dispatch(setCurrentUser({}));
}