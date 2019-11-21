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

export function put(path, body) {
    let state = store.getState();
    let token = state.session == null ? null : state.session.token;
    return fetch("/ajax" + path, {
        method: "put",
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

export function submit_login(form) {
    let state = store.getState();
    let data = state.forms.login;

    post('/sessions', data)
        .then((resp) => {
            console.log(resp);
            if (resp.token) {
                localStorage.setItem('session', JSON.stringify(resp));
                store.dispatch({
                    type: 'LOG_IN',
                    data: resp,
                });
                form.redirect('/');
            } else {
                store.dispatch({
                    type: 'CHANGE_LOGIN',
                    data: { errors: JSON.stringify(resp.errors) },
                });
            }
        });
}

export function get_profile() {
    let id = JSON.parse(localStorage.getItem('session')).user_id;
    console.log(id);
    get('/users/' + id).then((resp) => {


        console.log(resp.data);
        store.dispatch({
            type: 'SHOW_PROFILE',
            data: resp.data
        });
    })
}

export function change_profile_desc(form) {
    let id = JSON.parse(localStorage.getItem('session')).user_id;
    let state = store.getState();
    let data = { user: state.profile.desc };
    put('/users/' + id, data).then((resp) => {
        console.log(resp)
        Object.assign(resp.data, { hint: "success" })
        store.dispatch({
            type: 'SHOW_PROFILE',
            data: resp.data
        })
    })
}

export function upload_photo(form) {
    let state = store.getState();
    let data = state.profile;
    console.log(data.new_photo)

    if (data.new_photo == null) {
        return;
    }
    let reader = new FileReader();
    reader.addEventListener("load", () => {
        console.log("post photos")
        post('/photos', {
            photo: { desc: data.photo_desc, filename: data.new_photo.name, data: reader.result }
        }).then((resp) => {
            if (resp.data) {
                store.dispatch({
                    type: 'SHOW_PROFILE',
                    data: [resp.data],
                })
                form.redirect('/photos/' + resp.data.id);
            }
        })
    })

}