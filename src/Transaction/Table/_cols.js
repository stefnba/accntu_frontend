// import React from 'react';
// import {
// // Tag,
// } from 'antd';
import {
} from '@ant-design/icons';
// import moment from 'moment';

import {
    // constants,
    helpers,
} from '../../_shared';


const columns = [
    {
        title: 'Date',
        dataIndex: 'date',
        width: 80,
        key: 'date',
        render: (date) => helpers.date.parseDate(date),
        sorter: (a, b) => a.date.localeCompare(b.date),
        sortDirections: ['descend', 'ascend'],
        defaultSortOrder: 'descend',
        index: 1,
    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        width: 250,
        ellipsis: {
            showTitle: false,
        },
        index: 2,
    },
];


const selectedTableCols = (selectedCols) => {
    // actions always shown
    const colsToShow = [...selectedCols, 'actions'];
    return colsToShow.map((col) => columns.filter((c) => c.key === col)[0]);
};


const selectableTableCols = columns.filter((col) => col.key !== 'actions');


export default selectedTableCols;
export {
    columns,
    selectableTableCols,
};
