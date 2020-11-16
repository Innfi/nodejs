import {
    SET_CURRENT_USER, 
    USER_LOADING
} from '../actions/types';
import isEmpty from 'is-empty';
import { UserState } from '../model';

const initialState: UserState = {
    isAuthenticated: false,
    user: {},
    loading: false
};

export default function(state: UserState = initialState, action: any): UserState {
    switch(action.type) {
        case SET_CURRENT_USER: 
            return {
                ...state, 
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case USER_LOADING: 
            return {
                ...state,
                loading: true
            };
        default: 
            return state;
    }
}