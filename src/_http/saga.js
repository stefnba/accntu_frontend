import {
    put,
    takeEvery,
    call,
    select,
} from 'redux-saga/effects';

import doHttpRequest from './service';
import { checkRefresh } from '../Auth/_redux/helpers';
import { handleTokenRefresh } from '../Auth/_redux/saga';
import history from '../_routes/_history';


const env = process.env.REACT_APP_ENV;


// worker Sagas
// ===============================================================

function* handleHttpRequest(action) {
    const {
        type: originalType,
        httpRequest,
        _resolve,
        _reject,
        ...rest
    } = action;

    // get state
    const stateAll = yield select();

    // get plain type of action, e.g. w/o _REQUEST
    const type = originalType.substring(0, originalType.indexOf('.REQUEST'));

    const {
        auth = true,
        onSubmit,
        onSuccess,
        onFailure,
        // urlWithStateParam,
    } = httpRequest;

    // fire before request
    if (onSubmit) {
        onSubmit(stateAll);
    }

    let accessToken = null;
    if (auth) {
        const { tokens, tokenRefresh } = yield select((state) => state.auth);
        const {
            expiration,
            access_token: token,
        } = tokens;
        const { requesting: refreshTokenIsRefreshing } = tokenRefresh;

        accessToken = token;

        // check if refresh is needed first
        if (checkRefresh(expiration)) {
            console.log('REFRESH NEEDED for action', originalType);
            if (!refreshTokenIsRefreshing) {
                // assign new access token from token resfresh
                accessToken = yield call(handleTokenRefresh);
            }
        }
    }


    // make request
    try {
        const response = yield call(doHttpRequest, httpRequest, accessToken);
        const { data } = response;

        // log response if in dev environment
        if (env === 'dev') console.log('API RESPONSE FROM ACTION:', originalType, data);

        yield put({ type: `${type}.SUCCESS`, data, ...rest });


        // fire additionally provided action on success
        if (onSuccess) {
            onSuccess(data, stateAll);
        }

        // resolve promise from promiseMiddleware
        return _resolve(response);
    } catch (error) {
        // error from httpRequest
        const { status, statusText } = error.response || {};

        // log error if in dev environment
        if (env === 'dev') console.error('ERROR HTTP REQUEST FROM', statusText, status);

        // logout if error status is 401
        if (status === 401) {
            history.push('/logout');
        }

        // fire additionally provided action on failure
        if (onFailure) {
            onFailure(error);
        }

        // dispatch failure action
        yield put({ type: `${type}.FAILURE`, payload: status, ...rest });

        // reject promise from promiseMiddleware
        return _reject(error.response);
    }
}


// watcher Sagas
// ===============================================================

function* watchHttpRequest() {
    yield takeEvery((action) => action.httpRequest, handleHttpRequest);
}


const httpSagas = {
    watchHttpRequest,
};

export default httpSagas;
