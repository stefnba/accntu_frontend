/**
 * Set local storage with user and token
 */
function syncStateLocalStorage(state) {
    try {
        const { tokens = {} } = state.auth;
        const { data: user = {} } = state.user.userInfo;
        // set token to local storage
        if (tokens !== undefined) {
            localStorage.setItem('tokens', JSON.stringify(tokens));
        }
        // set user to local storage
        if (user !== undefined) {
            localStorage.setItem('user', JSON.stringify(user));
        }
        return true;
    } catch (err) {
        return undefined;
    }
}


export {
    // eslint-disable-next-line import/prefer-default-export
    syncStateLocalStorage,
};
