import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Form, Button, Alert } from "react-bootstrap";
import { Redirect } from "react-router";
import { get_profile } from "./ajax";
import { upload_photo } from "./ajax";
import { FaUpload } from "react-icons/fa";

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
    let file = null;
    if (input.files.length > 0) {
      file = input.files[0];
    }
    this.changed({ new_photo: file });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    let { new_photo, photo_desc, errors } = this.props;
    let file_name = new_photo == null ? "Browse for file ..." : new_photo.name;
    return (
      <div>
        <h1>Upload New Photo</h1>
        <div className="row justify-content-center">
          <label
            htmlFor="fileUpload"
            className="file-upload btn btn-primary btn-block rounded-pill shadow  file_upload_width"
          >
            <FaUpload className="mr-2" />
            {file_name}
            <input
              id="fileUpload"
              type="file"
              onChange={ev => this.file_changed(ev)}
            ></input>
          </label>
        </div>
        <div className="row justify-content-center" >
        <Form.Group controlId="photo_desc">
          <Form.Control
            as="textarea"
            onChange={ev => this.changed({ photo_desc: ev.target.value })}
            placeholder="Photo Description"
            className="photo-desc"
          />
        </Form.Group>
        </div>
        <div className="row justify-content-center">
        <Form.Group controlId="submit">
          <Button variant="primary" onClick={() => upload_photo(this)}>
            Submit
          </Button>
        </Form.Group>
        </div>
      </div>
    );
  }
}

function state2props(state) {
  return state.upload_photo;
}

export default connect(state2props)(UploadNewPhoto);
