import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    useLocation,
    Link,
} from 'react-router-dom';
import {
    Form,
    Input,
    Button,
} from 'antd';
import { authActions, authConstants } from '../_redux';

import { FeedbackBanner, feedbackBannerActions } from '../../Shared/FeedbackBanner';

const layout = {
    labelCol: {
        offset: 4,
        span: 4,
    },
    wrapperCol: {
        span: 12,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 12,
    },
};

export default function LoginForm() {
    // hooks
    const dispatch = useDispatch();
    const location = useLocation();
    const [form] = Form.useForm();

    // store
    const { requesting: loggingIn, tfaRequired } = useSelector((state) => state.auth.loggingIn);

    // state
    const [loginId, setLoginId] = useState('');

    // actions
    const { from } = location.state || { from: { pathname: '/' } };

    const handleLogin = (values) => {
        dispatch(authActions.login(values.email, values.password, from))
            .catch((error) => {
                if (error.data.code === '2FA_REQUIRED' && error.status === 403) {
                    setLoginId(error.data.login_id);
                } else {
                    dispatch(feedbackBannerActions.show(
                        authConstants.AUTH_LOGIN.ALERT_BANNER,
                        'error',
                        error.data.description,
                    ));
                }
            });
    };

    const handleLogin2FA = (values) => {
        dispatch(authActions.login2fa(values.code, loginId, from))
            .catch((error) => (
                dispatch(feedbackBannerActions.show(
                    authConstants.AUTH_LOGIN.ALERT_BANNER,
                    'error',
                    error.data.description,
                ))
            ));
    };

    return (
        <>
            {
                !tfaRequired && (
                    <Form {...layout} form={form} name="LoginForm" onFinish={handleLogin} style={{ marginTop: 100 }}>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your Email!',
                                },
                            ]}
                        >
                            <Input size="large" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your password!',
                                },
                            ]}
                        >
                            <Input.Password size="large" />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <FeedbackBanner
                                closeAction={authConstants.AUTH_LOGIN.ALERT_BANNER}
                                storePath="auth.loggingIn.feedbackBanner"
                            />
                            <Button
                                size="large"
                                loading={loggingIn}
                                type="primary"
                                htmlType="submit"
                            >Login</Button>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                        Don't have an Account? Create one&nbsp;<Link to="/signup">here</Link>
                        </Form.Item>
                    </Form>
                )
            }
            {
                tfaRequired && (
                    <Form {...layout} form={form} name="LoginForm2FA" onFinish={handleLogin2FA} style={{ marginTop: 100 }}>
                        <Form.Item
                            name="code"
                            label="Code"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your Email!',
                                },
                            ]}
                        >
                            <Input size="large" />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <FeedbackBanner
                                closeAction={authConstants.AUTH_LOGIN.ALERT_BANNER}
                                storePath="auth.loggingIn.feedbackBanner"
                            />
                            <Button
                                size="large"
                                loading={loggingIn}
                                type="primary"
                                htmlType="submit"
                            >Submit</Button>
                        </Form.Item>
                    </Form>
                )
            }
        </>
    );
}
