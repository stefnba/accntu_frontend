import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';

import { UploadDraggerForm, UploadSelectionForm } from './Forms';

import { uploadActions } from './_redux';


export default function Uploader() {
    // hooks
    const dispatch = useDispatch();

    // store
    const { step } = useSelector((store) => store.importing.upload);

    // state
    const [uploadFiles, setUploadFile] = useState([]);
    const [uploadId, setUploadId] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        dispatch(uploadActions.newUpload())
            .then(({ data }) => setUploadId(data.upload_key))
            .catch((error) => console.log(error));
    }, [dispatch]);


    // actions

    return (
        <>
            {step === 0 && <UploadDraggerForm />}
            {step === 1 && <UploadSelectionForm />}
        </>
    );
}
