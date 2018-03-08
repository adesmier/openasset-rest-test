import React from 'react';
import { connect } from 'react-redux';
//import PropTypes from 'prop-types';

import DynamicButton from 'components/reusable/DynamicButton';
import ApiCallDisplay from './ApiCallDisplay';
import Header from './Header';
import Endpoint from './Endpoint'
import { endpointSelected } from 'redux/actions/queryActions'

import {OA_API_ENDPOINTS} from 'scripts/constants';


const mapDispatchToProps = dispatch => ({
    endpointSelected: payload => dispatch(endpointSelected(payload))
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
        //const {renderedEndpoint} = this.state;
        const { oaBaseUrl, query, endpointSelected } = this.props;

        return(
            <section id="sidebar-api">
                <Header />
                <ApiCallDisplay oaBaseUrl={oaBaseUrl}
                                query={query} />
                <span><em>What information do you wish to retrieve from
                          OpenAsset?</em></span>
                <div id="rest-noun-btn-wrapper">

                {OA_API_ENDPOINTS.map((endpoint) => <DynamicButton key={endpoint}
                            btnDisabled={false}
                            width="200px"
                            clickHandler={() => endpointSelected({endpoint})}
                            btnContent={endpoint} />)}

                </div>
                {query.endpoint &&
                    <Endpoint query={query} />
                }
            </section>
        )
    }
}


const ApiSelector = connect(null, mapDispatchToProps)(ConnectedApiSelector);

export default ApiSelector;
