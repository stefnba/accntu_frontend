import React, { useEffect } from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import {
    Button,
    PageHeader,
    Form,
    Divider,
    Row,
    Col,
    Badge,
} from 'antd';
import moment from 'moment';

import { globalActions } from '../../Global';
import { securityActions } from './_redux';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 10 },
};


const UserSecurityForm = () => {
    const dispatch = useDispatch();
    const { data: securitySettings } = useSelector((state) => state.security.settings);

    useEffect(() => {
        dispatch(securityActions.fetchSecuritySettings());
    }, [dispatch]);

    return (
        <Form
            {...layout}
            name="userSecurityForm"
            layout="vertical"
            requiredMark={false}
        >
            <Row justify="space-between" align="middle">
                <Col>Password</Col>
                <Col>
                    Last Update: {
                        securitySettings.lastPasswordChange
                            ? moment(securitySettings.lastPasswordChange).format('DD-MMM yy HH:mm')
                            : 'never'
                    }
                    <Button
                        onClick={() => dispatch(globalActions.showModal('passwordChange'))}
                        style={{ marginLeft: 24 }}
                    >
                        Change
                    </Button>
                </Col>
            </Row>
            <Divider />
            <Row justify="space-between" align="middle">
                <Col>Two Factor Authorization</Col>
                <Col>
                    {
                        securitySettings.tfaEnabled
                            ? (
                                <>
                                    <Badge status="success" /> 2FA enabled
                                    <Button
                                        onClick={() => dispatch(globalActions.showModal('deactivate2FA'))}
                                        style={{ marginLeft: 24 }}
                                    >
                                        Disable
                                    </Button>
                                </>
                            )
                            : <Button onClick={() => dispatch(globalActions.showModal('setup2FA'))}>Enable</Button>
                    }
                </Col>
            </Row>
            <Divider />
            <Row justify="space-between" align="middle">
                <Col>Recent Logins</Col>
                <Col>
                    <Button onClick={() => dispatch(globalActions.showModal('recentLogins'))}>View</Button>
                </Col>
            </Row>
            <Divider />
        </Form>
    );
};

export default function SecurityCenter() {
    return (
        <div>
            <PageHeader style={{ paddingLeft: 0 }} title="Security" />
            <UserSecurityForm />
        </div>
    );
}
