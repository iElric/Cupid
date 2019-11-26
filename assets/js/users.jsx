import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Card } from "react-bootstrap";
import { Redirect } from "react-router";
import { FaSmile, FaSadTear, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { IconButton } from "@material-ui/core";
import { get_recommendation } from "./ajax";
//import { submit_login } from './ajax';

class Users extends React.Component {
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
      type: "USERS",
      data: data
    });
  }
  clickIcon() {
    alert("click icon");
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    let { info } = this.props;
    if (info == null) {
      get_recommendation();
      return <p>Loading</p>;
    }
    console.log(info);
    let photo_info = info[0].photo;
    return (
      <div>
        <div className="row" id="users">
          <div className="col-2" id="left_arrow">
            <IconButton onClick={() => this.clickIcon()}>
              <FaArrowLeft size="3em" color="pink" />
            </IconButton>
          </div>
          <div className="col-4">
            <div className="row">
              <Card style={{ width: "20rem", height: "35rem" }}>
                <Card.Header id="user_name">Name</Card.Header>
                <Card.Img height="80%" src={photo_info} />
                <Card.Body id="user_text">
                  <Card.Text>{info[0].desc}</Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div className="row">
              <IconButton onClick={() => this.clickIcon()}>
                <FaSadTear size="3em" color="light-blue" />
                Pass
              </IconButton>
              <IconButton onClick={() => this.clickIcon()}>
                <FaSmile id="smile" size="3em" />
                Like
              </IconButton>
            </div>
          </div>
          <div className="col-1" id="right_arrow">
            <IconButton onClick={() => this.clickIcon()}>
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
