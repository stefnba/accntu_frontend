import transactionConstants from './constants';

const initialState = {
    transactionTable: {
        requesting: false,
        data: [],
        selectedRowKeys: [],
        pagination: {
            pageSize: 15,
            currentPage: 1,
            total: 0,
        },
        columns: [
            'date',
            'title',
            'account_name',
            'category',
            'bucket_name',
            'label_name',
            'status',
            'spending_amount',
            'account_amount',
        ],
    },
    transactionDetailView: {
        requesting: false,
        data: {},
    },
    filtering: {
        filtersApplied: {},
        filterOptions: {},
        showFilterNav: false,
    },
    updating: {
        showUpdateNav: false,
        labelOptions: {
            requesting: false,
            results: [],
        },
    },
};

export default function global(state = initialState, action) {
    switch (action.type) {
    // list transactions
    case transactionConstants.LIST_TRANSACTIONS.REQUEST:
        return {
            ...state,
            transactionTable: {
                ...state.transactionTable,
                requesting: true,

            },
        };
    case transactionConstants.LIST_TRANSACTIONS.SUCCESS:
        return {
            ...state,
            transactionTable: {
                ...state.transactionTable,
                requesting: true,
                data: action.data.transactions,
                pagination: {
                    ...state.transactionTable.pagination,
                    total: action.data.total,
                },
            },
        };
    case transactionConstants.LIST_TRANSACTIONS.FAILURE:
        return {
            ...state,
            transactionTable: {
                ...state.transactionTable,
                requesting: false,

            },
        };
    // default
    default:
        return state;
    }
}
