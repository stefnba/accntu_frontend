

/**
 * Show feedback banner
 */
function show(actionType, feedbackType, message) {
    return {
        type: actionType,
        payload: {
            type: feedbackType,
            message,
        },
    };
}


/**
 * Show feedback banner
 */
function hide(actionType) {
    return {
        type: actionType,
        payload: null,
    };
}


const feedbackBannerActions = {
    show,
    hide,
};

export default feedbackBannerActions;
