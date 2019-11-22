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
      type: "UPLOAD",
      data: data
    });
  }

  file_changed(ev) {
    let input = ev.target;
    let file  = null;
    if (input.files.length > 0) {
      file = input.files[0];
    }
    this.changed({new_photo: file});
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    let {new_photo, photo_desc, errors} = this.props;
    return (
      <div>
        <h1>Upload New Photo</h1>
        <Form.Group controlId="upload">
          <Form.Label>Upload Photos</Form.Label>
          <Form.Control
            type="file"
            onChange={(ev) => this.file_changed(ev)}
          />
        </Form.Group>
        <Form.Group controlId="photo_desc">
          <Form.Label>Photo Description</Form.Label>
          <Form.Control
            type="text"
            onChange={ev => this.changed({ photo_desc: ev.target.value })}
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
  return state.upload_photo;
}

export default connect(state2props)(UploadNewPhoto);