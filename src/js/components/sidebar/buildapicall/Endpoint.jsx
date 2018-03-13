import React from 'react'
import PropTypes from 'prop-types';

import CommonCalls from './CommonCalls';


const Endpoint = props => (
    <section id="api-projects-endpoint">
        <h6>{props.query.endpoint}</h6>
        <CommonCalls endpoint={props.query.endpoint}
                        updateParams={props.updateParams} />
    </section>
);


Endpoint.proptypes = {
    query: PropTypes.object.isRequired,
    updateParams: PropTypes.func
}

export default Endpoint;

