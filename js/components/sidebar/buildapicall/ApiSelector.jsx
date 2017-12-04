import React from 'react';
import PropTypes from 'prop-types';

import {OA_API_ENDPOINTS} from 'scripts/Constants';
import DynamicButton from 'components/reusable/DynamicButton';
import ApiCallDisplay from './ApiCallDisplay';
import Header from './Header';


export default class ApiSelector extends React.Component{

    static propTypes = {
        oaBaseUrl: PropTypes.string
    }

    componentDidMount(){
        window.CustomScroll.toElement('api-header', 'smooth', 'start');
    }

    renderEndpointOptions = (endpoint) => {

    }


    render(){
        return(
            <React.Fragment>
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
                <p>sdfsdfsdf</p>
                <p>sdfsdfsdf</p>
                <p>sdfsdfsdf</p>
                <p>sdfsdfsdf</p>
                <p>sdfsdfsdf</p>
                <p>sdfsdfsdf</p>
                <p>sdfsdfsdf</p>
                <p>sdfsdfsdf</p>
                <p>sdfsdfsdf</p>
                <p>sdfsdfsdf</p>
                <p>sdfsdfsdf</p>
                <p>sdfsdfsdf</p>
                <p>sdfsdfsdf</p>
            </React.Fragment>
        )
    }


}
