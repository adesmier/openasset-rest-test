import { REDUX_ACTIONS } from 'scripts/constants';


const initialState = {
    fullName: '',
    key: '',
    url: '',
    message: 'You don\'t have an active session. Please log in:',
    loginStatus: {
        code: 0,
        message: '',
        class: ''
    },
};


const sessionNotValid = (state, payload) => (
    Object.assign({}, state, {
        message: payload.message,
        loginStatus: Object.assign({}, state.loginStatus)
    })
);

const updateSession = (state, payload) => (
    Object.assign({}, state, payload)
);




const sessionReducer = (state = initialState, action) => {
    switch(action.type) {
        case REDUX_ACTIONS.SESSION_STILL_VALID:
            return updateSession(state, action.payload);
        case REDUX_ACTIONS.SESSION_NOT_VALID:
            return sessionNotValid(state, action.payload);
        case REDUX_ACTIONS.LOGIN_PENDING:
            console.log('REDUX_ACTIONS: LOGIN_PENDING ', action.payload);
            return updateSession(state, action.payload);
        case REDUX_ACTIONS.LOGIN_SUCCESS:
            return updateSession(state, action.payload);
        case REDUX_ACTIONS.LOGIN_FAILED:
            return updateSession(state, action.payload);
        default:
            return state
    }
};

export default sessionReducer;
