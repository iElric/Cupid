import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import {show_all_photos} from './ajax';
import PhotoCard from './card';

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

        let {photos, desc, errors } = this.props;
        let error_msg = null;
        if (errors) {
            error_msg = <Alert variant="danger">{ errors }</Alert>
        }
        if (photos == null) {
            show_all_photos();
            return <p>Loading</p>
        }

        let photo = photos.map(x => <PhotoCard photo={x}/>)
        return (
            <div>
                {error_msg}
              <h1>All Photos</h1>
              {photo}
            </div>
          );
    }
}

function state2props(state) {
    return state.all_photos;
}

export default connect(state2props)(AllPhotos);