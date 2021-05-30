import uploadConstants from './constants';

/**
 * get transactions list
 */
function uploadFiles(data) {
    return {
        type: uploadConstants.UPLOAD_FILES.REQUEST,
        httpRequest: {
            method: 'POST',
            url: '/import/upload/file',
            data,
        },
    };
}


/**
 * get transactions list
 */
function newImportFromUpload(files, uploadKey) {
    return {
        type: uploadConstants.NEW_IMPORT_FROM_UPLOAD.REQUEST,
        httpRequest: {
            method: 'POST',
            url: '/import/new/upload',
            data: {
                files,
                key: uploadKey,
            },
        },
    };
}


/**
 * get upload accounts
 */
function fetchUploadAccounts() {
    return {
        type: uploadConstants.FETCH_UPLOAD_ACCOUNTS.REQUEST,
        httpRequest: {
            url: '/accounts',
        },
    };
}


const uploadActions = {
    uploadFiles,
    fetchUploadAccounts,
    newImportFromUpload,
};

export default uploadActions;
