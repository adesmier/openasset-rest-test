import React from 'react';
import PropTypes from 'prop-types';

import DynamicButton from 'components/reusable/DynamicButton';


const Header = () => {

    let btnContent = (
        <span>
            Make the Call <i className="fa fa-phone"></i>
        </span>
    );

    return(
        <div id="build-api-header-wrapper">
            <h5 id="api-header">Build your API Call</h5>
            <DynamicButton classes={['button-primary']}
                           btnDisabled={true}
                           width="200px"
                           btnContent={btnContent} />
        </div>
    )

}

export default Header;

