import {EventEmitter} from 'events';

import Dispatcher from '../Dispatcher.js';
import {FLUX_ACTIONS} from '../../scripts/Constants.js';


class SessionStore extends EventEmitter{
    constructor(){
        super();

        //registers action handler with the Dispatcher.
        Dispatcher.register(this.handleActions.bind(this));

        this.session = {
            fullName: '',
            key: '',
            url: '',
            message: 'You don\'t have an active session. Please log in:',
            loginStatus: {
                code: 0,
                message: '',
                class: ''
            },
        }
    }

    handleActions(action){
        switch(action.actionType){
            case FLUX_ACTIONS.UPDATE_SESSION:
                this.updateSession(action.payload);
                break;
        }
    }

    getSession(){
        return this.session;
    }

    updateSession(payload){
        Object.assign(this.session, payload);
        console.log('Session Store is: ', JSON.stringify(this.session));
        this.emit('change');
    }
}

export default new SessionStore;
