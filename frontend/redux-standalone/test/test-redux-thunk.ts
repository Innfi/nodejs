import assert from 'assert';
import { createStore, applyMiddleware, Dispatch } from 'redux';
import thunk, { ThunkAction, ThunkDispatch, ThunkMiddleware } from "redux-thunk";
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

type RootState = ReturnType<typeof rootReducer>;

const asyncFunction = async (): Promise<string> => {
    const result: AxiosResponse<string> = 
        await axios.get('http://localhost:3000/users/123');
    return result.data;
};

const incrementNewThunk = (): ThunkAction<void, RootState, null, 
    IncAction> => async dispatch => {
    const result = asyncFunction();
    dispatch({
        type: INCREMENT,
        payload: { value: 15 }
    });
};

type ThunkResult<R> = ThunkAction<R, ManagingState, undefined, ManagingActionTypes>;

const anotherIncrementThunk = (): ThunkResult<string> => {
    return (dispatch, getState) => {
        dispatch({
            type: INCREMENT,
            payload: { value: 15 }
        });
        return 'hello';
    };
};

const store = createStore(
    rootReducer, 
    applyMiddleware(thunk as ThunkMiddleware<ManagingState, ManagingActionTypes>)
);


describe('test thunk', () => {
    it('tryIncrement', async () => {            
        const result = incrementNewThunk();

        //store.dispatch(result.);

        console.log(result.name);
    });
});