import React from 'react';
import { connect } from 'react-redux';

import NavButton from 'components/reusable/NavButton';
import Login from 'components/sidebar/authentication/Login';
import ApiSelector from 'components/sidebar/buildapicall/ApiSelector';


const mapStateToProps = state => ({
    session: state.session,
    query: state.query
});


const ConnectedSideBar = props => {
    const { session, query } = props;
    const { loginStatus, url } = session;

    return (
        <aside id="auth-nav-sidebar" className="auth-nav-sidebar active">
            <NavButton id="aside-menu-btn"
                       targetId="auth-nav-sidebar"
                       classToggle="active"
                       addClassBar1="aside-bar1"
                       addClassBar2="aside-bar2"
                       addClassBar3="aside-bar3" />
            <Login {...props} />
            {loginStatus.code === 2 &&
                <ApiSelector oaBaseUrl={url}
                             query={query} />
            }
        </aside>
    );
};


const SideBar = connect(mapStateToProps)(ConnectedSideBar);

export default SideBar;







// class ConnectedSideBar extends React.Component{

//     state = {
//         loginCode: 0
//     };
    
//     componentWillMount(){
//         SessionStore.on('change', () => {
//             let session = SessionStore.getSession();
//             this.setState({
//                 baseUrl: session.url,
//                 loginCode: session.loginStatus.code
//             });
//         });
//     }

//     componentWillUnmount(){
//         SessionStore.removeListener('change', () => {
//             console.log('Change listener removed from SideBar component')
//         });
//     }

//     render(){

//         const {baseUrl, loginCode} = this.state;

//         return(
//             <aside id="auth-nav-sidebar" className="auth-nav-sidebar active">
//                 <NavButton id="aside-menu-btn"
//                            targetId="auth-nav-sidebar"
//                            classToggle="active"
//                            addClassBar1="aside-bar1"
//                            addClassBar2="aside-bar2"
//                            addClassBar3="aside-bar3" />
//                 <Login />
//                 {loginCode === 2 &&
//                     <ApiSelector oaBaseUrl={baseUrl} />
//                 }
//             </aside>
//         )
//     }
// }
