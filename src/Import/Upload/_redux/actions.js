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
function newUpload() {
    return {
        type: uploadConstants.NEW_UPLOAD.REQUEST,
        httpRequest: {
            method: 'POST',
            url: '/import/upload/new',
        },
    };
}


/**
 * get transactions list
 */
function newImportFromUpload(data) {
    return {
        type: uploadConstants.NEW_IMPORT_FROM_UPLOAD.REQUEST,
        httpRequest: {
            method: 'POST',
            url: '/import/new/upload',
            data,
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
    newUpload,
    fetchUploadAccounts,
    newImportFromUpload,
};

export default uploadActions;
