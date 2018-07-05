import { createStore, combineReducers } from 'redux';

import Golbal from './redux/reducers/global';

let store = createStore(
    combineReducers({
        Golbal
    })
);

export default store;