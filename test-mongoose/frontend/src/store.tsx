import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const initialState = {};
const middleware = [thunk];

//declare global {
//    interface Window {
//        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//    }
//}

const store = createStore(
    () => [],
    compose(
        applyMiddleware(...middleware), 
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ && 
        (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    )
);