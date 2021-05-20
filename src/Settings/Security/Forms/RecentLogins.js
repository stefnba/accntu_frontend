import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    List,
} from 'antd';
import moment from 'moment';

import { securityActions } from '../_redux';

function RecentLoginsForm() {
    const dispatch = useDispatch();
    const { data: userLogins } = useSelector((state) => state.security.logins);

    useEffect(() => {
        dispatch(securityActions.fetchUserlogins());
    }, [dispatch]);

    return (
        <List
            bordered
            dataSource={userLogins}
            renderItem={(item) => (
                <List.Item>
                    {moment(item.login_at).format('DD-MMM yy HH:mm')} | {item.is_success ? 'yes' : 'no'} | {item.browser}
                </List.Item>
            )}
        />
    );
}


const modalForm = {
    content: RecentLoginsForm,
    title: 'Recent Logins',
    // handleOk: () => alert(1),
    width: 1200,
    // footer: null,
};

export default modalForm;
