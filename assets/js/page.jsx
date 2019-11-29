import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import { Navbar, Nav, Col } from "react-bootstrap";
import { Provider, connect } from "react-redux";
import Login from "./login";
import SignUp from "./signup";
import Profile from "./profile";
import AllPhotos from "./all_photos"
import UploadNewPhoto from "./upload"
import Matches from './matches'
import AddTag from './add_tag'
import Users from "./users"
import ChangeDesc from "./change_desc"
import store from "./store";
import { FaHeartbeat, FaHome , FaRegUser, FaRegComment} from "react-icons/fa";

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
      <Navbar bg="light" variant="primary">
        <Col md = "10">
            <Nav>
              <Nav.Item>
                <NavLink to="/" exact activeClassName="active" className="nav-link">
                  <FaHome /> Home
                </NavLink>
              </Nav.Item>
                <Nav.Item>
                    <NavLink
                        to="/profile"
                        exact
                        activeClassName="active"
                        className="nav-link"
                    >
                        < FaRegUser/>Profile
                    </NavLink>
                </Nav.Item>
              <Nav.Item>
                <NavLink
                  to="/users"
                  exact
                  activeClassName="active"
                  className="nav-link"
                >
                  <FaHeartbeat />Users
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink
                  to="/matches"
                  exact
                  activeClassName="active"
                  className="nav-link"
                >
                  <FaRegComment/>Friends
                </NavLink>
              </Nav.Item>
            </Nav>
        </Col>
          <Col md = "2">
              <Session />
          </Col>
      </Navbar>

      <Switch>
          <Route exact path="/">
              <h1>This is the index page of Cupid</h1>
          </Route>
        <Route exact path="/login">
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

        <Route exact path="/upload_new_photo">
          <UploadNewPhoto />
        </Route>
        <Route exact path="/matches">
          <Matches />
        </Route>

        <Route exact path="/add_tags">
          <AddTag />
        </Route>

        <Route exact path="/users">
          <Users />
        </Route>

        <Route exact path="/change_desc">
          <ChangeDesc />
        </Route>

      </Switch>
    </Router>
  );
}

function PrivateRoute() {

}


let Session = connect(({session}) => ({session}))(({session, dispatch}) => {
  function logout(ev) {
    ev.preventDefault();
    localStorage.removeItem('session');
    dispatch({
      type: 'LOG_OUT',
    });
  }

  if (session) {
    return (
        <Nav>
          <Nav.Item>
            <p className="nav-link py-2">{session.user_name}</p>
          </Nav.Item>
          <Nav.Item>
            <a className="nav-link" href="#" onClick={logout}>Logout</a>
          </Nav.Item>
        </Nav>
    );
  }
  else {
    return (
        <Nav>
          <Nav.Item>
            <NavLink to="/login" exact activeClassName="active" className="nav-link">
              Login
            </NavLink>
          </Nav.Item>
        </Nav>
    );
  }
});