//import { createStore, applyMiddleware, compose } from 'redux';
//import rootReducer from '../reducers/index';
//import { forbiddenWordsMiddleware } from '../middleware';
//import createSagaMiddleware from 'redux-saga';
//import apiSaga from '../sagas/api-saga';
//
//
//const initializeSagaMiddleware = createSagaMiddleware();
//
//const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//
//const store = createStore(
//    rootReducer,
//    storeEnhancers(
//        applyMiddleware(forbiddenWordsMiddleware, initializeSagaMiddleware)
//    )
//);
//
//initializeSagaMiddleware.run(apiSaga);
//
//
//export default store;

import { configureStore, getDefaultMiddleware, createSlice } from '@reduxjs/toolkit';

const middleware = [
    ...getDefaultMiddleware(),
];

const authState = {
    token: "",
    error: "" 
};

const authSlice = createSlice({
    name: "auth",
    initialState: authState,
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload;
        },
        loginFailed: (state, action) => {
            state.error = action.payload;
        }
    }
});

const { loginSuccess, loginFailed } = authSlice.actions;
const authReducer = authSlice.reducer;

const store = configureStore({
    reducer: {
        auth: authReducer,
    }, 
    middleware,
});