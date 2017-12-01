import React from 'react';

import SessionStore from '../../flux/stores/SessionStore.js'

import NavButton from './NavButton.jsx';
import Header from './Header.jsx';
import Login from './Login.jsx';
import ApiSelector from './ApiSelector.jsx';


export default class SideBar extends React.Component{

    state = {
        loginCode: 0
    };
    
    componentWillMount(){
        SessionStore.on('change', () => {
            let session = SessionStore.getSession();
            this.setState({
                baseUrl: session.url,
                loginCode: session.loginStatus.code
            });
        });
    }

    componentWillUnmount(){
        SessionStore.removeListener('change', () => {
            console.log('Change listener removed from SideBar component')
        });
    }

    render(){

        const {baseUrl, loginCode} = this.state;

        return(
            <aside id="auth-nav-sidebar" className="auth-nav-sidebar active">
                <NavButton id="aside-menu-btn"
                           targetId="auth-nav-sidebar"
                           classToggle="active"
                           addClassBar1="aside-bar1"
                           addClassBar2="aside-bar2"
                           addClassBar3="aside-bar3" />
                <Login />
                {loginCode === 2 &&
                    <ApiSelector oaBaseUrl={baseUrl} />
                }
            </aside>
        )
    }
}
