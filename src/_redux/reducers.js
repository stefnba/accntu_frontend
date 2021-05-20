import { combineReducers } from 'redux';

import { authReducer as auth } from '../Auth/_redux';
import { globalReducer as global } from '../Global/_redux';
import { userReducer as user } from '../Settings/User/_redux';
import { securityReducer as security } from '../Settings/Security/_redux';

const rootReducer = combineReducers({
    auth,
    global,
    user,
    security,
});

export default rootReducer;
