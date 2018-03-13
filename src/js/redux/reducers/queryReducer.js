import { REDUX_ACTIONS } from 'scripts/constants';


const initialState = {
    endpoint: null,
    endpointUrl: '',
    parameters: []
};


const updateQuery = (state, payload) => (
    Object.assign({}, state, payload)
);

const addParameter = (state, payload) => {
    let newParams = {
        parameters: [...state.parameters, payload]
    };
    return Object.assign({}, state, newParams);
}




const queryReducer = (state = initialState, action) => {
    switch(action.type) {
        case REDUX_ACTIONS.UPDATE_QUERY:
            return updateQuery(state, action.payload);
        case REDUX_ACTIONS.ADD_PARAMETER:
            return addParameter(state, action.payload);
        default:
            return state
    }
};

export default queryReducer;
