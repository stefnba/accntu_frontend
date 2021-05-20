import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    useParams,
    Link,
} from 'react-router-dom';
import {
    Result,
    Button,
} from 'antd';
import { SmileOutlined } from '@ant-design/icons';

import { authActions } from './_redux';


export default function SignupValidation() {
    // hooks
    const dispatch = useDispatch();
    const { validationKey = null } = useParams();

    // state
    const [res, setRes] = useState({ success: null, description: null });

    useEffect(() => {
        dispatch(authActions.validateUser(validationKey))
            .then(({ data }) => setRes({
                success: true,
                description: data.description,
            }))
            .catch((error) => setRes({
                success: false,
                description: error.data.description,
            }));
    }, [dispatch, validationKey]);

    return (
        <>
            {
                res.success !== null
                && (
                    <Result
                        icon={res.success ? <SmileOutlined /> : null}
                        title={res.description}
                        status={res.success ? 'success' : 'error'}
                        extra={
                            res.success
                    && (
                        <Link to="/login">
                            <Button type="primary">Login</Button>
                        </Link>

                    )
                        }
                    />

                )
            } </>
    );
}
