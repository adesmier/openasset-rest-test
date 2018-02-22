import React from 'react';
import PropTypes from 'prop-types';

import * as ApiCallActions from 'flux/actions/ApiCallActions'

import {OA_API_ENDPOINTS} from 'scripts/Constants';
import DynamicButton from 'components/reusable/DynamicButton';
import ApiCallDisplay from './ApiCallDisplay';
import Header from './Header';

import Endpoint from './Endpoint'


export default class ApiSelector extends React.Component{

    state = {
        renderedEndpoint: null
    }

    static propTypes = {
        oaBaseUrl: PropTypes.string
    }

    componentDidMount(){
        const {oaBaseUrl} = this.props;
        window.CustomScroll.toElement('api-header', 'smooth', 'start');
    }

    renderEndpointOptions = (apiEndpoint) => {
        ApiCallActions.setEndpoint(apiEndpoint);
    }


    render(){
        const {renderedEndpoint} = this.state;

        return(
            <section id="sidebar-api">
                <Header />
                <ApiCallDisplay oaBaseUrl={this.props.oaBaseUrl} />
                <span><em>What information do you wish to retrieve from
                          OpenAsset?</em></span>
                <div id="rest-noun-btn-wrapper">

                    {OA_API_ENDPOINTS.map((item) => <DynamicButton key={item}
                                btnDisabled={false}
                                width="200px"
                                clickHandler={() => this.renderEndpointOptions(item)}
                                btnContent={item} />)}

                </div>
                <Endpoint />
            </section>
        )
    }


}
