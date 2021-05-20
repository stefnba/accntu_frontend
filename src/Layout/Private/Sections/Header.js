import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
    Layout,
    Dropdown,
    Avatar,
    Menu,
} from 'antd';
import {
    LogoutOutlined,
    UserOutlined,
} from '@ant-design/icons';

const { Header } = Layout;

const menu = (user) => (
    <Menu
        style={{ width: 200 }}
    >
        <Menu.ItemGroup title={user}>
            <Menu.Divider />
            <Menu.Item
                icon={<UserOutlined />}
                key="status-update-transfer"
            >
                <NavLink exact to="/settings/user">
                    Account Settings
                </NavLink>
            </Menu.Item>
            <Menu.Item
                icon={<LogoutOutlined />}
                key="logout"
            >
                <NavLink exact to="/logout">
                    Logout
                </NavLink>
            </Menu.Item>
        </Menu.ItemGroup>
    </Menu>
);

export default function PrivateNav() {
    const {
        last_name: last,
        first_name: first,
    } = useSelector((state) => state.user.userInfo.data || {});
    const user = `${first} ${last}`;
    return (
        <Header className="global-header"
            style={
                {
                    background: '#fff',
                    padding: 0,
                    textAlign: 'right',
                    paddingRight: 24,
                    zIndex: 1,
                    position: 'fixed',
                    top: '0',
                    // width: '100%',
                    left: 0,
                    right: 0,
                }
            }
        >
            <Dropdown overlay={menu(user)}>
                <Avatar icon={<UserOutlined />} />
            </Dropdown>
        </Header>
    );
}
