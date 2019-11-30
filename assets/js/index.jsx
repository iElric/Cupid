import React from "react";
import ReactDOM from "react-dom";
export default class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Cupid</h1>
        <p>Cupid is a location-based social, networking and dating Web application. This application is designed to connect users from different backgrounds but with the same interests together.</p>
        <h2>Profile</h2>
        <ul>
          <li>View basic information of yourself </li>
          <li>Upload a new photo</li>
          <li>Browse all your photos</li>
          <li>Change your self-description </li>
        </ul>
        <h2>Discover</h2>
        <ul>
          <li>View recommended users based on same interests or near distance </li>
          <li>Browse their uploaded photos</li>
          <li>Like or pass a recommended user, if two users both liked each other then they will become a match</li>
        </ul>
        <h2>Chat</h2>
        <ul>
          <li>Chat with your matches</li>
        </ul>
      </div>)
  }
}

