import React, { useEffect } from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import {
    Modal,
} from 'antd';

import { globalActions } from '../_redux';

import {
    RecentLoginsForm as recentLogins,
    PasswordChangeForm as passwordChange,
    Setup2FAForm as setup2FA,
    Deactivate2FAForm as deactivate2FA,
} from '../../Settings/Security/Forms';


const modalsRegister = {
    passwordChange,
    recentLogins,
    setup2FA,
    deactivate2FA,
};


export default function GlobalModal() {
    // hooks
    const dispatch = useDispatch();

    // store
    const { visible, modalKey, options } = useSelector((state) => state.global.modal);

    // other
    const modal = modalsRegister[modalKey] || [];
    const { content: Component = null } = modal;

    useEffect(() => () => {
        dispatch(globalActions.hideModal());
    }, [dispatch]);

    return (
        <Modal
            destroyOnClose={true}
            visible={visible}
            title={modal.title || null}
            onOk={modal.handleOk}
            onCancel={() => dispatch(globalActions.hideModal())}
            width={modal.width || 520}
            footer={modal.footer}
            closable={modal.closable}
        >
            { modal.content
                && <Component {...options} />
            }
        </Modal>
    );
}
