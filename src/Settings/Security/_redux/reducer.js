import signupConstants from './constants';

const initialState = {
    logins: {
        requesting: false,
        data: [],
    },
    updatePassword: {
        requesting: false,
        feedbackBanner: {},
    },
    settings: {
        requesting: false,
        data: {
            tfaEnabled: false,
            lastPasswordChange: null,
        },
    },
};

function user(state = initialState, action) {
    switch (action.type) {
    // logins of users
    case signupConstants.FETCH_USER_LOGINS.REQUEST:
        return {
            ...state,
            logins: {
                ...state.logins,
                requesting: true,
            },
        };
    case signupConstants.FETCH_USER_LOGINS.SUCCESS:
        return {
            ...state,
            logins: {
                ...state.logins,
                requesting: false,
                data: action.data,
            },
        };
    case signupConstants.FETCH_USER_LOGINS.FAILURE:
        return {
            ...state,
            logins: {
                ...state.logins,
                requesting: false,
                data: [],
            },
        };
    // update password
    case signupConstants.UPDATE_PASSWORD.REQUEST:
        return {
            ...state,
            updatePassword: {
                ...state.updatePassword,
                requesting: true,
            },
        };
    case signupConstants.UPDATE_PASSWORD.SUCCESS:
    case signupConstants.UPDATE_PASSWORD.FAILURE:
        return {
            ...state,
            updatePassword: {
                ...state.updatePassword,
                requesting: false,
                alertBanner: true,
            },
        };
    // feedback banner
    case signupConstants.UPDATE_PASSWORD.FEEDBACK_BANNER:
        return {
            ...state,
            updatePassword: {
                ...state.updatePassword,
                feedbackBanner: action.payload ? {
                    show: true,
                    ...action.payload,
                } : {},
            },
        };
    // security settings
    case signupConstants.FETCH_SECURITY_SETTINGS.REQUEST:
        return {
            ...state,
            settings: {
                ...state.logins,
                requesting: true,
            },
        };
    case signupConstants.FETCH_SECURITY_SETTINGS.SUCCESS:
        return {
            ...state,
            settings: {
                ...state.logins,
                requesting: false,
                data: {
                    tfaEnabled: action.data.tfa_active,
                    lastPasswordChange: action.data.last_password_update,
                },
            },
        };
    case signupConstants.FETCH_SECURITY_SETTINGS.FAILURE:
        return {
            ...state,
            settings: {
                ...state.logins,
                requesting: false,
                settings: {
                    tfaEnabled: false,
                    lastPasswordChange: null,
                },
            },
        };
    // default
    default:
        return state;
    }
}

export default user;
