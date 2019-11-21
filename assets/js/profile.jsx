import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Form, Button, Alert } from "react-bootstrap";
import { Redirect } from "react-router";
import { get_profile } from "./ajax";
import {change_profile_desc} from "./ajax";

//import { submit_login } from './ajax';

class Profile extends React.Component {
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
      type: "SHOW_PROFILE",
      data: data
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    let { email, name, new_photo, desc, all_photos, hint, errors } = this.props;

    if (email == null) {
      get_profile();
      return (
        <div>
          <p>Loading</p>
        </div>
      );
    }
    let error_msg = null;
    if (errors) {
      error_msg = <Alert variant="danger">{errors}</Alert>;
    }
    let hint_msg = null;
    if (hint) {
        hint_msg = <Alert variant="primary">{hint}</Alert>
    }
    return (
      <div>
        <h1>Profile</h1>
        {error_msg}
        {hint_msg}
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            disabled
            type="text"
            value={email}
            onChange={ev => this.changed({ email: ev.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            disabled
            type="text"
            value={name}
            onChange={ev => this.changed({ name: ev.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="desc">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            value={desc}
            onChange={ev => this.changed({ desc: ev.target.value })}
          />
        </Form.Group>

        <Button
          id="profile_upload_new_photo_button"
          onClick={() => this.setState({ redirect: "./upload_new_photo" })}
        >
          Upload New Photo
        </Button>
        
        <Button
          id="profile_show_all_photos_button"
          onClick={() => this.setState({ redirect: "./all_photos" })}
        >
          Show All My Photos
        </Button>

        <Form.Group controlId="submit">
          <Button variant="primary" onClick={() => change_profile_desc(this)}>
            Submit
          </Button>
        </Form.Group>
      </div>
    );
  }
}

function state2props(state) {
  return state.profile;
}

export default connect(state2props)(Profile);
