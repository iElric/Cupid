import React from "react";
import { connect } from "react-redux";
import {change_location} from "./ajax";


class Discovers extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
        };
    }

    showPosition(callback) {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                let positionInfo = "Your current position is (" + "Latitude: " + position.coords.latitude + ", "
                    + "Longitude: " + position.coords.longitude + ")";
                document.getElementById("result").innerHTML = positionInfo;
                callback(position.coords.latitude, position.coords.longitude)
            });
        } else {
            alert("Sorry, your browser does not support HTML5 geolocation.");
        }
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col">
                        <h1>Discover People Nearby </h1>
                    </div>
                </div>
                <div id="result">
                </div>
                <button type="button" onClick={this.showPosition(change_location)}>Show Position</button>
            </div>
        );
    }
}

function state2props(state) {
    return state.geolocation; // TODO: change this to discovers
}

export default connect(state2props)(Discovers);