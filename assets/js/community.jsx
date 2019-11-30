import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink, withRouter, useRouteMatch
} from "react-router-dom";
import { connect } from 'react-redux';
import {Navbar, Nav, Row, InputGroup, FormControl, Button} from "react-bootstrap";
import * as _ from "lodash";
import store from "./store";



function Community(props) {
    let url = "/community";
    const friends = props.friends;
    let mbox = store.getState();
    let navs = _.map(
        friends, (f, index) => (
            <li key={"nav_"+index}>
                <Nav.Item>
                    <NavLink to={`${url}/${f.id}`} exact activeClassName="active" className="nav-link">
                        <div>
                            <Friend name={f.user.name}
                                    content={f.user.email}
                            />
                        </div>
                    </NavLink>
                </Nav.Item>
            </li>
        )
    );
    let routes = _.map(friends, (f, index) => (
        <Route
            key={"route_"+index}
            path={`${url}/${f.id}`}
            exact
            children={<ChatView 
                contents={mbox.get(f.id)} 
                />}
        />
        ));
    return (
            <Row>
            <Navbar bg="grey" variant="light" className="col-md-3 sidebar">
                <Nav>
                    <ul className="nav flex-column">
                        { navs }
                    </ul>
                </Nav>
            </Navbar>

            <div className="col-md-9 border padding margin-top">
                <Switch>
                    { routes }
                </Switch>
                
                <Input />
            </div>
            </Row>

    );
}

// Component to display a single friend
function Friend(props) {
    return (
        <div>
            <div className="error-input">{props.name}</div>
            <div>{ props.content }</div>
        </div>
    );
}


// Component for the box containing all the chat contents
function ChatView(props) {
    // expected format for props.mbox
    let mock = [{name: "tom", msg: "hello"}, 
    {name: "alice", msg: "hello!"}, 
    {name: "tom", msg: "let's talke"}]
    let msgs = _.map(
        mock, (msg, index) => (
            <Message 
                key={"msg_" + index} 
                name={msg.name} 
                msg={msg.msg} />
        )
    );
    return (
        <div className="chat-view border margin-top">
            { msgs }
        </div>
    );
}


// Component for the input box
function Input(props) {
    return (
        <InputGroup className="mb-3">
            <FormControl 
                as="textarea"
                rows="2"
                placeholder="Send a Message"
            />
            <InputGroup.Append>
                <Button variant="outline-secondary"><div>Send</div><div className="small-font">Or Press Clrt + Enter</div></Button>
            </InputGroup.Append>
        </InputGroup>
    );
}

// Component for a single message
function Message(props) {
    return (
        <div className="row">
            <div className="col-sm-2">{ props.name } :</div>
            <div className="col-sm-8">{ props.msg }</div>
        </div>
    );
}


export default withRouter(connect(({friends, msg_box}) => ({friends, msg_box}))(Community));