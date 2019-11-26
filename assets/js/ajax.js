import store from "./store";

export function post(path, body) {
    let state = store.getState();
    let token = state.session == null ? null : state.session.token;
    return fetch("/ajax" + path, {
        method: "post",
        credentials: "same-origin",
        headers: new Headers({
            "x-csrf-token": window.csrf_token,
            "content-type": "application/json; charset=UTF-8",
            accept: "application/json",
            "x-auth": token || ""
        }),
        body: JSON.stringify(body)
    }).then(resp => resp.json());
}

export function get(path) {
    let state = store.getState();
    let token = state.session == null ? null : state.session.token;

    return fetch("/ajax" + path, {
        method: "get",
        credentials: "same-origin",
        headers: new Headers({
            "x-csrf-token": window.csrf_token,
            "content-type": "application/json; charset=UTF-8",
            accept: "application/json",
            "x-auth": token || ""
        })
    }).then(resp => resp.json());
}

export function register(form) {
    let state = store.getState();
    let data = state.forms.signup;
    post('/users', {'user': data})
        .then((resp) => {
            if (resp.token) {
                localStorage.setItem('session', JSON.stringify(resp));
                store.dispatch({
                    type: 'RESET_REG',
                });
                store.dispatch({
                    type: 'LOG_IN',
                    data: resp,
                });
                form.redirect();
            } else {
                form.display_error(resp.errors);
            }
        });
}

export function submit_login(form) {
    let state = store.getState();
    let data = state.forms.login;

    post('/sessions', data)
        .then((resp) => {
            if (resp.token) {
                localStorage.setItem('session', JSON.stringify(resp));
                store.dispatch({
                    type: 'LOG_IN',
                    data: resp,
                });
                store.dispatch({
                    type: 'RESET_LOGIN'
                });
                form.redirect();
            }
            else {
                console.log(resp.errors);
                store.dispatch({
                    type: 'CHANGE_LOGIN',
                    data: {errors: resp.errors},
                });
            }
        });
}