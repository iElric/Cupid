import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Link
} from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { Provider, connect } from "react-redux";
import Login from "./login";
import SignUp from "./signup";
import store from "./store";

export default function init_page(root) {
  let tree = (
    <Provider store={store}>
      <Page />
    </Provider>
  );
  ReactDOM.render(tree, root);
}

function Page(props) {
  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Nav>
          <Nav.Item>
            <NavLink to="/" exact activeClassName="active" className="nav-link">
              Home
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink
              to="/users"
              exact
              activeClassName="active"
              className="nav-link"
            >
              Users
            </NavLink>
          </Nav.Item>
        </Nav>
      </Navbar>

      <Switch>
        <Route exact path="/">
          <Login />
          <NavLink
            to="/sign_up"
            exact
            activeClassName="active"
            className="nav-link"
          >
           Don't have an account? Sign Up Now!
          </NavLink>
        </Route>

        <Route exact path="/sign_up">
          <SignUp />
        </Route>

      </Switch>
    </Router>
  );
}
