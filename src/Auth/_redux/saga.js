import {
    put,
    call,
    select,
    takeLatest,
    delay,
} from 'redux-saga/effects';
import jwt from 'jsonwebtoken';
import authConstants from './constants';
import history from '../../_routes/_history';
import { doHttpRequest } from '../../_http';
import { nextAutoRefresh } from './helpers';
import authActions from './actions';
import { userActions } from '../../Settings/User/_redux';

// worker Sagas
// ===============================================================

/**
 * Responsible for making login request, then
 * setting token and de-coding user information to be saved to store
 * Listens to Login Interceptor action
 * @param {*} email email
 * @param {*} password password
 * @param {*} from re-direct url after login
 */
function* handleAuthLogin({
    data,
    from,
    is2FA = false,
    _resolve,
    _reject,
}) {
    try {
        const response = yield call(doHttpRequest, {
            url: is2FA ? '/auth/login_2fa' : '/auth/login',
            method: 'POST',
            data,
        });
        const tokens = response.data;

        yield put({ type: authConstants.AUTH_LOGIN.SUCCESS });

        try {
            // set token
            yield put({ type: authConstants.ACCESS_TOKENS.SET, payload: tokens });

            // decode and set user id
            const { access_token: accessToken } = tokens;
            const { user } = jwt.decode(accessToken);
            yield put({ type: authConstants.ACCESS_TOKENS.SET_USER, payload: user.id });

            // get directly user info, triggers actions from userActions
            yield put(userActions.fetchUserInfo());

            // re-direct
            history.push(from.pathname === '/login' ? '/' : from.pathname);

            _resolve(response);
        } catch (error) {
            yield put({ type: authConstants.ACCESS_TOKENS.FAILURE, error });
        }
    } catch (error) {
        if (error.response.data.code === '2FA_REQUIRED' && error.response.status === 403) {
            // for 2FA no failure
            yield put({ type: authConstants.AUTH_LOGIN.REQUIRED_2FA });
        } else {
            // trigger login failure
            yield put({ type: authConstants.AUTH_LOGIN.FAILURE });
        }
        _reject(error.response);
    }
}


function* handleAuthLogout() {
    // disable refresh token
    const { refresh_token: token } = yield select((store) => store.auth.tokens);

    // disable refresh token in db, async request w/o yield
    yield put(authActions.logoutRejectToken(token));

    yield put({ type: authConstants.AUTH_LOGOUT.LOGOUT });

    localStorage.removeItem('tokens');
    localStorage.removeItem('user');
    history.push('/');
    // yield put({ type: authConstants.AUTH_LOGOUT.SUCCESS });
}

/**
 * Handles entire token refresh logic with backend by api call
 * @param {*} access_token
 * @param {*} refresh_token
 * @returns new access token
 */
export function* handleTokenRefresh() {
    const { tokens: { refresh_token: refreshToken }, userId } = yield select((store) => store.auth);

    console.log(refreshToken, userId);

    yield put({ type: authConstants.REFRESH_TOKEN.REQUEST });
    try {
        const response = yield call(doHttpRequest, {
            url: '/auth/refresh',
            method: 'POST',
            data: {
                refresh_token: refreshToken,
                user_id: userId,
            },
        });

        const newTokens = response.data;

        yield put({ type: authConstants.REFRESH_TOKEN.SUCCESS });
        yield put({ type: authConstants.ACCESS_TOKENS.SET, payload: newTokens });

        // return new access token to be used in api call
        return newTokens.access_token;
    } catch (error) {
        yield put({ type: authConstants.REFRESH_TOKEN.FAILURE });
        history.push('/logout');
        return error;
    }
}


function* handleBackgroundTokenRefresh() {
    const { tokens } = yield select((store) => store.auth);

    const SecToNextRefresh = nextAutoRefresh(tokens.expiration);
    console.log('Seconds to next refresh: ', SecToNextRefresh.toFixed(0));

    yield delay(1000 * SecToNextRefresh);

    // refresh token only if still logged in
    const { loggedIn } = yield select((store) => store.auth);
    if (loggedIn) {
        yield call(handleTokenRefresh);
    }
}


// watcher Sagas
// ===============================================================

function* watchLogin() {
    yield takeLatest([
        authConstants.AUTH_LOGIN.INTERCEPTOR,
        authConstants.AUTH_LOGIN.INTERCEPTOR_2FA,
    ], handleAuthLogin);
}

function* watchLogout() {
    yield takeLatest(authConstants.AUTH_LOGOUT.INTERCEPTOR, handleAuthLogout);
}

function* watchBackgroundTokenRefresh() {
    yield takeLatest(authConstants.ACCESS_TOKENS.SET, handleBackgroundTokenRefresh);
}


const authSagas = {
    watchLogin,
    watchLogout,
    watchBackgroundTokenRefresh,
};

export default authSagas;
