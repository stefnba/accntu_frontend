import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Table,
} from 'antd';

import { transactionActions } from '../_redux';
import selectedTableCols, { columns } from './_cols';


export default function TransactionTable() {
    const dispatch = useDispatch();
    const { transactionTable } = useSelector((state) => state.transaction);
    const {
        data: transactions,
        selectedRowKeys,
        requesting,
        pagination,
        // columns,
    } = transactionTable;

    useEffect(() => {
        dispatch(transactionActions.listTransactions());
    }, [dispatch]);

    return (
        <Table
            className="transaction-table"
            size="small"
            rowKey="id"
            columns={columns}
            dataSource={transactions}
        />
    );
}
