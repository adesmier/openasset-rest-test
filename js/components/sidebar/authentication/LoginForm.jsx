import React from 'react';
import { connect } from 'react-redux';

import DynamicButton from 'components/reusable/DynamicButton'
import { checkSession, login } from 'redux/actions/sessionActions';

import ApiReq from 'scripts/apiRequester';
import SessionCache from 'scripts/sessionCache';
import {OA_LOCAL_STORE_NAME} from 'scripts/constants';


const mapDispatchToProps = dispatch => ({
    checkSession: localStoreName => dispatch(checkSession(localStoreName)),
    login: credentials => dispatch(login(credentials))
});


class ConnectedLoginForm extends React.Component{

    state = {
        credentials: {
            oaUrl: {value: '', isEmptyClass: ''},
            oaUsername: {value: '', isEmptyClass: ''},
            oaPassword: {value: '', isEmptyClass: ''},
        }
    }

    componentWillMount(){
    }

    componentWillUnmount(){
    }

    componentDidMount(){
        this.props.checkSession(OA_LOCAL_STORE_NAME);
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
        //this.dynButton.blur();

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

            //SessionActions.pendingLogin();
            this.props.login(credentials);

        }
    }

    render(){
        const { oaUrl, oaUsername, oaPassword } = this.state.credentials;
        const { session } = this.props;
        const { loginStatus } = session;

        let submitBtnContent;
        let inputDisabled;
        switch(loginStatus.code){
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

        return(
            <React.Fragment>
                <div className="session-check">
                    <span><em>{session.message}</em></span>
                </div>
                <form>
                    <div className="row">
                        <div>
                            <label htmlFor="oaUrl">Your OpenAsset URL</label>
                            <span>https://</span>
                            <input className={['u-half-width',
                                            oaUrl.isEmptyClass].join(' ')}
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
                            <input className={['u-half-width',
                                            oaUsername.isEmptyClass].join(' ')}
                                type="text"
                                placeholder="Username"
                                name="oaUsername"
                                onChange={evt => this.inputChangeHandler(evt)}
                                disabled={inputDisabled} />
                        </div>
                        <div className="six columns">
                            <label htmlFor="oaPassword">OpenAsset Password</label>
                            <input className={['u-half-width',
                                            oaPassword.isEmptyClass].join(' ')}
                                type="password"
                                name="oaPassword"
                                onChange={evt => this.inputChangeHandler(evt)}
                                disabled={inputDisabled} />
                        </div>
                    </div>
                    <div id="submit-btn-wrapper" className="row">
                        <DynamicButton classes={['button-primary']}
                                       btnType="button"
                                       clickHandler={this.authRequest}
                                       width="120px"
                                       btnDisabled={inputDisabled}
                                       btnContent={submitBtnContent} />
                        <span key={loginStatus.code} className={['login-status',
                                        loginStatus.class].join(' ')}>
                            {loginStatus.message}
                        </span>
                    </div>
                    <hr />
                </form>
            </React.Fragment>
        )
    }
}


const LoginForm = connect(null, mapDispatchToProps)(ConnectedLoginForm);

export default LoginForm;
