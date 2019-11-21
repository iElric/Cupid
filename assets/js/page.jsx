import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { Provider, connect } from "react-redux";
import Login from "./login";
import SignUp from "./signup";
import Profile from "./profile";
import AllPhotos from "./all_photos"
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
              to="/profile"
              exact
              activeClassName="active"
              className="nav-link"
            >
              Profile
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

        <Route exact path="/all_photos">
          <AllPhotos />
        </Route>

        <Route exact path="/profile">
          <Profile />
        </Route>

      </Switch>
    </Router>
  );
}
