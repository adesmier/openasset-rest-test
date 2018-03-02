import { OA_LOCAL_STORE_NAME, REDUX_ACTIONS } from 'scripts/constants';
import SessionCache from 'scripts/sessionCache.js';
import ApiReq from 'scripts/apiRequester.js';


/** 
 * REDUX SESSION - ACTIONS
 */

export const sessionNotValid = message => ({
    type: REDUX_ACTIONS.SESSION_NOT_VALID,
    payload: { message }
});

export const sessionStillValid = payload => ({
    type: REDUX_ACTIONS.SESSION_STILL_VALID,
    payload
});

export const loginPending = payload => ({
    type: REDUX_ACTIONS.LOGIN_PENDING,
    payload
});

export const loginSuccess = payload => ({
    type: REDUX_ACTIONS.LOGIN_SUCCESS,
    payload
});

export const loginFailed = payload => ({
    type: REDUX_ACTIONS.LOGIN_FAILED,
    payload
});


/**
 * REDUX SESSION - ACTION CREATORS
 */

export const checkSession = localStoreName => {
    return dispatch => {
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
                    let message = `Welcome back ${user}. Your previous session
                                has expired. Please log in again.`
                    dispatch(sessionNotValid(message));
                } else if(response.status === 200){
                    let payload = {
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
                    };
                    dispatch(sessionStillValid(payload));
                }
                
            }).catch(error => { //general error e.g. not internet connection
                console.error(error);
            });

        } else {
            let message = 'You don\'t have an active session. Please log in:'
            dispatch(sessionNotValid(message));
        }
    };
}

// export const pendingLogin = () => {
//     return dispatch =
//     let payload = {
//         loginStatus: {
//             code: 1,
//             message: '',
//             class: ''
//         },
//     };
//     dispatch(loginPending(payload));
// }

export const login = credentials => {
    return dispatch => {
        let payload = { loginStatus: { code: 1, message: '', class: '' } };
        dispatch(loginPending(payload));

        ApiReq.authenticate(false, credentials.oaUrl.value,
            credentials.oaUsername.value,
            credentials.oaPassword.value).then(response => {
    
            if(response.status === 200){
                //session key saved in browser local storage for persistence
                SessionCache.setSessionData(OA_LOCAL_STORE_NAME,
                                            response,
                                            credentials.oaUrl.value);
    
                let key = response.headers['x-sessionkey'];
                let payload = {
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
                };
                dispatch(loginSuccess(payload));
            } else {
                let payload = {
                    loginStatus: {
                        code: 0,
                        message: `Authentication failed:
                                  ${response.data.error_message}`,
                        class: 'error'
                    }
                };
                dispatch(loginFailed(payload));
            }
    
        }).catch(error => { //general network error
            console.error(error);
        });
    };
}
