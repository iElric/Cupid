import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import {show_all_photos} from './ajax';
import PhotoCard from './card';

//import { submit_login } from './ajax';

class AllPhotos extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch({
            type: "ALL_PHOTOS",
            data: {photos: null, errors: null}
          });
    }

    render() {

        let {photos, errors } = this.props;
        let error_msg = null;
        if (errors) {
            error_msg = <Alert variant="danger">{ errors }</Alert>
        }
        if (photos == null) {
            show_all_photos();
            return <p>Loading</p>
        }

        let photo = photos.map(x => <PhotoCard key= {x.id} photo={x}/>)
        return (
            <div>
                {error_msg}
              <h1>All Photos</h1>
              <div className="row">
              {photo}
              </div>
            </div>
          );
    }
}

function state2props(state) {
    return state.all_photos;
}

export default connect(state2props)(AllPhotos);