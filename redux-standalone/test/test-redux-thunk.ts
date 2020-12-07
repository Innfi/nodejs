import assert from 'assert';
import { createStore, applyMiddleware, Dispatch } from 'redux';
import thunk from "redux-thunk";
import axios, { AxiosResponse } from 'axios';


export interface ManagingState {
    value: number;
};

const INCREMENT = 'INCREMENT';
const INC_FAIL = 'INC_FAIL';
const DECREMENT = 'DECREMENT';

interface IncAction {
    type: typeof INCREMENT,
    payload: ManagingState
};

interface IncFailAction {
    type: typeof INC_FAIL,
    payload: undefined
};

interface DecAction {
    type: typeof DECREMENT,
    payload: ManagingState
};


const incSuccess = (): IncAction => ({
    type: 'INCREMENT',
    payload: { value: 10 }
});

const incFail = (): IncFailAction  => ({
    type: 'INC_FAIL',
    payload: undefined
});

type ManagingActionTypes = IncAction | IncFailAction | DecAction;

const initialState: ManagingState = {
    value: 0
};

const rootReducer = (state: ManagingState = initialState, 
    action: ManagingActionTypes): ManagingState => {
    switch(action.type) {
        case INCREMENT:
            return {
                value: action.payload.value
            };
        case INC_FAIL:
            return {
                value: -1
            };
        case DECREMENT:
            return {
                value: action.payload.value
            };
        default:
            return state;
    }
};

const tryIncrement = ({}) => {
    return dispatch => {
        axios.get('http://localhost:3000/users/123')
        .then((value: AxiosResponse<string> ) => {
            console.log('axios response: ', value);
            dispatch(incSuccess);
        })
        .catch((reason: any) => { dispatch(incFail); });
    };
};

const store = createStore(
    rootReducer, 
    applyMiddleware(thunk)
);

describe('test thunk', () => {
    it('store: initial', async () => {
        assert.strictEqual(store.getState().value, 0);
    });

    it('call async', async () => {
    });
});