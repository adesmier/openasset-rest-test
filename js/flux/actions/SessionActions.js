import Dispatcher from '../Dispatcher.js';
import {FLUX_ACTIONS} from '../../scripts/Constants.js';
import SessionCache from '../scripts/SessionCache.js';

export function checkSession(localStoreName){
    let sessionData = SessionCache.getSessionData(localStoreName);

    if(sessionData){
        let user = ''; let username = '';
        let url = ''; let session = '';

        if(sessionData.headers && sessionData.headers['x-sessionkey']){
            session = sessionData.headers['x-sessionkey'];
            if(sessionData.oaUrl){
                url = sessionData.oaUrl;
                if(sessionData.data[0]){
                    user = sessionData.data[0].full_name;
                    username = sessionData.data[0].username;
                }
            }
        } else {
            console.error('There is no session key stored in the cached session data');
            return;
        }
    } else {
        Dispatcher.dispatch({
            actionType: FLUX_ACTIONS.CHECK_SESSION,
            payload: {
                username: '',
                key: '',
                status: 'You don\'t have an active session. Please log in:',
            }
        });
    }

    



}
