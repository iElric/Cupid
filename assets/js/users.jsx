import React from "react";
import { connect } from "react-redux";
import { Card, Alert } from "react-bootstrap";
import { Redirect } from "react-router";
import { FaSmile, FaSadTear, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { IconButton } from "@material-ui/core";
import {
  get_my_interests_photo_by_id,
  get_recommendation,
  like_user
} from "./ajax";

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      errors: null
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: "USERS",
      data: { info: null, current_photos: null, user_index: 0, photo_index: 0, latitude: 0, longitude: 0 }
    });
  }

  redirect(path) {
    this.setState({
      redirect: path
    });
  }

  changed(data) {
    this.props.dispatch({
      type: "USERS",
      data: data
    });
  }

  nextPhoto() {
    let { current_photos, photo_index } = this.props;
    if (current_photos.length <= photo_index + 1) {
      this.setState({ errors: "This is the last photo of this user" });
    } else {
      photo_index = photo_index + 1;
      this.props.dispatch({
        type: "USERS",
        data: { photo_index: photo_index }
      });
      this.setState({ errors: null });
    }
  }

  previousPhoto() {
    let { photo_index } = this.props;
    if (photo_index === 0) {
      this.setState({ errors: "This is the first photo of this user" });
    } else {
      photo_index = photo_index - 1;
      this.props.dispatch({
        type: "USERS",
        data: { photo_index: photo_index }
      });
      this.setState({ errors: null });
    }
  }

  like() {
    let { info, user_index } = this.props;

    // db operation
    console.log(info[user_index].user_id);
    like_user(info[user_index].user_id);
    if (info.length <= user_index + 1) {
      this.setState({ errors: "This is the last recommended user" });
    } else {
      user_index = user_index + 1;
      this.props.dispatch({
        type: "USERS",
        data: { current_photos: null, user_index: user_index }
      });
      this.setState({ errors: null });
    }
  }

  dislike() {
    let { info, user_index } = this.props;
    if (info.length <= user_index + 1) {
      this.setState({ errors: "This is the last recommended user" });
      //alert("last recommend user");
    } else {
      user_index = user_index + 1;
      this.props.dispatch({
        type: "USERS",
        data: { current_photos: null, photo_index: 0, user_index: user_index }
      });
      this.setState({ errors: null });
    }
  }

  showPosition(callback) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        callback(position.coords.latitude, position.coords.longitude)
      });
    } else {
      // TODO: change alert
      alert("Sorry, your browser does not support HTML5 geolocation.");
    }
  }

  changeLongAndLat(latitude, longitude) {
    console.log(this);
    this.props.dispatch({
      type: "USERS",
      data: {latitude: latitude, longitude: longitude}
    })
  }




  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    console.log(this.props);

    this.showPosition(this.changeLongAndLat.bind(this));
    
    let { info, current_photos, user_index, photo_index} = this.props;
    if (info == null) {
      get_recommendation();
      return <p>Loading</p>;
    }

    if (info.length === 0) {
      return (
        <Alert variant="danger">
          {" "}
          Sorry, there is no recommended user for you now
        </Alert>
      );
    }

    if (current_photos == null) {
      get_my_interests_photo_by_id(info[user_index].user_id);
      return <p>Loading</p>;
    }

    let error_msg = null;
    if (this.state.errors) {
      error_msg = <Alert variant="danger">{this.state.errors}</Alert>;
    }

    let photo_info =
      current_photos.length === 0 ? "" : current_photos[photo_index].photo;
    let photo_desc =
      current_photos.length === 0 ? "" : current_photos[photo_index].desc;
    return (
      <div>
        {error_msg}
        <div className="row" id="users">
          <div className="col-3" id="left_arrow">
            <IconButton onClick={() => this.previousPhoto()}>
              <FaArrowLeft size="3em" color="pink" />
            </IconButton>
          </div>
          <div className="col-6">
            <div className="row">
              <div className="col-12 p-0">
                <Card>
                  <Card.Header id="user_name">
                    Name: {info[user_index].user_name}
                    <br />
                    Desc: {info[user_index].user_desc}
                  </Card.Header>
                  <Card.Img
                    id="image"
                    src={photo_info}
                    width="100px"
                    alt="This user doesn't have any photos"
                  />
                  <Card.Body id="user_text">
                    <Card.Text>{photo_desc}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </div>
            <div className="row" id="face_icons">
              <div className="col-6">
                <IconButton onClick={() => this.dislike()}>
                  <FaSadTear id="cry" size="3em" color="light-blue" />
                  Pass
                </IconButton>
              </div>
              <div className="col-6">
                <IconButton className="align-right-button" onClick={() => this.like()}>
                  <FaSmile id="smile" size="3em" />
                  Like
                </IconButton>
              </div>
            </div>
          </div>
          <div className="col-3" id="right_arrow">
            <IconButton onClick={() => this.nextPhoto()}>
              <FaArrowRight size="3em" color="pink" />
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
}

function state2props(state) {
  return state.users;
}

export default connect(state2props)(Users);
