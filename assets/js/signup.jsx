import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { Form, Button, Alert} from 'react-bootstrap';
import { Redirect } from 'react-router';

//import { submit_login } from './ajax';

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
        };
    }

    redirect(path) {
        this.setState({
            redirect: path,
        });
    }

    changed(data) {
        this.props.dispatch({
            type: 'SIGN_UP',
            data: data,
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        let {email, password, name, gender, description, errors} = this.props;
        let error_msg = null;
        if (errors) {
            error_msg = <Alert variant="danger">{ errors }</Alert>
        }
        return (
            <div>
              <h1>Sign Up</h1>
              { error_msg }
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" onChange={
                  (ev) => this.changed({email: ev.target.value})} />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={
                  (ev) => this.changed({password: ev.target.value})} />
              </Form.Group>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" onChange={
                  (ev) => this.changed({name: ev.target.value})} />
              </Form.Group>
              <Form.Group controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control as="select" onChange={
                  (ev) => this.changed({gender: ev.target.value})}>
                      <option>Male</option>
                      <option>Female</option>
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId="desc">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" onChange={
                  (ev) => this.changed({description: ev.target.value})} />
              </Form.Group>
              <Form.Group controlId="submit">
                <Button variant="primary" onClick={() => submit_login(this)}>
                  Sign Up
                </Button>
              </Form.Group>
            </div>
          );
    }
}

function state2props(state) {
    return state.signup;
}

export default connect(state2props)(SignUp);