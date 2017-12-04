import React from 'react';
import PropTypes from 'prop-types';

import {BASE_REST_URL} from 'scripts/Constants';


const ApiCallDisplay = (props) => {

    const {oaBaseUrl} = props;
    let fullUrl = oaBaseUrl + BASE_REST_URL;

    return(
        <React.Fragment>
            <h6>Current Call URL:</h6>
            <p><strong><em>{fullUrl}</em></strong></p>
        </React.Fragment>
    )

}

ApiCallDisplay.propTypes = {
    oaBaseUrl: PropTypes.string
}

export default ApiCallDisplay;

