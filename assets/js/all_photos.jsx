import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { Form, Button, Alert} from 'react-bootstrap';
import { Redirect } from 'react-router';

//import { submit_login } from './ajax';

class AllPhotos extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
        };
    }

    redirect(path) {
        this.setState({
            redirect: path,
        });
    }

    changed(data) {
        this.props.dispatch({
            type: 'SHOW_PROFILE',
            data: data,
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        console.log("all_photos");

        let { email, name, new_photo, all_photos, errors } = this.props;
        let error_msg = null;
        if (errors) {
            error_msg = <Alert variant="danger">{ errors }</Alert>
        }
        return (
            <div>
              <h1>All Photos</h1>
              
            </div>
          );
    }
}

function state2props(state) {
    return state.profile;
}

export default connect(state2props)(AllPhotos);