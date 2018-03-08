import React from 'react'

//import ApiCallStore from 'flux/stores/ApiCallStore';
import CommonCalls from './CommonCalls';


const Endpoint = props => (
    <section id="api-projects-endpoint">
        <h6>{props.query.endpoint}</h6>
        <CommonCalls endpoint={props.query.endpoint} />
    </section>
);


export default Endpoint;



// export default class Endpoint extends React.Component{

//     state = {
//         apiCall: null
//     };

//     componentWillMount(){
//         ApiCallStore.on('change', () => {
//             let apiCall = ApiCallStore.getApiCall();
//             this.setState({
//                 apiCall: apiCall
//             });
//         });
//     }

//     componentWillUnmount(){
//         ApiCallStore.removeListener('change', () => {
//             console.log('Change listener removed from Endpoint component')
//         });
//     }

//     render(){
//         const {apiCall} = this.state;

//         return(
//             <section id="api-projects-endpoint">
//                 {apiCall &&
//                     <React.Fragment>
//                         <h6>{apiCall.endpoint}</h6>
//                         <CommonCalls endpoint={apiCall.endpoint} />
//                     </React.Fragment>
//                 }
//             </section>
//         )
//     }
// }