import { combineReducers, createStore } from "redux";

import dashboard from './dashboard.js';

const toogleMenu = () =>{
    return {
        type: "TOGGLE_SIDE"
    }
}

const reducer = (state, action)=>{
    if (state.type === "TOGGLE_SIDE"){
        return {
            state,
            collapsed: !state.collapsed
        }
    }
}

export default createStore(reducer, {collapsed: true});