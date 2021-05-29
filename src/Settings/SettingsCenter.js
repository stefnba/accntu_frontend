import React from 'react';
import {
    Route,
    Switch,
} from 'react-router-dom';
import {
    Row,
    Col,
} from 'antd';

import SettingsNav from './SettingsNav';

import './style/style.css';

export default function SettingsCenter({ subRoutes }) {
    return (
        <Row className="settings-row page-container">
            <Col span={6} className="settings-menu-col">
                <SettingsNav />
            </Col>
            <Col span={18} className="settings-content-col">
                <Switch>
                    {subRoutes && subRoutes.map((route, i) => (
                        <Route path={route.path} key={i} component={route.component} />
                    ))}
                </Switch>
            </Col>
        </Row>
    );
}
