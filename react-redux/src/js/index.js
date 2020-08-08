import { createStore } from 'react-redux';
import rootReducer from '../reducers/index';

import store from '../js/store/index';
import { addArticle } from '../js/actions/index';

window.store = store;
window.addArticle = addArticle;

