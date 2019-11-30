import React from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink, Redirect, withRouter,
} from "react-router-dom";
import { Navbar, Nav, Col } from "react-bootstrap";
import { Provider, connect } from "react-redux";
import Login from "./login";
import SignUp from "./signup";
import Profile from "./profile";
import AllPhotos from "./all_photos"
import store from "./store";
import { Index } from "./mock_page"
import Community from "./community"
import DebugRouter from "./debug_router"
import { get_friends } from "./ajax"
import { init_socket, init_chat } from "./socket";


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
    <DebugRouter>
      <Navbar bg="dark" variant="dark">
        <Col md = "10">
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
              <Nav.Item>
                <NavLink
                  to="/community"
                  activeClassName="active"
                  className="nav-link"
                >
                  Community
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
              <Index />
          </Route>
        <Route exact path="/login">
          <Login />

        </Route>

        <Route exact path="/sign_up">
          <SignUp />
        </Route>

        <Route exact path="/all_photos">
          <AllPhotos />
        </Route>

          <PrivateRoute path="/community">
              <Community />
          </PrivateRoute>

          {/* <PrivateRoute exact path="/community/:id">
              <Community />
          </PrivateRoute> */}

        <PrivateRoute exact path="/profile">
          <Profile />
        </PrivateRoute>

      </Switch>
    </DebugRouter>
  );
}

function PrivateRoute({ children, ...rest }) {
    let session = store.getState().session;
    return (
        <Route
            {...rest}
            render={( { location }) =>
                session  ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}


let Session = withRouter(connect(({session}) => ({session}))(({session, dispatch, history}) => {
  function logout(ev) {
    ev.preventDefault();
    localStorage.removeItem('session');
    dispatch({
      type: 'LOG_OUT',
    });
    history.push('/');
  }

  if (session) {
    
    let skt = init_socket(session);
    get_friends(skt);
    return (
        <Nav>
          <Nav.Item>
            <p className="text-light py-2">User: {session.user_name}</p>
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
}));



