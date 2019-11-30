import React from "react";
import ReactDOM from "react-dom";
import { FaHeartbeat, FaHome, FaRegUser, FaRegComment } from "react-icons/fa";

export default class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>&#128144;Cupid  &#128149;&#128158;  </h1>
        <p>Cupid is a location-based social, networking and dating Web application. This application is designed to connect users from different backgrounds but with the same interests together.</p>
        <h3>< FaRegUser /> Profile</h3>
          <ul>
          <li>View basic information of yourself </li>
          <img src="https://cdn.pixabay.com/photo/2012/05/07/04/33/heart-47946_1280.png" height="300" width="570"
                   align="right"/>
          <li>Upload new photos</li>
          <li>Browse all your photos</li>
          <li>Change your self-description and interests </li>
        </ul>
        <h3>< FaHeartbeat /> Discover</h3>
        <ul>
          <li>View recommended users based on same interests or near distance </li>
          <li>Browse recommended users' photos and information</li>
          <li>Like or pass a suggested user</li>
          <li>If two users both liked each other then they will become a match</li>
        </ul>
        <h3>< FaRegComment /> Matches</h3>
        <ul>
          <li>View a list of matches</li>
          <li>Start chatting with your matches</li>
          <li>Read message history</li>
        </ul>
      </div>)
  }
}

