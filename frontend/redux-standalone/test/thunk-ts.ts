import assert from 'assert';
import {
    applyMiddleware, 
    bindActionCreators, 
    createStore, 
    Dispatch
} from 'redux';

import thunk, {
    ThunkAction,
    ThunkDispatch,
    ThunkMiddleware
} from 'redux-thunk';

type State = {
    foo: string;
    result: number;
};

type Actions = { type: 'FOO' } | { type: 'BAR'; result: number } | 
    { type: "AE"; result: number };
type ThunkResult<R> = ThunkAction<R, State, undefined, Actions>;

const initialState: State = {
    foo: 'foo',
    result: 0
};

const fakeReducer = (state: State = initialState, action: Actions): State => {
    switch(action.type) {
        case 'FOO':
            return {
                foo: 'FOO',
                result: 12345
            };
        case 'BAR': 
            return  {
                foo: 'BAR', 
                result: action.result
            };
        case 'AE': 
            return  {
                foo: 'AE', 
                result: action.result
            };
        default: return state;
    }
};

const store = createStore(
    fakeReducer,
    applyMiddleware(thunk as ThunkMiddleware<State, Actions>)
);

const anotherThunkAction = (): ThunkResult<string> => {
    return (dispatch, getState) => {
        dispatch({ type: 'FOO' });
        return 'hello';
    };
};

const promiseThunkAction = (): ThunkResult<Promise<boolean>> => {
    return async (dispatch, getState) => {
        console.log('here');
        dispatch({ type: 'BAR', result: 5 });
        return false;
    };
};

const standardAction = () => ({ type: 'FOO' });

interface ActionDispatchs {
    anotherThunkAction: typeof anotherThunkAction;
    promiseThunkAction: typeof promiseThunkAction;
    standardAction: typeof standardAction;
};

 //bindActionCreators not working
const actions: ActionDispatchs = bindActionCreators(
    {
       anotherThunkAction,
       promiseThunkAction,
       standardAction
    },
    store.dispatch
);


const isolatedThunkAction = (): ThunkResult<Promise<boolean>> => {
    return async (dispatch, getState) => {
        console.log('in isolatedThunkAction');
        dispatch({ type: 'AE', result: 99 });
        return false;
    };
};

describe('basic test', () => {
    it('calls simple dispatch', () => {
        assert.strictEqual(store.getState().foo, 'foo');
        store.dispatch({ type: 'BAR', result: 333});
    });

    it('calls standardAction', () => {
        const result = standardAction();
        assert.strictEqual(result.type, 'FOO');
    });

    it('calls thunk action', () => {
        const result = store.dispatch(anotherThunkAction());
        assert.strictEqual(result, 'hello');
        assert.strictEqual(store.getState().result, 12345);
    });

    it('calls actions from bindActionCreators', async () => {
        assert.strictEqual(store.getState().result, 12345);
        await actions.promiseThunkAction();
        assert.strictEqual(store.getState().result, 5);
    });

    it('calls isolated actions', () => {
        assert.strictEqual(store.getState().result, 5);
        isolatedThunkAction();
        assert.strictEqual(store.getState().result, 5);
    });
});