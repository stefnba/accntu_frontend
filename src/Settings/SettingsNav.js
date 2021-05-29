import React from 'react';
import {
    NavLink,
    useLocation,
} from 'react-router-dom';
import {
    Menu,
} from 'antd';


export default function SettingsNav() {
    const location = useLocation();
    return (
        <Menu
            className="settings-menu"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            selectedKeys={location.pathname}
        >
            {/* Item group */}
            <Menu.ItemGroup key="user-settings" title="User Account">
                <Menu.Item key="/settings/user">
                    <NavLink exact to="/settings/user">
                        Profile
                    </NavLink>
                </Menu.Item>

                <Menu.Item key="/settings/security">
                    <NavLink exact to="/settings/security">
                        Security
                    </NavLink>
                </Menu.Item>
            </Menu.ItemGroup>
        </Menu>
    );
}
