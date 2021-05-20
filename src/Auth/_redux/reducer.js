import jwt from 'jsonwebtoken';
import authConstants from './constants';

/**
 * Check if user is logged in when starting application
 * logged in when token is in local store
 */
const tokens = JSON.parse(localStorage.getItem('tokens'));
const userId = tokens ? jwt.decode(tokens.access_token).user.id : null;

const initialState = {
    loggingIn: {
        requesting: false,
        tfaRequired: false,
        feedbackBanner: {},
    },
    loggedIn: !!tokens,
    tokens,
    tokenRefresh: {
        requesting: false,
    },
    userId,
};

export default function auth(state = initialState, action) {
    switch (action.type) {
    // login
    case authConstants.AUTH_LOGIN.REQUEST:
        return {
            ...state,
            loggingIn: {
                ...state.loggingIn,
                requesting: true,
            },
        };
    // 2FA
    case authConstants.AUTH_LOGIN.REQUIRED_2FA:
        return {
            ...state,
            loggingIn: {
                ...state.loggingIn,
                tfaRequired: true,
            },
        };
    // case authConstants.AUTH_LOGIN.SUCCESS:
    case authConstants.ACCESS_TOKENS.SET:
        return {
            ...state,
            loggedIn: true,
            loggingIn: {
                ...state.loggingIn,
                requesting: false,
                tfaRequired: false,
            },
            tokens: action.payload,
            tokenRefresh: {
                ...state.tokenRefresh,
                requesting: false,
            },
        };
    case authConstants.ACCESS_TOKENS.SET_USER:
        return {
            ...state,
            userId: action.payload,
        };
    case authConstants.AUTH_LOGIN.FAILURE:
        return {
            ...state,
            loggingIn: {
                ...state.loggingIn,
                requesting: false,
                tfaRequired: false,
                alertBanner: true,
            },
            loggedIn: false,
            tokens: null,
        };
    // feedback banner
    case authConstants.AUTH_LOGIN.ALERT_BANNER:
        return {
            ...state,
            loggingIn: {
                ...state.loggingIn,
                feedbackBanner: action.payload ? {
                    show: true,
                    ...action.payload,
                } : {},
            },
        };
    // refresh token
    case authConstants.REFRESH_TOKEN.REQUEST:
        return {
            ...state,
            tokenRefresh: {
                ...state.tokenRefresh,
                requesting: true,
            },
        };
    case authConstants.REFRESH_TOKEN.SUCCESS:
    case authConstants.REFRESH_TOKEN.FAILURE:
        return {
            ...state,
            tokenRefresh: {
                ...state.tokenRefresh,
                requesting: false,
            },
        };
    // logout
    case authConstants.AUTH_LOGOUT.LOGOUT:
        return {
            ...state,
            loggingIn: {
                ...state.loggingIn,
                requesting: false,
                tfaRequired: false,
            },
            loggedIn: false,
            tokens: null,
            userId: null,
        };
    // default
    default:
        return state;
    }
}
