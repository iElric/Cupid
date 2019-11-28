import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Button, Alert, ListGroup } from "react-bootstrap";
import { Redirect } from "react-router";
import { get_profile } from "./ajax";
import { get_my_interests } from "./ajax";
import { FaHeart} from "react-icons/fa";
import { IconButton } from "@material-ui/core";
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

    let {
      email,
      name,
      new_photo,
      desc,
      all_photos,
      my_interests,
      hint,
      errors
    } = this.props;

    if (email == null) {
      get_profile();
      return (
        <div>
          <p>Loading</p>
        </div>
      );
    }
    if (my_interests == null) {
      get_my_interests();
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
    
    let interest_name = my_interests.map(x => (
      <ListGroup as="ul" key={x.id}>
        <ListGroup.Item as="li" variant="primary">
          {x.tag_name}
        </ListGroup.Item>
      </ListGroup>
    ));

    return (
      <div className="profile">
        <h1>Profile</h1>
        <IconButton onClick={() => this.setState({ redirect: "./upload_new_photo" })}>
              <FaHeart className="layer" size="1em" color="pink" />
              Upload New Photo
        </IconButton>

        <IconButton onClick={() => this.setState({ redirect: "./all_photos" })}>
              <FaHeart className="layer" size="1em" color="pink" />
              Show All My Photos
        </IconButton>
        {error_msg}

        <div className="col-md">
          <span>Email</span>
          <hr />
          <Alert variant="success">
            {email}
          </Alert>
        </div>

        <div className="col-md">
          <span>Name</span>
          <hr />
          <Alert variant="warning">
            {name}
          </Alert>
        </div>
        

        <div className="col-md">
          <span>Description</span>
          <Button
            className="align-right-button"
            onClick={() => this.setState({ redirect: "./change_desc" })}
          >
            Modify Description
          </Button>
          <hr />
          <Alert
            variant="info"
          >
            {desc}
          </Alert>
        </div>

        <div className="col-md">
          <span>My Interests</span>
          <Button className="align-right-button">Add Interests</Button>
          <hr />
        </div>
        <div className="col-md">
          <div className="col-md row">{interest_name}</div>
        </div>
      </div>
    );
  }
}

function state2props(state) {
  return state.profile;
}

export default connect(state2props)(Profile);
