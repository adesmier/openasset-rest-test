import { REDUX_ACTIONS } from 'scripts/constants';


const initialState = {
    endpoint: null,
    endpointUrl: '',
    parameters: {}
};


const updateQuery = (state, payload) => (
    Object.assign({}, state, payload)
);




const queryReducer = (state = initialState, action) => {
    switch(action.type) {
        case REDUX_ACTIONS.UPDATE_QUERY:
            return updateQuery(state, action.payload);
        default:
            return state
    }
};

export default queryReducer;
