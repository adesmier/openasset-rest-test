import React from 'react';

import Header from './stateless/Header.jsx';
import Login from './Login.jsx';

export default function App(props){
    return(
        <div>
            <Header />
            <Login text="Hello there" />
        </div>
    )
}