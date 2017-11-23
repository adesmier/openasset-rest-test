import React from 'react';

import Header from './Header.jsx';
import NavButton from './NavButton.jsx';
import SideBar from './SideBar.jsx';

export default function App(props){
    return[
        <Header />,
        <NavButton targetId="auth-nav-sidebar"
                   classToggle="active"
                   addClassBar1=""
                   addClassBar2=""
                   addClassBar3="" />,
        <SideBar />
    ];
}