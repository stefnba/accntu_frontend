import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Upload,
    Button,
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';


import { uploadActions } from '../_redux';

const { Dragger } = Upload;


export default function UploadDraggerForm() {
    // hooks
    const dispatch = useDispatch();

    // store
    const { requesting: uploading } = useSelector((store) => store.importing.upload);

    // state
    const [uploadFiles, setUploadFile] = useState([]);
    const [uploadId, setUploadId] = useState(null);

    useEffect(() => {
        dispatch(uploadActions.newUpload())
            .then(({ data }) => setUploadId(data.upload_key))
            .catch((error) => console.log(error));
    }, [dispatch]);


    // actions
    const handleSetFile = (file) => {
        console.log(uploadId, file);
        setUploadFile([...uploadFiles, file]);
        return false;
    };

    const handleFileRemove = (fileToRemove) => {
        setUploadFile(uploadFiles.filter((file) => file.uid !== fileToRemove.uid));
    };

    const handleUpload = () => {
        // form data
        const formData = new FormData();
        console.log(uploadFiles);
        uploadFiles.forEach((file) => {
            formData.append('files[]', file);
        });
        formData.append('upload_key', uploadId);

        // upload
        dispatch(uploadActions.uploadFiles(formData));
    };

    return (
        <>
            <Dragger
                multiple
                beforeUpload={handleSetFile}
                onRemove={handleFileRemove}
                // fileList={uploadFiles}
                // onChange={handleChange}
            >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
        band files
                </p>
            </Dragger>
            <Button
                disabled={uploadFiles.length === 0}
                loading={uploading}
                type="primary" onClick={() => handleUpload()}
            >
            Start Import
            </Button>
        </>
    );
}
