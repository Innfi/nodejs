import { GET_ERRORS } from '../actions/types';
import { UserState } from '../model';


const initialState: UserState = {
    isAuthenticated: false,
    user: {},
    loading: false
};

export default function(state: UserState = initialState, action: any) {
    switch(action.type) {
        case GET_ERRORS:
            return action.payload;
        default: 
            return state;
    }
}