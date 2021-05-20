import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    Form,
    Input,
    notification,
} from 'antd';

import { securityActions } from '../_redux';
import { globalActions } from '../../../Global/_redux';
import ModalFooter from '../../../Global/Modal/ModalFooter';
// import { AlertBanner } from '../../../Shared';


// const layout = {
//     labelCol: { span: 8 },
//     wrapperCol: { span: 14 },
// };

const openNotificationWithIcon = (type, message) => {
    notification[type]({
        message,
        description:
        'This is t',
    });
};

function Activate2FAForm() {
    // hooks
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    // state
    const [imgSource, setImgSource] = useState(null);


    useEffect(() => {
        dispatch(securityActions.fetchSetup2FA())
            .then(({ data }) => (
                setImgSource(data.url)
            ));
    }, [dispatch]);


    // actions
    const handleSubmit = async () => {
        form
            .validateFields()
            .then(({ code }) => (
                dispatch(securityActions.postSetup2FAConfirmation(code))
                    .then(({ data }) => {
                        dispatch(globalActions.hideModal());
                        dispatch(securityActions.fetchSecuritySettings());
                        openNotificationWithIcon('success', data.description);
                    })
                    .catch(({ data }) => {
                        openNotificationWithIcon('error', data.description);
                    })
            ));
    };

    // render
    return (
        <>
            <img style={{ margin: '0 auto 24px', display: 'block' }} src={imgSource} alt="Code" />
            <Form
                size="large"
                form={form}
                name="Setup2FAForm"
                layout="horizontal"
            >
                <Form.Item
                    label="Enter the code"
                    name="code"
                    rules={[
                        { required: true, message: 'Please enter the code!' },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
            <ModalFooter
                handleOk={handleSubmit}
                okText="Setup"
            />
        </>
    );
}


const modalForm = {
    content: Activate2FAForm,
    title: 'Setup 2FA',
    footer: null,
};

export default modalForm;
