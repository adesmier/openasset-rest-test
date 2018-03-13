import React from 'react';
import { connect } from 'react-redux';
//import PropTypes from 'prop-types';

import DynamicButton from 'components/reusable/DynamicButton';
import ApiCallDisplay from './ApiCallDisplay';
import Endpoint from './Endpoint'
import { endpointSelected, updateParameters } from 'redux/actions/queryActions'

import {OA_API_ENDPOINTS} from 'scripts/constants';


const mapDispatchToProps = dispatch => ({
    endpointSelected: payload => dispatch(endpointSelected(payload)),
    updateParameters: (endpoint, params) => dispatch(updateParameters(endpoint, params))
});


class ConnectedApiSelector extends React.Component{

    // state = {
    //     renderedEndpoint: null
    // }

    // static propTypes = {
    //     oaBaseUrl: PropTypes.string
    // }

    componentDidMount(){
        const {oaBaseUrl} = this.props;
        window.CustomScroll.toElement('api-header', 'smooth', 'start');
    }

    // renderEndpointOptions = (apiEndpoint) => {
    //     let payload = {}
    //     ApiCallActions.setEndpoint(apiEndpoint);
    // }


    render(){
        const { oaBaseUrl, 
                query,
                endpointSelected,
                updateParameters } = this.props;

        let btnContent = (
            <span>
                Make the Call <i className="fa fa-phone"></i>
            </span>
        );

        return(
            <section id="sidebar-api">
                <div id="build-api-header-wrapper">
                    <h5 id="api-header">Build your API Call</h5>
                    <DynamicButton classes={['button-primary']}
                            btnDisabled={true}
                            width="200px"
                            btnContent={btnContent} />
                </div>
                <ApiCallDisplay oaBaseUrl={oaBaseUrl}
                                query={query} />
                <span><em>What information do you wish to retrieve from
                          OpenAsset?</em></span>
                <div id="rest-noun-btn-wrapper">

                {OA_API_ENDPOINTS.map((endpoint) => <DynamicButton key={endpoint}
                            btnDisabled={false}
                            width="200px"
                            clickHandler={() => endpointSelected(endpoint)}
                            btnContent={endpoint} />)}

                </div>
                {query.endpoint &&
                    <Endpoint query={query} 
                              updateParams={updateParameters} />
                }
            </section>
        )
    }
}


const ApiSelector = connect(null, mapDispatchToProps)(ConnectedApiSelector);

export default ApiSelector;
