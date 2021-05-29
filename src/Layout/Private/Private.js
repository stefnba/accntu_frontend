import React from 'react';
import { useSelector } from 'react-redux';
import {
    Layout,
    PageHeader,
} from 'antd';

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
    titleReduxPath = '',
    hasPageHeader,
    pageHeaderExtra: ExtraNav,
    ...rest
}) {
    const titleRedux = useSelector((state) => titleReduxPath.split('.').reduce((p, prop) => (p[prop]), state));

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Layout>
                {/* Header */}
                <PrivateHeaderNav />

                {/* Main */}
                <Content className="content-container">
                    {
                        hasPageHeader
                            && <PageHeader
                                breadcrumb={{ routes: breadcrumbs }}
                                className="page-title"
                                title={title || titleRedux || null}
                                extra={ExtraNav ? <ExtraNav /> : null}
                            />
                    }
                    <Component {...rest} />
                </Content>

                {/* Footer */}
                <PrivateFooter />

            </Layout>
        </Layout>
    );
}
