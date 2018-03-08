import React from 'react';
import PropTypes from 'prop-types';


const DynamicButton = (props) => {

    let dynButton = null;
    const {classes, btnType, btnRef, width,
           clickHandler, btnDisabled, btnContent} = props;

    const handleClick = () => {
        dynButton.blur();
        clickHandler();
    }

    return(
        <button className={classes.concat(['button']).join(' ')}
                type={btnType}
                style={{width: width}}
                //manage button focus
                ref={(button) => {dynButton = button;}}
                onClick={handleClick}
                disabled={btnDisabled}>
                {btnContent}
        </button>
    )
}


DynamicButton.propTypes = {
    classes: PropTypes.array,
    btnType: PropTypes.string,
    btnRef: PropTypes.string,
    clickHandler: PropTypes.func,
    btnDisabled: PropTypes.bool,
    btnContent: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ])
}

DynamicButton.defaultProps = {
    classes: [],
    btnType: 'button',
    btnDisabled: 'false'
}

export default DynamicButton;
