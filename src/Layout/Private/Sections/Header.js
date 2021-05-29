import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation, Link } from 'react-router-dom';
import {
    Layout,
    Tooltip,
    Menu,
} from 'antd';
import {
    LogoutOutlined,
    ImportOutlined,
    PieChartOutlined,
    ShoppingCartOutlined,
    UnorderedListOutlined,
    UserOutlined,
} from '@ant-design/icons';

const { Header } = Layout;


export default function PrivateNav() {
    const {
        last_name: last,
        first_name: first,
    } = useSelector((state) => state.user.userInfo.data || {});
    const location = useLocation();
    const paths = location.pathname.match(/\/\w+/g) || ['/'];
    const user = `${first} ${last}`;
    return (
        <Header className="global-header"
            style={
                {
                    background: '#f0f2f5',
                    zIndex: 1,
                    position: 'fixed',
                    top: '0',
                    left: 0,
                    right: 0,
                    display: 'flex',
                }
            }
        >
            <Link to="/" className="logo" />
            <Menu
                style={{ marginLeft: 'auto' }}
                selectedKeys={paths}
                // selectedKeys={['/user', '/transactions']}
                // defaultOpenKeys={upperPath}
                // defaultSelectedKeys={['/']}
                // mode="inline"
                mode="horizontal"
            >
                <Menu.Item key="/">
                    <NavLink exact to="/">
                        <PieChartOutlined />
                        <span>Home</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="/import">
                    <NavLink exact to="/import">
                        <ImportOutlined />
                        <span>Import</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="/transactions">
                    <NavLink exact to="/transactions">
                        <UnorderedListOutlined />
                        <span>Transactions</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="/budget">
                    <NavLink exact to="/budget">
                        <ShoppingCartOutlined />
                        <span>Budget</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="/settings">
                    <NavLink to="/settings/user">
                        <UserOutlined />
                        <span>{user}</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item className="nav-logout" key="/logout">
                    <Tooltip title="Logout">
                        <NavLink to="/logout">
                            <LogoutOutlined />
                            {/* <span>Logout</span> */}
                        </NavLink>
                    </Tooltip>
                </Menu.Item>
            </Menu>
            {/* <Dropdown overlay={menu(user)}>
                <Avatar icon={<UserOutlined />} />
            </Dropdown> */}
        </Header>
    );
}
