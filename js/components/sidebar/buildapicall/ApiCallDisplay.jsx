import React from 'react';
import PropTypes from 'prop-types';

import ApiCallStore from 'flux/stores/ApiCallStore';
import {BASE_REST_URL} from 'scripts/Constants';


export default class ApiCallDisplay extends React.Component {

    state = {};

    static propTypes = {
        oaBaseUrl: PropTypes.string
    }

    componentWillMount(){
        ApiCallStore.on('change', () => {
            let apiCall = ApiCallStore.getApiCall();
            this.setState({
                apiCall: apiCall
            });
        });
    }

    render() {
        const {oaBaseUrl} = this.props;
        let fullUrl; let endpointUrl;

        if(this.state.apiCall && this.state.apiCall.endpointUrl){
            endpointUrl = this.state.apiCall.endpointUrl;
            fullUrl = oaBaseUrl + BASE_REST_URL + endpointUrl;
        } else {
            fullUrl = oaBaseUrl + BASE_REST_URL;
        }


        return(
            <React.Fragment>
                <h6>Current Call URL:</h6>
                <p id="api-current-call"><strong><em>{fullUrl}</em></strong></p>
            </React.Fragment>
        )
    }
}


// const ApiCallDisplay = (props) => {

//     const {oaBaseUrl} = props;
//     let fullUrl = oaBaseUrl + BASE_REST_URL;

//     return(
//         <React.Fragment>
//             <h6>Current Call URL:</h6>
//             <p id="api-current-call"><strong><em>{fullUrl}</em></strong></p>
//         </React.Fragment>
//     )

// }

// ApiCallDisplay.propTypes = {
//     oaBaseUrl: PropTypes.string
// }

// export default ApiCallDisplay;

