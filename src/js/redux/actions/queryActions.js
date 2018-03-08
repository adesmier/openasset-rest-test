import { REDUX_ACTIONS } from 'scripts/constants';


/** 
 * REDUX SESSION - ACTIONS
 */

const updateQuery = payload => ({
    type: REDUX_ACTIONS.UPDATE_QUERY,
    payload
});


/**
 * REDUX SESSION - ACTION CREATORS
 */

export const endpointSelected = endpoint => {
    return dispatch => {
        dispatch(updateQuery(endpoint));
    };
}
