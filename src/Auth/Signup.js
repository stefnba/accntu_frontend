import React from 'react';
import {
    Row,
    Col,
} from 'antd';
import { SignupForm } from './Forms';


export default function SignupUser() {
    return (
        <Row className="login-row" align="middle">
            <Col className="login-col" offset={6} span={12}>
                <SignupForm />
            </Col>
        </Row>
    );
}
