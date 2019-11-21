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
        case "CHANGE_LOGIN":
            return Object.assign({}, st0, action.data);
        default:
            return st0;
    }
}


function profile(st0 = { email: null, name: null, new_photo: null, description: null, all_photos: null, errors: null }, action) {
    switch (action.type) {
        case "SHOW_PROFILE":
            return Object.assign({}, st0, action.data);
        default:
            return st0;
    }
}


function forms(st0, action) {
    let reducer = combineReducers({
        signup,
        login,
    })
    return reducer(st0, action);
}

let session0 = localStorage.getItem('session');
if (session0) {
    session0 = JSON.parse(session0);
}

function session(st0 = session0, action) {
    switch (action.type) {
        case 'LOG_IN':
            return action.data;
        case 'LOG_OUT':
            return null;
        default:
            return st0;
    }
}


function root_reducer(st0, action) {
    console.log("root reducer", st0, action);
    let reducer = combineReducers({
        forms,
        session,
        login,
        profile,
    });
    return deepFreeze(reducer(st0, action));
}


let store = createStore(root_reducer);
export default store;