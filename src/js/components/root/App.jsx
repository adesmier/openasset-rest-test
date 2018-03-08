import React from 'react';

import Header from './Header';
import NavButton from 'components/reusable/NavButton';
import SideBar from 'components/sidebar/SideBar';

export default function App(props){
    return(
        <React.Fragment>
            <Header />
            <NavButton id="main-menu-btn"
                       targetId="auth-nav-sidebar"
                       classToggle="active" />
            <SideBar />
        </React.Fragment>
    )
}
