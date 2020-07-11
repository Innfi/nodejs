import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/index';
import { forbiddenWordsMiddleware } from '../middleware';
import createSagaMiddleware from 'redux-saga';
import apiSaga from '../sagas/api-saga';


const initializeSagaMiddleware = createSagaMiddleware();

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    storeEnhancers(
        applyMiddleware(forbiddenWordsMiddleware, initializeSagaMiddleware)
    )
);

initializeSagaMiddleware.run(apiSaga);


export default store;