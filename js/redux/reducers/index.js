import { combineReducers } from 'redux';

import sessionReducer from './sessionReducer';
import queryReducer from './queryReducer';


const rootReducer = combineReducers({
    session: sessionReducer,
    query: queryReducer
});

export default rootReducer;
