import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store as Store } from './_redux';

import history from './_routes/_history';

// sync local storage with token and user
import { syncStateLocalStorage } from './_redux/helpers';

// App
import App from './App';


// subscribe to auth state changes in order to update local storage
Store.subscribe(() => {
    syncStateLocalStorage({
        auth: Store.getState().auth,
        user: Store.getState().user,
    });
});

const Root = ({ store }) => (
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>
);

ReactDOM.render(
    <Root store={Store} />,
    document.getElementById('root'),
);
