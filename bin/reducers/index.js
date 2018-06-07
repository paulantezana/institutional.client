import { combineReducers, createStore } from "redux";
// import dashboard from './dashboard.js';

const reducer = (state, action) => {
    if (action.type === "TOGGLE_SIDE"){
        return [
            ...state,
            {
                collapsed : state.collapsed
            }
        ]
    }
}

export default createStore(reducer, {collapsed: false});