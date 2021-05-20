import React from 'react';
import {
    Row,
    Col,
} from 'antd';
import { LoginForm } from './Forms';


export default function Login() {
    return (
        <Row className="login-row" align="middle">
            <Col className="login-col" offset={6} span={12}>
                <div className="login-logo"></div>
                <LoginForm />
            </Col>
        </Row>
    );
}
