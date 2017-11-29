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
            status: '',
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

    updateSession(data){
        console.log(data);
        this.session = {
            username: data.username,
            key: data.key
        }

        this.emit('change');
    }
}

window.dispatcher = Dispatcher;
export default new SessionStore;
