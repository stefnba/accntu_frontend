const authConstants = {
    // Login
    AUTH_LOGIN: {
        INTERCEPTOR: 'AUTH_LOGIN.SUBMIT',
        INTERCEPTOR_2FA: 'AUTH_LOGIN.2FA_SUBMIT',
        REQUIRED_2FA: 'AUTH_LOGIN.2FA_REQUIRED',
        REQUEST: 'AUTH_LOGIN.REQUEST',
        SUCCESS: 'AUTH_LOGIN.SUCCESS',
        FAILURE: 'AUTH_LOGIN.FAILURE',
        ALERT_BANNER: 'AUTH_LOGIN.ALERT_BANNER',
    },

    // Logout
    AUTH_LOGOUT: {
        INTERCEPTOR: 'AUTH_LOGOUT.SUBMIT',
        REQUEST: 'AUTH_LOGOUT.REQUEST',
        SUCCESS: 'AUTH_LOGOUT.SUCCESS',
        FAILURE: 'AUTH_LOGOUT.FAILURE',
        LOGOUT: 'AUTH_LOGOUT',
    },


    // create new user
    SIGNUP: {
        REQUEST: 'SIGNUP.REQUEST',
        SUCCESS: 'SIGNUP.SUCCESS',
        FAILURE: 'SIGNUP.FAILURE',
    },
    SIGNUP_VALIDATION: {
        REQUEST: 'SIGNUP_VALIDATION.REQUEST',
        SUCCESS: 'SIGNUP_VALIDATION.SUCCESS',
        FAILURE: 'SIGNUP_VALIDATION.FAILURE',
    },


    // Tokens
    ACCESS_TOKENS: {
        SET: 'AUTH_SET_TOKENS',
        FAILURE: 'AUTH_SET_TOKENS.FAILURE',
        SET_USER: 'AUTH_SET_TOKENS.SET_USER',
    },
    REFRESH_TOKEN: {
        INTERCEPTOR: 'TOKEN_REFRESH_NEEDED',
        REQUEST: 'REFRESH_TOKEN.REQUEST',
        SUCCESS: 'REFRESH_TOKEN.SUCCESS',
        FAILURE: 'REFRESH_TOKEN.FAILURE',
    },
};

export default authConstants;
