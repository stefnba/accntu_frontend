import React from 'react';
import { useSelector } from 'react-redux';

import { UploadDraggerForm, UploadSelectionForm } from './Forms';


export default function Uploader() {
    // store
    const { step } = useSelector((store) => store.importing.upload);

    return (
        <>
            {step === 0 && <UploadDraggerForm />}
            {step === 1 && <UploadSelectionForm />}
        </>
    );
}
