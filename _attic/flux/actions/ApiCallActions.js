import Dispatcher from '../Dispatcher.js';
import {FLUX_ACTIONS} from '../../scripts/Constants.js';



export function setEndpoint(apiEndpoint){
    Dispatcher.dispatch({
        actionType: FLUX_ACTIONS.UPDATE_API_ENDPOINT,
        payload: {
            endpoint: apiEndpoint
        }
    });
}

export function setEndpointUrl(apiEndpointUrl){
    Dispatcher.dispatch({
        actionType: FLUX_ACTIONS.UPDATE_API_ENDPOINT_URL,
        payload: {
            endpointUrl: apiEndpointUrl
        }
    });
}


