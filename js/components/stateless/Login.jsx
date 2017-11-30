import React from 'react';

import LoginForm from '../LoginForm.jsx';

export default function Login(props){
    return(
        <React.Fragment>
            <h5>Authenticate to your OpenAsset Instance</h5>
            <LoginForm />
        </React.Fragment>
    )
}
