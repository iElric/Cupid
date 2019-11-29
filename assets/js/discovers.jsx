import React from "react";
import { connect } from "react-redux";
import {change_location, load_ppl_nearby} from "./ajax";


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
        let names = load_ppl_nearby(this.state.latitude, this.state.longitude)

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

                <div className="row">
                    <h1>Nearby PPL</h1>
                        {names}
                </div>
            </div>
        );
    }
}

function state2props(state) {
    return state.geolocation; // TODO: change this to discovers
}

export default connect(state2props)(Discovers);