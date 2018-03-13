import React from 'react';
import PropTypes from 'prop-types';

import {BASE_REST_URL} from 'scripts/constants';


const ApiCallDisplay = props => {

    const { oaBaseUrl, query } = props;
    const { endpointUrl, parameters } = query;

    let fullUrl = oaBaseUrl + BASE_REST_URL + endpointUrl;

    return(
        <React.Fragment>
            <h6>Current Call URL:</h6>
            <p id="api-current-call"><strong><em>{fullUrl}</em></strong></p>
        </React.Fragment>
    )

}


ApiCallDisplay.propTypes = {
    oaBaseUrl: PropTypes.string.isRequired,
    query:     PropTypes.object.isRequired
}


export default ApiCallDisplay;
