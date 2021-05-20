import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    Link,
} from 'react-router-dom';
import {
    Form,
    Input,
    Button,
    Result,
    // Radio,
} from 'antd';
import { authActions } from '../_redux';
import { userActions } from '../../Settings/User/_redux';

const layout = {
    labelCol: {
        offset: 2,
        span: 6,
    },
    wrapperCol: {
        span: 12,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

export default function SignupForm() {
    // hooks
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    // state
    const [success, setSuccess] = useState(false);
    const [requesting, setRequesting] = useState(false);

    // actions
    const handleSubmit = (values) => {
        setRequesting(false);
        dispatch(authActions.postSignup(values))
            .then(() => {
                setRequesting(false);
                setSuccess(true);
            })
            .catch(() => (
                setRequesting(false)
            ));
    };

    const checkPasswordMatch = (_, value) => {
        console.log(form.getFieldValue('password'));
        if (!value || form.getFieldValue('password') === value) {
            return Promise.resolve();
        }

        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject('The two passwords that you entered do not match!');
    };

    const handleCheckUsername = async (_, value) => {
        try {
            const res = await dispatch(userActions.checkUsernameExists(value));
            const { username_exists: exists } = res.data;
            if (!exists) return Promise.resolve();

            // exists already
            return Promise.reject(new Error('This username already exists!'));
        } catch (error) {
            return console.log(error);
        }
    };

    const handleCheckEmail = async (_, value) => {
        try {
            const res = await dispatch(userActions.checkEmailExists(value));
            const { email_exists: exists } = res.data;
            if (!exists) return Promise.resolve();

            // exists already
            return Promise.reject(new Error('This Email already exists!'));
        } catch (error) {
            return console.log(error);
        }
    };

    return (
        <>
            {
                !success
                && (

                    <Form {...layout}
                        form={form}
                        name="SignupForm"
                        onFinish={handleSubmit}
                        style={{ marginTop: 100 }}
                    >
                        <Form.Item
                            name="first_name"
                            label="First Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your First Name!',
                                },
                            ]}
                        >
                            <Input size="large" />
                        </Form.Item>
                        <Form.Item
                            name="last_name"
                            label="Last Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your Last Name!',
                                },
                            ]}
                        >
                            <Input size="large" />
                        </Form.Item>
                        {/* <Form.Item
                            name="gender"
                            label="Gender"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please provide your gender!',
                                },
                            ]}
                        >
                            <Radio.Group>
                                <Radio value={1}>Women</Radio>
                                <Radio value={2}>Mann</Radio>
                            </Radio.Group>
                        </Form.Item> */}
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your Email!',
                                },
                                {
                                    validator: handleCheckEmail,
                                },
                            ]}
                        >
                            <Input autoComplete="off" size="large" />
                        </Form.Item>
                        <Form.Item
                            name="username"
                            label="Username"
                            rules={[{ required: true, message: 'Please input enter a username!' }, { validator: handleCheckUsername }]}
                        >
                            <Input autoComplete="off" size="large" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter a password!',
                                },
                            ]}
                        >
                            <Input.Password size="large" />
                        </Form.Item>
                        <Form.Item
                            name="password_repeat"
                            label="Repeat Password"
                            // dependencies={['password']}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                {
                                    validator: checkPasswordMatch,
                                },
                            ]}
                        >
                            <Input.Password size="large" />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button
                                size="large"
                                loading={requesting}
                                type="primary"
                                htmlType="submit"
                            >Signup</Button>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            Already have an Account? Login&nbsp;<Link to="/login">here</Link>
                        </Form.Item>
                    </Form>
                )
            }
            {
                success
                && <Result
                    status="success"
                    title="You have successfully signup!"
                    extra={[
                        <Link to="/login">
                            <Button type="primary" key="console">
                                Login
                            </Button>
                        </Link>,
                    ]}
                />
            }
        </>
    );
}
