import { REDUX_ACTIONS } from 'scripts/constants';


/** 
 * REDUX SESSION - ACTIONS
 */

export const updateQuery = payload => {
    type: REDUX_ACTIONS.UPDATE_QUERY,
    payload
}
