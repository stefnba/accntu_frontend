import React from 'react';
import { withRouter } from 'react-router';
import { Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'antd/dist/antd.css';

import { AppRoute, routes } from '../_routes';


function App() {
    const auth = useSelector((state) => state.auth);
    const { loggedIn } = auth;

    const routesToUse = loggedIn
        ? routes.filter((route) => route.isPrivate === true)
        : routes.filter((route) => route.isPrivate === false || route.isPrivate === undefined);

    return (
        <>
            <Switch>
                {routesToUse.map((route, i) => (
                    <AppRoute loggedIn={loggedIn} key={i} {...route} />
                ))}
            </Switch>
        </>
    );
}

export default withRouter(App);
