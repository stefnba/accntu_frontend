import globalConstants from './constants';


/**
 * Show modal
 */
function showModal(modal, options = {}) {
    return {
        type: globalConstants.MODAL.SHOW,
        modal,
        options,
    };
}

/**
 * Hide modal
 */
function hideModal() {
    return {
        type: globalConstants.MODAL.HIDE,
    };
}


const globalActions = {
    showModal,
    hideModal,
};

export default globalActions;
