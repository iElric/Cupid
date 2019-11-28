import React from "react";
import ReactDOM from "react-dom";

import { connect } from "react-redux";
import { ListGroupItem, Button } from "react-bootstrap";

import { show_all_matches } from "./ajax";


class Discovers extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            selected: null
        };
    }

    showPosition() {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                let positionInfo = "Your current position is (" + "Latitude: " + position.coords.latitude + ", "
                    + "Longitude: " + position.coords.longitude + ")";
                document.getElementById("result").innerHTML = positionInfo;
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
                <p> My Location: </p>
                <div id="result">
                </div>
                <button type="button" onClick={this.showPosition}>Show Position</button>
            </div>
        );
    }
}

function state2props(state) {
    return state.matches; // TODO: change this to discovers
}

export default connect(state2props)(Discovers);