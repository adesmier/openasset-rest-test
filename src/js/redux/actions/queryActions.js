import { REDUX_ACTIONS } from 'scripts/constants';

import {COMMON_CALLS} from 'scripts/constants'


/** 
 * REDUX SESSION - ACTIONS
 */

const updateQuery = payload => ({
    type: REDUX_ACTIONS.UPDATE_QUERY,
    payload
});

const addParameter = payload => ({
    type: REDUX_ACTIONS.ADD_PARAMETER,
    payload
});


/**
 * REDUX SESSION - ACTION CREATORS
 */

export const endpointSelected = endpoint => {
    return dispatch => {
        let payload = {
            endpoint,
            endpointUrl: endpoint + '/'
        }
        dispatch(updateQuery(payload));
    };
}

export const updateParameters = (endpoint, params) => {
    return dispatch => {

        let endpointUCase = endpoint.toUpperCase();
        let endpointCalls = COMMON_CALLS[endpointUCase];

        let paramUrl = endpointCalls.find(call => {
            return call.TITLE === params;
        });

        dispatch(addParameter(paramUrl.URL));
    };
}
