import {EventEmitter} from 'events';

import Dispatcher from 'flux/Dispatcher.js';
import {FLUX_ACTIONS} from 'scripts/Constants';


class ApiCallStore extends EventEmitter{
    constructor(){
        super();

        //registers action handler with the Dispatcher.
        Dispatcher.register(this.handleActions.bind(this));

        this.apiCall = {
            endpoint: '',
            endpointUrl: '',
            parameters: {}
        }

    }

    handleActions(action){
        switch(action.actionType){
            case FLUX_ACTIONS.UPDATE_API_ENDPOINT:
                this.updateApiCall(action.payload);
                break;
            case FLUX_ACTIONS.UPDATE_API_ENDPOINT_URL:
                this.updateApiCall(action.payload);
                break;
        }
    }

    getApiCall(){
        return this.apiCall;
    }

    updateApiCall(payload){
        Object.assign(this.apiCall, payload);
        console.log('ApiCall Store is: ', JSON.stringify(this.apiCall));
        this.emit('change');
    }
}

export default new ApiCallStore;
