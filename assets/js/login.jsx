import React from "react";
import ReactDOM from "react-dom";

import { connect } from "react-redux";
import { Form, Button, Alert } from "react-bootstrap";
import { Redirect } from "react-router";

import { submit_login } from "./ajax";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null
    };
  }

  redirect(path) {
    this.setState({
      redirect: path
    });
  }

  changed(data) {
    this.props.dispatch({
      type: "CHANGE_LOGIN",
      data: data
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    let { email, password, errors } = this.props;
    let error_msg = null;
    if (errors) {
      error_msg = <Alert variant="danger">{errors}</Alert>;
    }
    return (
      <div>
        <div className="row justify-content-center">
          <h1>Log In</h1>
        </div>
        {error_msg}
        <div className="row justify-content-center">
          <Form.Group controlId="email">
            <Form.Control
              type="text"
              placeholder="Email"
              onChange={ev => this.changed({ email: ev.target.value })}
              className="form-short-input"
            />
          </Form.Group>
        </div>
        <div className="row justify-content-center">
          <Form.Group controlId="password">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={ev => this.changed({ password: ev.target.value })}
              className="form-short-input"
            />
          </Form.Group>
        </div>
        <div className="row justify-content-center">
          <Form.Group controlId="submit">
            <Button
              variant="primary"
              onClick={() => submit_login(this)}
              className="border_button"
            >
              Log in
            </Button>
          </Form.Group>
        </div>
      </div>
    );
  }
}

function state2props(state) {
  return state.login;
}

export default connect(state2props)(Login);
