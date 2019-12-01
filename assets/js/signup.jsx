import React from "react";
import _ from "lodash";

import { connect } from "react-redux";
import { Form, Button, Alert } from "react-bootstrap";

import { register } from "./ajax";
import { withRouter } from "react-router-dom";

import * as EmailValidator from "email-validator";

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: null,
      valid: {}
    };
  }

  display_error(errors) {
    this.setState({ errors: errors });
  }

  redirect() {
    const { history, location } = this.props;
    let { from } = location.state || { from: { pathname: "/" } };
    if (history) history.push(from);
  }

  changed(data) {
    this.props.dispatch({
      type: "SIGN_UP",
      data: data
    });
  }

  validate_email() {
    let { email } = this.props;
    let error_msg = null;
    if (!email) {
      error_msg = "Please input your email.";
    } else if (!EmailValidator.validate(email)) {
      error_msg = "Invalid email address.";
    }
    this.setState({ valid: _.extend(this.state.valid, { email: error_msg }) });
  }

  validate_pass() {
    let { password } = this.props;
    let error_msg = null;
    if (!password) {
      error_msg = "Please input your password.";
    } else if (password.length < 12 || password.length > 20) {
      error_msg = "The length of the password should be in range of 12 to 20.";
    }
    if (error_msg) {
    }
    this.setState({
      valid: _.extend(this.state.valid, { password: error_msg })
    });
  }

  confirm_pass() {
    let error_msg =
      this.props.password === this.props.confirm_password
        ? null
        : "Inconsistent with above password.";
    if (error_msg) {
    }
    this.setState({
      valid: _.extend(this.state.valid, { confirm_pass: error_msg })
    });
  }

  valid_name() {
    let { name } = this.props;
    let error_msg = null;
    if (!name) {
      error_msg = "Please pick a name for yourself.";
    }
    if (error_msg) {
      this.setState({ valid: _.extend(this.state.valid, { name: error_msg }) });
    }
  }

  render() {
    let { email, password, name, gender, desc } = this.props;
    let error_msg = null;
    if (this.state.errors) {
      error_msg = _.map(this.state.errors, err => {
        return (
          <Alert key={err} variant="danger">
            {err}
          </Alert>
        );
      });
    }
    return (
      <div>
        <h1 className="row justify-content-center">Sign Up</h1>
        {error_msg}
        <div className="row justify-content-center">
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="user@cupid.com"
              value={email}
              onBlur={() => {
                this.validate_email();
              }}
              onChange={ev => this.changed({ email: ev.target.value })}
              className="form-short-input"
            />
            <Form.Text className="error-input">
              {this.state.valid.email}
            </Form.Text>
          </Form.Group>
        </div>

        <div className="row justify-content-center">
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onBlur={() => {
                this.validate_pass();
              }}
              onChange={ev => this.changed({ password: ev.target.value })}
              className="form-short-input"
            />
            <Form.Text className="error-input">
              {this.state.valid.password}
            </Form.Text>
          </Form.Group>
        </div>
        <div className="row justify-content-center">
          <Form.Group controlId="confirm_password">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Type Password Again"
              onBlur={() => {
                this.confirm_pass();
              }}
              onChange={ev =>
                this.changed({ confirm_password: ev.target.value })
              }
              className="form-short-input"
            />
            <Form.Text className="error-input">
              {this.state.valid.confirm_pass}
            </Form.Text>
          </Form.Group>
          </div>
       
        <div className="row justify-content-center">
          <Form.Group controlId="name">
            <Form.Label>Account Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Handsome Boy"
              value={name}
              onBlur={() => {
                this.valid_name();
              }}
              onChange={ev => this.changed({ name: ev.target.value })}
              className="form-short-input"
            />
            <Form.Text className="error-input">
              {this.state.valid.name}
            </Form.Text>
          </Form.Group>
        </div>

        <div className="row justify-content-center">
          <Form.Group controlId="gender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              onChange={ev => this.changed({ gender: ev.target.value })}
              value={gender}
              className="form-short-input"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Form.Control>
          </Form.Group>
        </div>
        <div className="row justify-content-center">
        <Form.Group controlId="desc">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="A Brief Introduction"
            value={desc}
            onChange={ev => this.changed({ desc: ev.target.value })}
            className="form-short-input"
          />
        </Form.Group>
        </div>
        <div className="row justify-content-center">
        <Form.Group controlId="submit">
          <Button variant="primary" onClick={() => register(this)} className="border_button">
            Sign Up
          </Button>
        </Form.Group>
      </div>
      </div>
    );
  }
}

function state2props(state) {
  return state.forms.signup;
}

export default withRouter(connect(state2props)(SignUp));
