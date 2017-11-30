import React from 'react';

import Header from './Header.jsx';
import NavButton from './NavButton.jsx';
import SideBar from './SideBar.jsx';

export default function App(props){
    return(
        <React.Fragment>
            <Header />
            <NavButton id="main-menu-btn"
                       targetId="auth-nav-sidebar"
                       classToggle="active"
                       addClassBar1=""
                       addClassBar2=""
                       addClassBar3="" />
            <SideBar />
        </React.Fragment>
    )
}
