const userConstants = {
    // user logins
    FETCH_USER_INFO: {
        REQUEST: 'FETCH_USER_INFO.REQUEST',
        SUCCESS: 'FETCH_USER_INFO.SUCCESS',
        FAILURE: 'FETCH_USER_INFO.FAILURE',
    },
    // update basic user info
    UPDATE_USER_INFO: {
        REQUEST: 'UPDATE_USER_INFO.REQUEST',
        SUCCESS: 'UPDATE_USER_INFO.SUCCESS',
        FAILURE: 'UPDATE_USER_INFO.FAILURE',
    },
    // check if username already in db
    CHECK_USERNAME_EXISTS: {
        REQUEST: 'CHECK_USERNAME_EXISTS.REQUEST',
        SUCCESS: 'CHECK_USERNAME_EXISTS.SUCCESS',
        FAILURE: 'CHECK_USERNAME_EXISTS.FAILURE',
    },
    // check if email already in db
    CHECK_EMAIL_EXISTS: {
        REQUEST: 'CHECK_EMAIL_EXISTS.REQUEST',
        SUCCESS: 'CHECK_EMAIL_EXISTS.SUCCESS',
        FAILURE: 'CHECK_EMAIL_EXISTS.FAILURE',
    },
    // user update feedback banner
    USER_UPDATE_FEEDBACK_BANNER: 'USER_UPDATE_FEEDBACK_BANNER',
};

export default userConstants;
