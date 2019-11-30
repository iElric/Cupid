import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink, withRouter, useRouteMatch
} from "react-router-dom";
import {Navbar, Nav, Row, InputGroup, FormControl, Button} from "react-bootstrap";
import * as _ from "lodash";


const friends = [
    {
        path: "/1",
        exact: true,
        content: () => <div>Rover is talking</div>
    }, {
        path: "/2",
        exact: true,
        content: () => <div>Lily is talking</div>
    }, {
        path: "/3",
        exact: true,
        content: () => <Message name="I" msg="I am talk" />
    }
];

function Community() {
    let url = "/community";
    return (

            <Row>
            <Navbar bg="grey" variant="light" className="col-md-3 sidebar">
                <Nav>
                    <ul className="nav flex-column">
                        <li>
                            <Nav.Item>
                                <NavLink to={`${url}/1`} exact activeClassName="active" className="nav-link">
                                    <div>
                                        <Friend name="Luhu"
                                                content="I am talking about this!"
                                        />
                                    </div>
                                </NavLink>
                            </Nav.Item>
                        </li>

                        <li>
                            <Nav.Item>
                                <NavLink to={`${url}/2`} exact activeClassName="active" className="nav-link">
                                    <div>
                                        <Friend name="Lily"
                                                content="I am talking about this!"
                                        />
                                    </div>
                                </NavLink>
                            </Nav.Item>
                        </li>

                        <li>
                            <Nav.Item>
                                <NavLink to={`${url}/3`} exact activeClassName="active" className="nav-link">
                                    <div>
                                        <Friend name="Sikang"
                                                content="I am talking about this!"
                                        />
                                    </div>
                                </NavLink>
                            </Nav.Item>
                        </li>
                    </ul>
                </Nav>

            </Navbar>

            <div className="col-md-9 border padding margin-top">
                <Switch>
                    {_.map(friends, (friend, index) => (
                        <Route
                            key={index}
                            path={`${url}${friend.path}`}
                            exact={friend.exact}
                            children={<ChatView 
                                contents={friend.content} 
                                />}
                        />
                        ))}
                </Switch>
                
                <Input />
            </div>
            </Row>

    );
}

function Friend(props) {
    return (
        <div>
            <div className="error-input">{props.name}</div>
            <div>{ props.content }</div>
        </div>
    );
}

function ChatView(props) {
    return (
        <div className="chat-view border">
            <props.contents />
        </div>
    );
}

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

function Message(props) {
    return (
        <div className="row">
            <div className="col-sm-2">{ props.name }</div>
            <div className="col-sm-8">{ props.msg }</div>
        </div>
    );
}



export default withRouter(Community);