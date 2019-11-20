import { createStore, combineReducers } from "redux";
import deepFreeze from "deep-freeze-strict";

function signup(
    st0 = {
        email: null,
        password: null,
        name: null,
        gender: null,
        description: null,
        errors: null
    },
    action
) {
    switch (action.type) {
        case "SIGN_UP":
            return Object.assign({}, st0, action.data);
        default:
            return st0;
    }
}

function login(st0 = { email: null, password: null, errors: null }, action) {
    switch (action.type) {
        case "LOGIN":
            return Object.assign({}, st0, action.data);
        default:
            return st0;
    }
}

function root_reducer(st0, action) {
    console.log("root reducer", st0, action);
    let reducer = combineReducers({
        signup,
        login
    });
    return deepFreeze(reducer(st0, action));
}

let store = createStore(root_reducer);
export default store;