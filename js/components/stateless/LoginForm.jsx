import React from 'react';

export default class LoginForm extends React.Component{

    state = {
        oaUrl: ''
    };

    addUrlSyntax = (evt) => {
        const subDomain = evt.target.value;
        let domain = `https://${subDomain}.openasset.com`

        console.log(subDomain)

        this.setState({
            oaUrl: domain
        });
    }

    render(){
        return(
            <form>
                <div className="row">
                    <div>
                        <label htmlFor="openasset-url">Your OpenAsset URL</label>
                        <span>https://</span>
                        <input className="u-half-width"
                               defaultValue={this.state.oaUrl}
                               type="text"
                               placeholder="subdomain"
                               id="openasset-url"
                                />
                        <span>.openasset.com</span>
                    </div>
                </div>
                <div className="row">
                    <div className="six columns">
                        <label htmlFor="openasset-username">OpenAsset Username</label>
                        <input className="u-full-width"
                               type="text"
                               placeholder="Username"
                               id="openasset-username" />
                    </div>
                    <div className="six columns">
                        <label htmlFor="openasset-password">OpenAsset Password</label>
                        <input className="u-full-width"
                               type="password"
                               id="openasset.password"
                               onChange={evt => this.addUrlSyntax(evt)} />
                    </div>
                </div>
            </form>
        )
    }
}