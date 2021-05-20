import userConstants from './constants';
import authConstants from '../../../Auth/_redux/constants';

const userInfoLocalStore = JSON.parse(localStorage.getItem('user')) || {};

const initialState = {
    userInfo: {
        requesting: false,
        data: userInfoLocalStore,
        feedbackBanner: {},
    },
};

function user(state = initialState, action) {
    switch (action.type) {
    // user info and update user info
    case userConstants.FETCH_USER_INFO.REQUEST:
    case userConstants.UPDATE_USER_INFO.REQUEST:
        return {
            ...state,
            userInfo: {
                ...state.userInfo,
                requesting: true,
            },
        };
    case userConstants.FETCH_USER_INFO.SUCCESS:
    case userConstants.UPDATE_USER_INFO.SUCCESS:
        return {
            ...state,
            userInfo: {
                ...state.userInfo,
                data: action.data,
                requesting: false,
            },
        };
    case userConstants.FETCH_USER_INFO.FAILURE:
    case authConstants.AUTH_LOGOUT.LOGOUT:
        return {
            ...state,
            userInfo: {
                ...state.userInfo,
                data: {},
                requesting: false,
            },
        };
    // feedback banner
    case userConstants.USER_UPDATE_FEEDBACK_BANNER:
        return {
            ...state,
            userInfo: {
                ...state.userInfo,
                feedbackBanner: action.payload ? {
                    show: true,
                    ...action.payload,
                } : {},
            },
        };
    // default
    default:
        return state;
    }
}

export default user;
