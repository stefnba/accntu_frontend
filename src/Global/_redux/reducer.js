import globalConstants from './constants';

const initialState = {
    modal: {
        visible: false,
        modalKey: null,
    },
};

export default function global(state = initialState, action) {
    switch (action.type) {
    // modal
    case globalConstants.MODAL.SHOW:
        return {
            ...state,
            modal: {
                ...state.modal,
                visible: true,
                modalKey: action.modal,
                options: action.options,

            },
        };
    case globalConstants.MODAL.HIDE:
        return {
            ...state,
            modal: {
                ...state.modal,
                visible: false,
                modalKey: null,
            },
        };
    // default
    default:
        return state;
    }
}
