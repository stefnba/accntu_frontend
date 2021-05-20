import React from 'react';
import { useDispatch } from 'react-redux';
import {
    Form,
    Input,
    Typography,
    notification,
} from 'antd';

import { securityActions } from '../_redux';
import { globalActions } from '../../../Global/_redux';
import ModalFooter from '../../../Global/Modal/ModalFooter';
// import { AlertBanner } from '../../../Shared';

const { Title } = Typography;

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


function Deactivate2FAForm() {
    // hooks
    const dispatch = useDispatch();
    const [form] = Form.useForm();


    // actions
    const handleDeactivate = async () => {
        form
            .validateFields()
            .then(({ code }) => (
                dispatch(securityActions.postDeactivate2FA(code))
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
            <Title level={4}>Are you sure you want to disabled 2FA?</Title>
            <Form
                style={{ marginTop: 24 }}
                form={form}
                name="Setup2FAForm"
                size="large"
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
                handleOk={handleDeactivate}
                okText="Disable"
            />
        </>
    );
}


const modalForm = {
    content: Deactivate2FAForm,
    title: null,
    footer: null,
    closable: false,
};

export default modalForm;
