import transactionConstants from './constants';

/**
 * get transactions list
 */
function listTransactions() {
    return {
        type: transactionConstants.LIST_TRANSACTIONS.REQUEST,
        httpRequest: {
            url: '/transactions',
        },
    };
}


const transactionActions = {
    listTransactions,
};

export default transactionActions;
