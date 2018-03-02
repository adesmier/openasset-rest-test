import Dispatcher from '../Dispatcher.js';
import {OA_LOCAL_STORE_NAME, FLUX_ACTIONS} from '../../scripts/Constants.js';
import SessionCache from '../../scripts/SessionCache.js';
import ApiReq from '../../scripts/ApiRequester.js';

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
            console.error(`There is no session key stored in 
                           the cached session data`);
            return;
        }

        //check if stored key is still valid
        ApiReq.authenticate(true, url, username, session).then(response => {

            if(response.data.error_message && response.status === 401){
                Dispatcher.dispatch({
                    actionType: FLUX_ACTIONS.SESSION_NOT_VALID,
                    payload: {
                        message: `Welcome back ${user}. Your previous 
                                  session has expired. Please log in again.`
                    }
                });
            } else if(response.status === 200){
                Dispatcher.dispatch({
                    actionType: FLUX_ACTIONS.SESSION_STILL_VALID,
                    payload: {
                        fullName: user,
                        key: session,
                        url: url,
                        message: `Welcome back ${user}. Your previous session
                                  is still active. No need to login.`,
                        loginStatus: {
                            code: 2,
                            message: `Authentication successful: Using existing
                                      session Key ${session}`,
                            class: 'success'
                        }
                    }
                });
            }
            
        }).catch(error => { //general error e.g. not internet connection
            console.error(error);
        });

    } else {
        Dispatcher.dispatch({
            actionType: FLUX_ACTIONS.SESSION_NOT_VALID,
            payload: {
                message: 'You don\'t have an active session. Please log in:'
            }
        });
    }
}

export function pendingLogin(){
    Dispatcher.dispatch({
        actionType: FLUX_ACTIONS.LOGIN_PENDING,
        payload: {
            loginStatus: {
                code: 1,
                message: '',
                class: ''
            },
        }
    });
}

export function login(credentials){
    ApiReq.authenticate(false, credentials.oaUrl.value,
        credentials.oaUsername.value,
        credentials.oaPassword.value).then(response => {

        if(response.status === 200){
            //session key saved in browser local storage for persistence
            SessionCache.setSessionData(OA_LOCAL_STORE_NAME,
                                        response,
                                        credentials.oaUrl.value);

            let key = response.headers['x-sessionkey'];
            Dispatcher.dispatch({
                actionType: FLUX_ACTIONS.LOGIN_SUCCESS,
                payload: {
                    fullName: '',
                    key: key,
                    url: credentials.oaUrl.value,
                    message: 'Authentication successful',
                    loginStatus: {
                        code: 2,
                        message: `Authentication successful: 
                                  Session Key ${key}`,
                        class: 'success'
                    }
                }
            });
        } else {
            Dispatcher.dispatch({
                actionType: FLUX_ACTIONS.LOGIN_FAILED,
                payload: {
                    loginStatus: {
                        code: 0,
                        message: `Authentication failed:
                                  ${response.data.error_message}`,
                        class: 'error'
                    }
                }
            });
        }

    }).catch(error => { //general network error
        console.error(error);
    });
}
