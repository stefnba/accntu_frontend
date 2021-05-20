import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Alert,
} from 'antd';

import './style/style.css';

import feedbackBannerActions from './actions';


const extractFromState = (state, path) => path.split('.').reduce((p, prop) => (p[prop]), state);


export default function FeedbackBanner({
    closeAction,
    hideAfter = 2,
    storePath,
}) {
    // hooks
    const {
        show = false,
        type = null,
        message = null,
    } = useSelector((state) => extractFromState(state, storePath));
    const dispatch = useDispatch();

    useEffect(() => {
        if (show) {
            setTimeout(() => {
                dispatch(feedbackBannerActions.hide(closeAction));
            }, hideAfter * 1000);
        }
    }, [show, dispatch, hideAfter, closeAction]);

    return (
        <>
            {
                show
                && <Alert className="feedback-banner" message={message} type={type} />
            }
        </>
    );
}
