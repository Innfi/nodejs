import assert from 'assert';
import { createStore, applyMiddleware } from 'redux';
import { ManagingState, IncAction, DecAction, 
    startingReducer, myMiddleware } from '../src/reducks';


describe('vanilla redux', () => {
    it('reducer: increment', () => {
        const initialState: ManagingState = {
            value: 0
        };
        const incAction: IncAction = {
            type: 'INCREMENT',
            payload: { value: 3 } 
        };

        const reducedState = startingReducer(initialState, incAction);
        assert.strictEqual(reducedState.value, initialState.value+incAction.payload.value);
    });

    it('reducer: decrement', () => {
        const initialState: ManagingState = {
            value: 10
        };
        const decAction: DecAction = {
            type: 'DECREMENT',
            payload: { value: 5}
        };

        assert.strictEqual(startingReducer(initialState, decAction).value, 
            initialState.value-decAction.payload.value);
    });

    it('store: initial state', () => {
        const store = createStore(startingReducer);

        assert.strictEqual(store.getState() != undefined, true);
        assert.strictEqual(store.getState().value, 0);
    });

    it('store: dispatch', () => {
        const store = createStore(startingReducer);
        const initialValue = store.getState().value;

        const incAction: IncAction = {
            type: 'INCREMENT',
            payload: { value: 10 }
        };

        store.dispatch(incAction);
        assert.strictEqual(store.getState().value, initialValue+incAction.payload.value);
    });

    it('middleware', () => {
        const store = createStore(startingReducer,
            applyMiddleware(myMiddleware));
        
        store.dispatch( {
            type: 'INCREMENT',
            payload: { value: 10 }
        });
    });
});