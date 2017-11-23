import React from 'react';

import LoginForm from '../LoginForm.jsx';

export default function Login(props){
    return[
        <h5>Authenticate to your OpenAsset Instance</h5>,
        <LoginForm />
    ];
}