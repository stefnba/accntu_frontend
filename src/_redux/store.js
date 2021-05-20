import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from '../_sagas';

// Middlewares
// import { authMiddleware } from '../_auth';
// import { httpMiddleware } from '../_http';

// const env = process.env.REACT_APP_ENV;


const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger();

// Log store in Redux Console tab
// eslint-disable-next-line no-underscore-dangle
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const promiseMiddleware = () => (next) => (action) => {
    // intercept only actions with httpRequests or with returnPromise == true, otherwise call next
    if (action.httpRequest || action.returnPromise) {
        return new Promise((resolve, reject) => {
            next({
                ...action,
                _resolve: resolve,
                _reject: reject,
            });
        });
    }

    // otherwise call next middleware
    return next(action);
};


const store = createStore(
    rootReducer,
    storeEnhancers(
        applyMiddleware(
            promiseMiddleware,
            sagaMiddleware,
            loggerMiddleware,
        ),
    ),
);

// then run the saga
sagaMiddleware.run(rootSaga);


export default store;
