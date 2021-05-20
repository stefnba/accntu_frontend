import authConstants from './constants';


/**
 * Login
 * @param {*} email email of user
 * @param {*} password password of user
 * @param {*} from url for re-direct if attempt to access private resource before
 */
function login(email, password, from) {
    return {
        type: authConstants.AUTH_LOGIN.INTERCEPTOR,
        data: {
            email,
            password,
        },
        from,
        returnPromise: true,
    };
}

/**
 * Login
 * @param {*} email email of user
 * @param {*} password password of user
 * @param {*} from url for re-direct if attempt to access private resource before
 */
function login2fa(code, loginId, from) {
    return {
        type: authConstants.AUTH_LOGIN.INTERCEPTOR_2FA,
        data: {
            code,
            login_id: loginId,
        },
        is2FA: true,
        from,
        returnPromise: true,
    };
}


/**
 * Alert banner
 */
function toggleAlertBanner() {
    return {
        type: authConstants.AUTH_LOGIN.ALERT_BANNER,
    };
}


/**
 * Logout
 */
function logout() {
    return {
        type: authConstants.AUTH_LOGOUT.INTERCEPTOR,
    };
}

function logoutRejectToken(token) {
    return {
        type: authConstants.AUTH_LOGOUT.REQUEST,
        httpRequest: {
            method: 'POST',
            url: '/auth/refresh/reject',
            data: {
                refresh_token: token,
            },
            auth: false,
        },
    };
}


/**
 * Create new user
 */
function postSignup(data) {
    return {
        type: authConstants.SIGNUP.REQUEST,
        httpRequest: {
            method: 'POST',
            url: '/users/create',
            data,
            auth: false,
        },
    };
}


/**
 * Validate new user
 */
function validateUser(validationKey) {
    return {
        type: authConstants.SIGNUP_VALIDATION.REQUEST,
        httpRequest: {
            method: 'POST',
            url: `/users/validate/${validationKey}`,
            auth: false,
        },
    };
}


const authActions = {
    login,
    login2fa,
    logout,
    logoutRejectToken,
    postSignup,
    toggleAlertBanner,
    validateUser,
};

export default authActions;
