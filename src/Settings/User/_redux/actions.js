import userConstants from './constants';

/*
    fetch -> get request
    post -> post request
    delete -> ... request
    update -> put request
*/


/**
 * Retrieves basic user info
 */
function fetchUserInfo() {
    return {
        type: userConstants.FETCH_USER_INFO.REQUEST,
        httpRequest: {
            url: '/users/me',
        },
    };
}


/**
 * Update basic user info
 */
function updateUserInfo(data) {
    return {
        type: userConstants.UPDATE_USER_INFO.REQUEST,
        httpRequest: {
            url: '/users/me/update',
            method: 'put',
            data,
        },
    };
}


/**
 * Check if username already in DB
 */
function checkUsernameExists(username) {
    return {
        type: userConstants.CHECK_USERNAME_EXISTS.REQUEST,
        httpRequest: {
            url: `/users/check_username/${username}`,
            auth: false,
        },
    };
}

/**
 * Check if email already in DB
 */
function checkEmailExists(email) {
    return {
        type: userConstants.CHECK_EMAIL_EXISTS.REQUEST,
        httpRequest: {
            url: `/users/check_email/${email}`,
            auth: false,
        },
    };
}


const userActions = {
    checkUsernameExists,
    checkEmailExists,
    fetchUserInfo,
    updateUserInfo,
};

export default userActions;
