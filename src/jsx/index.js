import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from 'redux/store/index';
import App from 'components/root/App';


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('react-app')
);
