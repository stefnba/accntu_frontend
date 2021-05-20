import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';

import { PrivateLayout, PublicLayout } from '../Layout';
import { GlobalModal } from '../Global';

const AppRoute = ({
    exact,
    path,
    isPrivate,
    loggedIn,
    ...rest
}) => {
    const location = useLocation();

    // return public route
    if (!isPrivate) {
        return (
            <Route
                exact={exact}
                path={path}
            >
                <PublicLayout {...rest} />
            </Route>
        );
    }

    // return private route
    if (!loggedIn) {
        return (
            <Redirect
                to={{
                    pathname: '/login',
                    state: { from: location },
                }}
            />
        );
    }
    return (
        <Route
            exact={exact}
            path={path}
        >
            <PrivateLayout {...rest} />
            <GlobalModal />
        </Route>
    );
};

export default AppRoute;
