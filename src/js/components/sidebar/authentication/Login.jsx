import React from 'react';
import PropTypes from 'prop-types';

import LoginForm from './LoginForm';


const Login = props => {
    return(
        <section id="sidebar-auth">
            <h5>Authenticate to your OpenAsset Instance</h5>
            <LoginForm {...props}/>
        </section>
    )
}


Login.propTypes = {
    session: PropTypes.object.isRequired,
    query:   PropTypes.object.isRequired
}


export default Login;
