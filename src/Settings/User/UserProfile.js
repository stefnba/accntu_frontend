import React from 'react';
import {
    PageHeader,
} from 'antd';

import { UserUpdateForm } from './Forms';


export default function UserProfile() {
    return (
        <div>
            <PageHeader style={{ paddingLeft: 0 }} title="User Profile" />
            <UserUpdateForm />
        </div>
    );
}
