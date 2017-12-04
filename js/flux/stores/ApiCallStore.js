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
            parameters: {}
        },

    }

    handleActions(action){
        switch(action.actionType){
            case FLUX_ACTIONS.UPDATE_APICALL:
                this.updateApiCall(action.payload);
                break;
        }
    }

    getApiCall(){




        return this.apiCall;
    }

    updateApiCall(payload){
        Object.assign(this.session, payload);
        console.log('Session Store is: ', JSON.stringify(this.session));
        this.emit('change');
    }
}

export default new ApiCallStore;
