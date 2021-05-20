import React from 'react';
import { useDispatch } from 'react-redux';
import {
    Button,
} from 'antd';

import { globalActions } from '../_redux';
import './style/style.css';


function ModalFooter(props) {
    // hooks
    const dispatch = useDispatch();

    const handleCancel = () => {
        if (props.handleCancel) return props.handleCancel();
        return dispatch(globalActions.hideModal());
    };

    return (
        <div className="global-modal-footer">
            <Button
                onClick={() => handleCancel()}
                style={{ marginRight: 10 }}
            >
                {props.cancelText || 'Cancel' }
            </Button>
            <Button
                loading={props.okButtonLoading}
                onClick={() => props.handleOk()}
                type="primary"
                htmlType="submit"
            >
                {props.okText || 'Ok' }
            </Button>
        </div>
    );
}

export default ModalFooter;
