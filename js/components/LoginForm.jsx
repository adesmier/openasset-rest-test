import React from 'react';

import Auth from '../scripts/BasicAuth.js';
import SessionCache from '../scripts/SessionCache.js';
import {OA_API_KEY} from '../scripts/Constants';


export default class LoginForm extends React.Component{

    state = {
        credentials: {
            oaUrl: {value: '', isEmptyClass: ''},
            oaUsername: {value: '', isEmptyClass: ''},
            oaPassword: {value: '', isEmptyClass: ''},
        },
        sessionStatus: 'You don\'t have an active session. Please log in:',
        loginStatus: {
            message: '',
            class: ''
        },
        authStatus: 0
    }

    componentDidMount(){
        let sessionData = SessionCache.getSessionData(OA_API_KEY);

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

            //check if stored key is still valid
            Auth.authenticate(true, url,username,session).then(response => {

                if(response.data.error_message && response.status === 401){
                    this.setState({
                        sessionStatus: `Welcome back ${user}. Your previous session 
                                        has expired. Please log in again.`,
                        loginStatus: {
                            message: `Existing session invalid: Session Key ${session}`,
                            class: 'error'
                        }
                    });
                } else if(response.status === 200){
                    this.setState({
                        sessionStatus: `Welcome back ${user}. Your previous session 
                                        is still active. No need to login.`,
                        loginStatus: {
                            message: `Authentication successful: Using existing session Key ${session}`,
                            class: 'success'
                        },
                        authStatus: 2
                    });
                }
                console.log(response);
                
            }).catch(error => { //general network error
                console.log(error);
            });
        
            
        }

    }

    inputChangeHandler = (evt) => {
        let credentials = this.state.credentials;
        let value;
        if(evt.target.name === 'oaUrl'){
            const subDomain = evt.target.value;
            value = `https://${subDomain}.openasset.com`
        } else {
            value = evt.target.value
        }

        credentials[evt.target.name].value = value;

        this.setState({
            credentials: {
                oaUrl: credentials.oaUrl,
                oaUsername: credentials.oaUsername,
                oaPassword: credentials.oaPassword
            }     
        });
    }

    authRequest = () => {
        let credentials = this.state.credentials;
        let hasEmptyField = false;
        this.submitBtn.blur();

        //if any input fields are empty then a class will be added
        //to alert the user to the input field
        for(let key in credentials){
            if(credentials.hasOwnProperty(key)){
                if(credentials[key].value === ''){
                    credentials[key].isEmptyClass = 'auth-input-empty';
                    hasEmptyField = true;
                } else {
                    credentials[key].isEmptyClass = '';
                }
            }
        }

        if(hasEmptyField){
            this.setState({
                credentials: {
                    oaUrl: credentials.oaUrl,
                    oaUsername: credentials.oaUsername,
                    oaPassword: credentials.oaPassword
                } 
            });
        } else { //no fields empty so make auth api call

            this.setState({authStatus: 1});

            console.log(this.state);
            Auth.authenticate(false, credentials.oaUrl.value,
                credentials.oaUsername.value,
                credentials.oaPassword.value).then(response => {

                if(response.status === 200){
                    //session key saved in localstorage for persistence
                    SessionCache.setSessionData(OA_API_KEY, response, credentials.oaUrl.value);
                    let key = response.headers['x-sessionkey'];
                    this.setState({
                        loginStatus: {
                            message: `Authentication successful: Session Key ${key}`,
                            class: 'success'
                        },
                        authStatus: 2
                    });
                } else {
                    this.setState({
                        loginStatus: {
                            message: `Authentication failed: ${response.data.error_message}`,
                            class: 'error'
                        },
                        authStatus: 0
                    });
                }

                

                console.log(response);

            }).catch(error => { //general network error
                console.error(error);
            });

        }
        
    }

    render(){
        const {oaUrl, oaUsername, oaPassword} = this.state.credentials;
        const {sessionStatus, loginStatus, authStatus} = this.state;

        let submitBtnContent;
        let inputDisabled;
        switch(authStatus){
            case 0:
                submitBtnContent = 'Submit';
                inputDisabled = false;
                break;
            case 1:
                submitBtnContent = <i className="fa fa-spin fa-refresh"></i>;
                inputDisabled = true;
                break;
            case 2:
                submitBtnContent = <i className="fa fa-check"></i>;
                inputDisabled = true;
                break;
        }

        return[
            <div className="session-check">
                <span><em>{sessionStatus}</em></span>
            </div>,
            <form>
                <div className="row">
                    <div>
                        <label htmlFor="oaUrl">Your OpenAsset URL</label>
                        <span>https://</span>
                        <input className={['u-half-width', oaUrl.isEmptyClass].join(' ')}
                               type="text"
                               placeholder="subdomain"
                               name="oaUrl"
                               onChange={evt => this.inputChangeHandler(evt)}
                               disabled={inputDisabled} />
                        <span>.openasset.com</span>
                    </div>
                </div>
                <div className="row">
                    <div className="six columns">
                        <label htmlFor="oaUsername">OpenAsset Username</label>
                        <input className={['u-half-width', oaUsername.isEmptyClass].join(' ')}
                               type="text"
                               placeholder="Username"
                               name="oaUsername"
                               onChange={evt => this.inputChangeHandler(evt)}
                               disabled={inputDisabled} />
                    </div>
                    <div className="six columns">
                        <label htmlFor="oaPassword">OpenAsset Password</label>
                        <input className={['u-half-width', oaPassword.isEmptyClass].join(' ')}
                               type="password"
                               name="oaPassword"
                               onChange={evt => this.inputChangeHandler(evt)}
                               disabled={inputDisabled} />
                    </div>
                </div>
                <div id="submit-btn-wrapper" className="row">
                    <button className="button-primary pending"
                            type="button"
                            //manage button focus
                            ref={(submitBtn) => {this.submitBtn = submitBtn}}
                            onClick={() => {this.authRequest()}}
                            disabled={inputDisabled}>
                            {submitBtnContent}
                    </button>
                    <span className={['login-status', loginStatus.class].join(' ')}>
                        {loginStatus.message}
                    </span>
                </div>
                <hr />
            </form>
        ];
    }
}