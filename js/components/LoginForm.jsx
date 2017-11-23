import React from 'react';

import auth from '../scripts/BasicAuth.js';


export default class LoginForm extends React.Component{

    state = {
        oaUrl: {value: '', isEmptyClass: ''},
        oaUsername: {value: '', isEmptyClass: ''},
        oaPassword: {value: '', isEmptyClass: ''},
    }

    inputChangeHandler = (evt) => {
        let credentials = this.state;
        let value;
        if(evt.target.name === 'oaUrl'){
            const subDomain = evt.target.value;
            value = `https://${subDomain}.openasset.com`
        } else {
            value = evt.target.value
        }

        credentials[evt.target.name].value = value;

        this.setState({
            oaUrl: credentials.oaUrl,
            oaUsername: credentials.oaUsername,
            oaPassword: credentials.oaPassword
        });
    }

    authRequest = () => {
        let credentials = this.state;
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
                oaUrl: credentials.oaUrl,
                oaUsername: credentials.oaUsername,
                oaPassword: credentials.oaPassword
            });
        } else {
            console.log(this.state)
            auth.authenticate(credentials.oaUrl.value,
                credentials.oaUsername.value,
                credentials.oaPassword.value).then(data => {
                console.log('success');
                console.log(data);
            }).catch(error => {
                console.log('error');
                console.log(error);
            });


        }
        
    }

    render(){
        const {oaUrl, oaUsername, oaPassword} = this.state;

        return(
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
        )
    }
}