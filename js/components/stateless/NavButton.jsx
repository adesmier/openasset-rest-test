import React from 'react';
import PropTypes from 'prop-types';

const NavButton = (props) => {

    const {targetId, classToggle, addClassBar1, addClassBar2, addClassBar3} = props;

    return(
        <nav id="main-menu-btn" onClick={() => {window.ClassModifier.toggleClass(targetId, classToggle)}}>
            <div className={['menu-bar', addClassBar1].join(' ')}></div>
            <div className={['menu-bar', addClassBar2].join(' ')}></div>
            <div className={['menu-bar', addClassBar3].join(' ')}></div>
        </nav>
    );
    
};

NavButton.PropTypes = {
    targetId: PropTypes.string,
    classToggle: PropTypes.string,
    addClassBar1: PropTypes.string,
    addClassBar2: PropTypes.string,
    addClassBar3: PropTypes.string
}

NavButton.defaultProps = {
    addClassBar1: '',
    addClassBar2: '',
    addClassBar3: ''
}

export default NavButton;
