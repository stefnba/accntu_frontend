import { fork, all } from 'redux-saga/effects';
import { authSagas } from '../Auth/_redux';
import httpSagas from '../_http/saga';


export default function* rootSaga() {
    yield all([
        fork(authSagas.watchLogin),
        fork(authSagas.watchLogout),
        fork(authSagas.watchBackgroundTokenRefresh),
        fork(httpSagas.watchHttpRequest),
    ]);

    // return Promise.resolve('ddd');
}
