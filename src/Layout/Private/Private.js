import React from 'react';
import { Layout } from 'antd';

import {
    PrivateFooter,
    PrivateHeaderNav,
} from './Sections';

import './style/style.css';

const { Content } = Layout;


export default function PrivateLayout({
    component: Component,
    breadcrumbs,
    title,
    hasPageHeader,
    pageHeaderExtra: ExtraNav,
    ...rest
}) {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Layout>
                {/* Header */}
                <PrivateHeaderNav />

                {/* Main */}
                <Content className="content-container">
                    <Component {...rest} />
                </Content>

                {/* Footer */}
                <PrivateFooter />

            </Layout>
        </Layout>
    );
}
