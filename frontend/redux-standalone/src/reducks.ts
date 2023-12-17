import { Dispatch, Middleware, MiddlewareAPI, AnyAction } from 'redux';

export interface ManagingState {
    value: number;
};

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

export interface IncAction {
    type: typeof INCREMENT,
    payload: ManagingState
};

export interface DecAction {
    type: typeof DECREMENT,
    payload: ManagingState
};

type ManagingActionTypes = IncAction | DecAction;

const initialState: ManagingState = {
    value: 0
};

export const startingReducer = (state: ManagingState = initialState, 
    action: ManagingActionTypes): ManagingState => {
    switch(action.type) {
        case INCREMENT:
            return {
                value: action.payload.value
            };
        case DECREMENT:
            return {
                value: action.payload.value
            };
        default:
            return state;
    }
};

export const myMiddleware: Middleware = 
    (api: MiddlewareAPI<Dispatch<AnyAction>>) => 
    (next: Dispatch<ManagingActionTypes>) => 
    <A extends ManagingActionTypes>(action: A) => {
    console.log(action.payload);

    next(action);
};