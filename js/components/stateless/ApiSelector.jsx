import React from 'react';
import PropTypes from 'prop-types';

import LoginForm from '../LoginForm.jsx';
import DynamicButton from '../reusable/DynamicButton.jsx'
import ApiCallDisplay from './ApiCallDisplay.jsx'

const ApiSelector = (props) => {

    return(
        <React.Fragment>
            <h5>Build your API Call</h5>
            <ApiCallDisplay oaBaseUrl={props.oaBaseUrl} />
            <span><em>What information do you wish to retrieve from OpenAsset?</em></span>
            <div id="rest-noun-btn-wrapper">
                <DynamicButton btnDisabled={false} width="200px" btnContent="Projects" />
                <DynamicButton btnDisabled={false} width="200px" btnContent="Files" />
                <DynamicButton btnDisabled={false} width="200px" btnContent="Keywords" />
                <DynamicButton btnDisabled={false} width="200px" btnContent="Albums" />
            </div>
        </React.Fragment>
    )

}

ApiSelector.propTypes = {
    oaBaseUrl: PropTypes.string
}

export default ApiSelector;
