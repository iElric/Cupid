import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink, withRouter, useRouteMatch
} from "react-router-dom";
import {Navbar, Nav, Row} from "react-bootstrap";
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
        content: () => <div>I am talking</div>
    }
];

function Community() {
    let { url } = useRouteMatch();
    return (
        <Router>
            <Row>
            <Navbar bg="grey" variant="light" className="col-md-2 sidebar">
                <Nav>
                    <ul className="nav flex-column">
                        <li>
                            <Nav.Item>
                                <NavLink to="community/1" exact activeClassName="active" className="nav-link">
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
                                <NavLink to="./2" exact activeClassName="active" className="nav-link">
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
                                <NavLink to="./3" exact activeClassName="active" className="nav-link">
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

            <div className="col-md-10">
                <Switch>
                    {_.map(friends, (friend, index) => (
                        <Route
                            key={index}
                            path={`${url}${friend.path}`}
                            exact={friend.exact}
                            children={<friend.content />}
                        />
                        ))}
                </Switch>
            </div>
            </Row>
        </Router>

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



export default withRouter(Community);