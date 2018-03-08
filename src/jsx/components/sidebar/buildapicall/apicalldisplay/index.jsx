import React from 'react';
//import PropTypes from 'prop-types';

import {BASE_REST_URL} from 'scripts/constants';

import Styles from './styles.scss';


const ApiCallDisplay = props => {

    const { oaBaseUrl, query } = props;
    const { endpointUrl } = query;

    let fullUrl = oaBaseUrl + BASE_REST_URL + endpointUrl;

    return(
        <React.Fragment>
            <h6>Current Call URL:</h6>
            <p id={Styles.apiCurrentCall}><strong><em>{fullUrl}</em></strong></p>
        </React.Fragment>
    )

}

// ApiCallDisplay.propTypes = {
//     oaBaseUrl: PropTypes.string
// }

export default ApiCallDisplay;



// export default class ApiCallDisplay extends React.Component {

//     // state = {};

//     // static propTypes = {
//     //     oaBaseUrl: PropTypes.string
//     // }

//     // componentWillMount(){
//     //     ApiCallStore.on('change', () => {
//     //         let apiCall = ApiCallStore.getApiCall();
//     //         this.setState({
//     //             apiCall: apiCall
//     //         });
//     //     });
//     // }

//     render() {
//         const {oaBaseUrl} = this.props;
//         let fullUrl; let endpointUrl;

//         if(this.state.apiCall && this.state.apiCall.endpointUrl){
//             endpointUrl = this.state.apiCall.endpointUrl;
//             fullUrl = oaBaseUrl + BASE_REST_URL + endpointUrl;
//         } else {
//             fullUrl = oaBaseUrl + BASE_REST_URL;
//         }


//         return(
//             <React.Fragment>
//                 <h6>Current Call URL:</h6>
//                 <p id="api-current-call"><strong><em>{fullUrl}</em></strong></p>
//             </React.Fragment>
//         )
//     }
// }




