const userConstants = {
    // user logins
    FETCH_USER_LOGINS: {
        REQUEST: 'FETCH_USER_LOGINS.REQUEST',
        SUCCESS: 'FETCH_USER_LOGINS.SUCCESS',
        FAILURE: 'FETCH_USER_LOGINS.FAILURE',
    },
    // update basic user info
    FETCH_SECURITY_SETTINGS: {
        REQUEST: 'FETCH_SECURITY_SETTINGS.REQUEST',
        SUCCESS: 'FETCH_SECURITY_SETTINGS.SUCCESS',
        FAILURE: 'FETCH_SECURITY_SETTINGS.FAILURE',
    },
    // update password
    UPDATE_PASSWORD: {
        REQUEST: 'UPDATE_PASSWORD.REQUEST',
        SUCCESS: 'UPDATE_PASSWORD.SUCCESS',
        FAILURE: 'UPDATE_PASSWORD.FAILURE',
        FEEDBACK_BANNER: 'UPDATE_PASSWORD.FEEDBACK_BANNER',
    },

    // setup 2FA
    SETUP_2FA: {
        REQUEST: 'SETUP_2FA.REQUEST',
        SUCCESS: 'SETUP_2FA.SUCCESS',
        FAILURE: 'SETUP_2FA.FAILURE',
    },
    CONFIRM_2FA_SETUP: {
        REQUEST: 'CONFIRM_2FA_SETUP.REQUEST',
        SUCCESS: 'CONFIRM_2FA_SETUP.SUCCESS',
        FAILURE: 'CONFIRM_2FA_SETUP.FAILURE',
    },
    DEACTIVATE_2FA: {
        REQUEST: 'DEACTIVATE_2FA.REQUEST',
        SUCCESS: 'DEACTIVATE_2FA.SUCCESS',
        FAILURE: 'DEACTIVATE_2FA.FAILURE',
    },
};

export default userConstants;
