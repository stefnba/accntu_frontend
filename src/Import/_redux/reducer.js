// import importConstants from './constants';
import { uploadConstants } from '../Upload/_redux';

const initialState = {
    upload: {
        step: 1,
        requesting: false,
        files: [],
    },
    accounts: {
        requesting: false,
        data: [],
    },
};

function importing(state = initialState, action) {
    switch (action.type) {
    // file upload
    case uploadConstants.UPLOAD_FILES.REQUEST:
        return {
            ...state,
            upload: {
                ...state.upload,
                requesting: true,
            },
        };
    case uploadConstants.UPLOAD_FILES.SUCCESS:
        return {
            ...state,
            upload: {
                ...state.upload,
                requesting: false,
                step: 1,
                files: action.data,
            },
        };
    case uploadConstants.UPLOAD_FILES.FAILURE:
        return {
            ...state,
            upload: {
                ...state.upload,
                requesting: false,
            },
        };
    // upload accounts
    case uploadConstants.FETCH_UPLOAD_ACCOUNTS.REQUEST:
        return {
            ...state,
            accounts: {
                ...state.accounts,
                requesting: true,
            },
        };
    case uploadConstants.FETCH_UPLOAD_ACCOUNTS.SUCCESS:
        return {
            ...state,
            accounts: {
                ...state.accounts,
                requesting: false,
                data: action.data,
            },
        };
    case uploadConstants.FETCH_UPLOAD_ACCOUNTS.FAILURE:
        return {
            ...state,
            accounts: {
                ...state.accounts,
                requesting: false,
            },
        };
    // default
    default:
        return state;
    }
}

export default importing;
