import React from 'react';

import LoginForm from './LoginForm';

export default function Login(props){
    return(
        <section id="sidebar-auth">
            <h5>Authenticate to your OpenAsset Instance</h5>
            <LoginForm />
        </section>
    )
}
