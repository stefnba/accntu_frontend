import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    List,
    Avatar,
    Select,
    Button,
} from 'antd';
// import { InboxOutlined } from '@ant-design/icons';

import { uploadActions } from '../_redux';

const { Option } = Select;


export default function UploadSelectionForm() {
    // hooks
    const dispatch = useDispatch();

    // state
    const [importFiles, setImportFiles] = useState({});

    // store
    // const { files } = useSelector((store) => store.importing.upload);
    const { data: uploadAccount } = useSelector((store) => store.importing.accounts);

    const files = [
        {
            key: 'jX71mhZwNZvtxLLwVwfk4iPIlbxwOcDJ_H3AIgcriVXMbwzKb__.fZsT1TELVz7u',
            name: '5310________7734.csv',
            extension: 'csv',
        },
        {
            key: 'RD2ph7AF.rW~ewJAMVVH5Nmhdd~Jo4ox-xkQfU-c_mFvPt6ZonIFsbVc~heoTIeM',
            name: '5310________7734.csv',
            extension: 'csv',
        },
    ];

    // lifecycle
    useEffect(() => {
        dispatch(uploadActions.fetchUploadAccounts());
    }, [dispatch]);


    // actions
    const handleSelectAccount = (accountValue, fileKey) => {
        // remove from current account if already previously selected
        const { removalAccount, newFiles = [] } = Object.entries(importFiles).map(
            ([account, filesToCheck]) => {
                // check if array for given account object contains fileKey
                if (filesToCheck.includes(fileKey)) {
                    return {
                        removalAccount: account,
                        newFiles: filesToCheck.filter((f) => f !== fileKey) || [],
                    };
                }
                return false;
            },
        // exclude all entries from map-return array that are false, i.e. not match
        ).filter((i) => i)[0] || {};

        // add to target account
        setImportFiles({
            ...importFiles,
            [accountValue]: [
                ...importFiles[accountValue] || [],
                fileKey,
            ],
            [removalAccount]: newFiles,
        });
    };

    const handleImport = () => {
        delete importFiles[undefined];
        dispatch(uploadActions.newImportFromUpload(importFiles));
    };


    return (
        <>
            <List
                dataSource={files}
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <Select
                                onChange={(value) => handleSelectAccount(value, item.key)}
                                style={{ width: 180 }}
                            >
                                {uploadAccount.map((account) => (
                                    <Option value={account.id}>{account.account_name}</Option>
                                ))}
                            </Select>,
                        ]}
                    >
                        <List.Item.Meta
                            avatar={
                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            }
                            title={item.name}
                        />
                    </List.Item>
                )}
            />
            <Button
                type="primary"
                disabled={Object.keys(importFiles).length === 0}
                onClick={handleImport}>Import</Button>
        </>
    );
}
