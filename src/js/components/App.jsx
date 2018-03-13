import React from 'react';

import NavButton from 'components/reusable/NavButton';
import SideBar from 'components/sidebar/SideBar';

export default function App(props){
    return(
        <React.Fragment>
            <h1>OpenAsset</h1>
            <p>Use this tool to test out some example OpenAsset Rest API calls to your OpenAsset instance</p>
            <NavButton id="main-menu-btn"
                       targetId="auth-nav-sidebar"
                       classToggle="active" />
            <SideBar />
        </React.Fragment>
    )
}
