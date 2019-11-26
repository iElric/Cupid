import React from 'react';

import { connect } from 'react-redux';
import { Form, Button, Alert} from 'react-bootstrap';

import { submit_login } from './ajax';
import {Link, withRouter} from "react-router-dom";

class Login extends React.Component {
    constructor(props) {
        super(props);

    }

    redirect() {
        const { history, location } = this.props;
        let { from } = location.state || {from: { pathname: '/'}}
        if (history) history.push(from);
    }

    changed(data) {
        this.props.dispatch({
            type: 'CHANGE_LOGIN',
            data: data,
        });
    }

    render() {
        let {email, password, errors} = this.props;
        let error_msg = null;
        if (errors) {
            error_msg = <Alert variant="danger">{ errors }</Alert>
        }
        return (
            <div>
              <h1>Log In</h1>
              { error_msg }
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text"
                              defaultValue={email}
                              onChange={
                  (ev) => this.changed({email: ev.target.value})} />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"
                              defaultValue={password}
                              onChange={
                  (ev) => this.changed({password: ev.target.value})} />
              </Form.Group>
              <Form.Group controlId="submit">
                <Button variant="primary" onClick={() => submit_login(this)}>
                  Log in
                </Button>
              </Form.Group>
                <div>
                    <Link
                        to="/sign_up">
                        Don't have an account? Sign Up Now!
                    </Link>
                </div>
            </div>
          );
    }
}

function state2props(state) {
    return state.forms.login;
}

export default withRouter(connect(state2props)(Login));