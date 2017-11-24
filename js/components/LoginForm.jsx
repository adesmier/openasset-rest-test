import React from 'react';

import Auth from '../scripts/BasicAuth.js';
import Cookie from '../scripts/Cookies.js';
import {OA_COOKIE_KEY, OA_COOKIE_EXPIRY} from '../scripts/Constants';


export default class LoginForm extends React.Component{

    state = {
        credentials: {
            oaUrl: {value: '', isEmptyClass: ''},
            oaUsername: {value: '', isEmptyClass: ''},
            oaPassword: {value: '', isEmptyClass: ''},
        },
        sessionStatus: 'You don\'t have an active session. Please log in:'
    }

    componentDidMount(){
        //check for existing session cookie
        //if valid then notify that there's
        //no need to login
        let cookie = Cookie.getCookie([OA_COOKIE_KEY, OA_COOKIE_EXPIRY]);
        console.log(cookie);

        if(cookie[OA_COOKIE_KEY]){
            this.setState({
                sessionStatus: 'Your previous session is still active. No need to log in.'
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

            

            console.log(this.state)
            Auth.authenticate(credentials.oaUrl.value,
                credentials.oaUsername.value,
                credentials.oaPassword.value).then(data => {
                console.log('success');
                console.log(data);

                let sessionKey = data.headers['x-sessionkey'];
                let expiry = data.headers.expires;
                Cookie.setCookie(OA_COOKIE_KEY, sessionKey, expiry);
                Cookie.setCookie(OA_COOKIE_EXPIRY, expiry, expiry);

            }).catch(error => {
                console.log('error');
                console.log(error);
            });

        }
        
    }

    render(){
        const {oaUrl, oaUsername, oaPassword} = this.state.credentials;
        const {sessionStatus} = this.state;

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
                                />
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
                               />
                    </div>
                    <div className="six columns">
                        <label htmlFor="oaPassword">OpenAsset Password</label>
                        <input className={['u-half-width', oaPassword.isEmptyClass].join(' ')}
                               type="password"
                               name="oaPassword"
                               onChange={evt => this.inputChangeHandler(evt)}
                               />
                    </div>
                </div>
                <div className="row">
                    <input className="button-primary" type="button" onClick={() => {this.authRequest()}} value="Submit" />
                </div>
                <hr />
            </form>
        ];
    }
}