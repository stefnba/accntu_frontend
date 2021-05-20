import homeConstants from './constants';

const initialState = {
};

function auth(state = initialState, action) {
    switch (action.type) {
    // login
    case homeConstants.FETCH_USER.REQUEST:
        return {
            ...state,
            username: action.payload.username,
        };
    // default
    default:
        return state;
    }
}

export default auth;
