import React from 'react';
import {
    useSelector,
    useDispatch,
} from 'react-redux';
import {
    Button,
    Form,
    Input,
} from 'antd';

import { userActions, userConstants } from '../_redux';
import { FeedbackBanner, feedbackBannerActions } from '../../../Shared/FeedbackBanner';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 10 },
};

const tailLayout = {
    // wrapperCol: { offset: 8, span: 16 },
};


export default function UserUpdateForm() {
    // hooks
    const dispatch = useDispatch();

    // store
    const {
        data: user,
        requesting: userInfoRequesting,
    } = useSelector((state) => state.user.userInfo);


    // actions
    const handleUpdate = (values) => {
        dispatch(userActions.updateUserInfo(values))
            .then(() => dispatch(feedbackBannerActions.show(
                userConstants.USER_UPDATE_FEEDBACK_BANNER,
                'success',
                'Successfully updated!',
            )))
            .catch((error) => dispatch(feedbackBannerActions.show(
                userConstants.USER_UPDATE_FEEDBACK_BANNER,
                'error',
                error.data.description,
            )));
    };


    // validators
    const handleCheckUsername = async (_, value) => {
        try {
            const res = await dispatch(userActions.checkUsernameExists(value));
            const { username_exists: exists } = res.data;
            if (!exists || value === user.username) return Promise.resolve();

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
            if (!exists || value === user.email) return Promise.resolve();

            // exists already
            return Promise.reject(new Error('This Email already exists!'));
        } catch (error) {
            return console.log(error);
        }
    };

    return (
        <Form
            {...layout}
            name="UserUpdateForm"
            layout="vertical"
            initialValues={user}
            requiredMark={false}
            onFinish={handleUpdate}
        >
            <Form.Item
                label="First name"
                name="first_name"
                rules={[{ required: true, message: 'Please input your first name!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Name"
                name="last_name"
                rules={[{ required: true, message: 'Please input your last name!' }]}
            >
                <Input autoComplete="new-password" />
            </Form.Item>

            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }, { validator: handleCheckUsername }]}
            >
                <Input autoComplete="off" />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                onChange={handleCheckEmail}
                rules={[{ required: true, message: 'Please input your Email!' }, { validator: handleCheckEmail }]}
            >
                <Input autoComplete="off" />
            </Form.Item>

            {/* <Divider /> */}

            <Form.Item {...tailLayout}>
                <FeedbackBanner
                    closeAction={userConstants.USER_UPDATE_FEEDBACK_BANNER}
                    storePath="user.userInfo.feedbackBanner"
                />
                <Button type="primary" htmlType="submit" loading={userInfoRequesting}>
                    Update
                </Button>
            </Form.Item>
        </Form>
    );
}
