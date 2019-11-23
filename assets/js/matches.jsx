import React from "react";
import ReactDOM from "react-dom";

import { connect } from "react-redux";
import { ListGroupItem, Button } from "react-bootstrap";

import { show_all_matches } from "./ajax";

class Matches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }

  changed(data) {
    this.props.dispatch({
      type: "MATCHES",
      data: {
        selected: data
      }
    });
  }

  render() {
    let { matches, selected } = this.props;
    if (matches == null) {
      show_all_matches();
      return <p>Loading</p>;
    }

    let chat = null;
    if (selected) {
      chat = (
        <div className="col">
          <div id="chat" className="overflow-auto">{selected}</div>
          <div id="chatInput">
            <textarea id="chatText"placeholder="type here"></textarea>
            <Button id="chatSend">Send</Button>
          </div>
        </div>
      );
    }

    let names = matches.map(x => (
      <ListGroupItem key={x.id} onClick={() => this.changed(x.id)} action>
        {x.name}
      </ListGroupItem>
    ));

    return (
      <div>
        <div className="row">
          <div className="col-4 overflow-auto">
            <h1>Friends</h1>
            {names}
          </div>
          <div className="col-5">{chat}</div>
        </div>
      </div>
    );
  }
}

function state2props(state) {
  return state.matches;
}

export default connect(state2props)(Matches);
