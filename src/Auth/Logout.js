import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from './_redux';

export default function Logout() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authActions.logout());
    });

    return (
        <div>Logout</div>
    );
}
