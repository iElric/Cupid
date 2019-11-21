import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Form, Button, Alert } from "react-bootstrap";
import { Redirect } from "react-router";
import { get_profile } from "./ajax";
import {upload_photo} from "./ajax";

//import { submit_login } from './ajax';

class UploadNewPhoto extends React.Component {
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

    let {email, name, new_photo, desc, photo_desc, hint, all_photos, errors} = this.props;
    return (
      <div>
        <h1>Upload New Photo</h1>
        <Form.Group controlId="upload">
          <Form.Label>Upload Photos</Form.Label>
          <Form.Control
            type="file"
            onChange={ev => this.changed({ new_photo: ev.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="photo_desc">
          <Form.Label>Photo Description</Form.Label>
          <Form.Control
            type="text"
            onChange={ev => this.changed({ photo: ev.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="submit">
          <Button variant="primary" onClick={() => upload_photo(this)}>
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

export default connect(state2props)(UploadNewPhoto);