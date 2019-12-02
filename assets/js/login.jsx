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
      type: "CHANGE_LOGIN",
      data: data
    });
  }

render() {
    let {email, password, errors} = this.props;
    const { history } = this.props;
    let error_msg = null;
    if (errors) {
        error_msg = <Alert variant="danger">{ errors }</Alert>
    }
    return (
        <div>
            <div className="row justify-content-center">
            <h1>Log In</h1>
        </div>
            { error_msg }
            <div className="row justify-content-center">
            <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text"
                            defaultValue={email}
                            placeholder="Email"
                            className="form-short-input"
                            onChange={
                (ev) => this.changed({email: ev.target.value})} />
            </Form.Group>
            </div>

            <div className="row justify-content-center">
            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"
                            defaultValue={password}
                            placeholder="Password"
                            className="form-short-input"
                            onChange={
                (ev) => this.changed({password: ev.target.value})} />
            </Form.Group>
            </div>

            <div className="row justify-content-center">
            <Form.Group controlId="submit">
            <Button variant="primary" 
                    className="border_button btn-block"
                    onClick={() => submit_login(this)}>
                    Log in
            </Button>
            </Form.Group>
            </div>
            <div className="row justify-content-center">
            <Button variant="outline-primary" 
                    className="border_button"
                    onClick={() => history.push('/sign_up')}>
                Sign Up
            </Button>
            </div>
        </div>
        );
    }
}

function state2props(state) {
    return state.forms.login;
}

export default withRouter(connect(state2props)(Login));
