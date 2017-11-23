import React from 'react';

import NavButton from './NavButton.jsx';
import Header from './Header.jsx';
import Login from './Login.jsx';

const SideBar = (props) => {

    return(
        <aside id="auth-nav-sidebar" className="auth-nav-sidebar">
            <NavButton targetId="auth-nav-sidebar"
                       classToggle="active"
                       addClassBar1="aside-bar1"
                       addClassBar2="aside-bar2"
                       addClassBar3="aside-bar3" />
            <Login />
        </aside>
    );
    
};

SideBar.propTypes = {

}

SideBar.defaultProps = {

}

export default SideBar;
