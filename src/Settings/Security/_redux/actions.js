import securityConstants from './constants';

/*
    fetch -> get request
    post -> post request
    delete -> ... request
    update -> put request
*/


/**
 * Get last 10 logins of user
 */
function fetchUserlogins() {
    return {
        type: securityConstants.FETCH_USER_LOGINS.REQUEST,
        httpRequest: {
            url: '/users/me/security/recent_logins',
        },
    };
}


/**
 * get settings like 2FA activated, last password change, etc.
 */
function fetchSecuritySettings() {
    return {
        type: securityConstants.FETCH_SECURITY_SETTINGS.REQUEST,
        httpRequest: {
            url: '/users/me/security/settings',
        },
    };
}


/**
 * Get last 10 logins of user
 */
function putUpdatePassword(data) {
    return {
        type: securityConstants.UPDATE_PASSWORD.REQUEST,
        httpRequest: {
            url: '/auth/change_password',
            method: 'put',
            data,
        },
    };
}


/**
 * Alert banner
 */
function toggleAlertBanner() {
    return {
        type: securityConstants.UPDATE_PASSWORD.ALERT_BANNER,
    };
}


/**
 * Return QR Code to setup 2FA
 */
function fetchSetup2FA() {
    return {
        type: securityConstants.SETUP_2FA.REQUEST,
        httpRequest: {
            method: 'GET',
            url: '/auth/setup_tfa',
        },
    };
}

function postSetup2FAConfirmation(code) {
    return {
        type: securityConstants.CONFIRM_2FA_SETUP.REQUEST,
        httpRequest: {
            method: 'POST',
            url: '/auth/setup_tfa',
            data: {
                code,
            },
        },
    };
}

function postDeactivate2FA(code) {
    return {
        type: securityConstants.DEACTIVATE_2FA.REQUEST,
        httpRequest: {
            method: 'POST',
            url: '/auth/deactivate_tfa',
            data: {
                code,
            },
        },
    };
}


const userActions = {
    fetchSecuritySettings,
    fetchUserlogins,
    putUpdatePassword,
    // 2FA
    fetchSetup2FA,
    postSetup2FAConfirmation,
    postDeactivate2FA,
    // Misc
    toggleAlertBanner,
};

export default userActions;
