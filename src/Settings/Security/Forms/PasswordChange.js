import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Form,
    Input,
} from 'antd';

import { securityActions, securityConstants } from '../_redux';
import ModalFooter from '../../../Global/Modal/ModalFooter';
import { FeedbackBanner, feedbackBannerActions } from '../../../Shared/FeedbackBanner';


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 10 },
};


function PasswordChangeForm() {
    // hooks
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const { requesting: updatePasswordRequesting } = useSelector(
        (state) => state.security.updatePassword,
    );

    // form validators
    const checkPasswordMatch = (_, value) => {
        if (value === form.getFieldValue('current_password')) {
            // eslint-disable-next-line prefer-promise-reject-errors
            return Promise.reject('New Password must not match old Password!');
        }

        if (!value || form.getFieldValue('new_password') === value) {
            return Promise.resolve();
        }

        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject('The two Passwords that you entered do not match!');
    };

    // actions
    const handleSubmit = async () => {
        form
            .validateFields()
            .then((values) => (
                dispatch(securityActions.putUpdatePassword(values))
                    .then(() => {
                        form.resetFields();
                        dispatch(feedbackBannerActions.show(
                            securityConstants.UPDATE_PASSWORD.FEEDBACK_BANNER,
                            'success',
                            'Successfully updated!',
                        ));
                    })
                    .catch((error) => {
                        form.resetFields();
                        dispatch(feedbackBannerActions.show(
                            securityConstants.UPDATE_PASSWORD.FEEDBACK_BANNER,
                            'error',
                            error.data.description,
                        ));
                    })
            ));
    };

    // render
    return (
        <>
            <Form
                {...layout}
                form={form}
                name="PasswordChangeForm"
                layout="horizontal"
                size="large"
                style={{ margin: '24px 0' }}
            >
                <Form.Item
                    label="Current"
                    name="current_password"
                    rules={[{ required: true, message: 'Please input your Fist name!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="New Password"
                    name="new_password"
                    rules={[{ required: true, message: 'Please input your Fist name!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Confirm Password"
                    dependencies={['new_password']}
                    hasFeedback
                    name="confirm_password"
                    rules={[
                        { required: true, message: 'Please input your Fist name!' },
                        { validator: checkPasswordMatch },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <FeedbackBanner
                    closeAction={securityConstants.UPDATE_PASSWORD.FEEDBACK_BANNER}
                    storePath="security.updatePassword.feedbackBanner"
                />
            </Form>
            <ModalFooter
                okButtonLoading={updatePasswordRequesting}
                handleOk={handleSubmit}
                okText="Update"
            />
        </>
    );
}


const modalForm = {
    content: PasswordChangeForm,
    title: 'Change Password',
    footer: null,
    width: 820,
};

export default modalForm;
