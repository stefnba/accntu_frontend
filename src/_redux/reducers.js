import { combineReducers } from 'redux';

import { authReducer as auth } from '../Auth/_redux';
import { globalReducer as global } from '../Global/_redux';
import { userReducer as user } from '../Settings/User/_redux';
import { securityReducer as security } from '../Settings/Security/_redux';
import { transactionReducer as transaction } from '../Transaction/_redux';
import { importingReducer as importing } from '../Import/_redux';

const rootReducer = combineReducers({
    auth,
    global,
    user,
    security,
    transaction,
    importing,
});

export default rootReducer;
