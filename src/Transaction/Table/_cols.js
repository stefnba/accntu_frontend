import React from 'react';
import {
    Button,
    Dropdown,
    Menu,
    Tag,
    Tooltip,
} from 'antd';
import {
    EllipsisOutlined,
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    ToolOutlined,
    HistoryOutlined,
} from '@ant-design/icons';
// import moment from 'moment';

import {
    constants,
    helpers,
} from '../../_shared';

const { SubMenu } = Menu;

const RowActionMenu = ({ id }) =>
    // const [modalState, modalDispatch] = useToggleModalVisibility();
    (
        <Menu style={{ width: 200 }}>
            <Menu.ItemGroup title="More options">
                <Menu.Item
                    icon={<EyeOutlined />}
                    key="view"
                >
                        View
                </Menu.Item>
                <Menu.Item icon={<EditOutlined />} key="edit">Edit</Menu.Item>
                <SubMenu icon={<ToolOutlined />} key="update" title="Quick Update">
                    <Menu.ItemGroup style={{ width: 200 }} title="Quick Update">
                        <SubMenu key="status" title="Status">
                            <Menu.ItemGroup style={{ width: 200 }} title="Status">
                                <Menu.Item key="status-update-transfer">Transfer</Menu.Item>
                                <Menu.Item key="status-update-debit">Debit</Menu.Item>
                                <Menu.Item key="status-update-credit">Credit</Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>
                        <SubMenu key="category" title="Category">
                            <Menu.ItemGroup style={{ width: 200 }} title="Category">
                                <Menu.Item key="category-update-private">Private</Menu.Item>
                                <Menu.Item key="category-update-business">Business</Menu.Item>
                                <Menu.Item key="category-update-null">No Category</Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>
                    </Menu.ItemGroup>
                </SubMenu>
                <Menu.Item icon={<HistoryOutlined />} key="change-history">Change history</Menu.Item>
                <Menu.Divider />
                <Menu.Item danger={true} icon={<DeleteOutlined />} key="delete">Delete</Menu.Item>
            </Menu.ItemGroup>
        </Menu>
    );
const columns = [
    {
        title: 'Date',
        dataIndex: 'date',
        width: 95,
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
        // render: (title, row) => <RenderTitle title={title} transactionID={row.id} />,
        index: 2,
    },
    {
        title: 'Account',
        dataIndex: 'account_name',
        key: 'account_name',
        width: 150,
        ellipsis: true,
        index: 3,
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        render: (category) => constants.categoryTypes[category],
        width: 90,
        ellipsis: true,
        index: 4,
    },
    {
        title: 'Bucket',
        dataIndex: 'bucket_name',
        key: 'bucket_name',
        width: 100,
        ellipsis: true,
        index: 5,
    },
    {
        title: 'Label',
        dataIndex: 'label_name',
        key: 'label_name',
        width: 100,
        ellipsis: true,
        index: 6,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: 50,
        render: (status) => {
            const color = {
                2: 'green',
                1: 'red',
                0: 'orange',
            };

            return (
                <Tag color={color[status]}>{constants.statusTypes[status]}</Tag>
            );
        },
        index: 6,
    },
    {
        title: 'Spending',
        dataIndex: 'spending_amount',
        key: 'spending_amount',
        render: (amount, row) => helpers.amount.parseAmount(amount, row.spending_currency),
        align: 'right',
        width: 90,
        index: 7,
    },
    {
        title: 'Acccount',
        dataIndex: 'account_amount',
        key: 'account_amount',
        render: (amount, row) => helpers.amount.parseAmount(amount, row.account_currency),
        align: 'right',
        width: 90,
        index: 8,
    },
    {
        title: 'User',
        dataIndex: 'user_amount',
        key: 'user_amount',
        render: (amount, row) => helpers.amount.parseAmount(amount, row.user_currency),
        align: 'right',
        width: 90,
        index: 9,
    },
    {
        title: 'IBAN',
        dataIndex: 'iban',
        key: 'iban',
        width: 140,
        ellipsis: true,
        index: 10,
    },
    {
        title: '',
        key: 'actions',
        width: 30,
        render: (amount, row) => (
            <span
                className="transaction-table-actions"
            >
                <Dropdown overlay={RowActionMenu(row)}>
                    <Button
                        style={{ height: 20, width: 20 }}
                        size="small"
                        type="link"
                        icon={<EllipsisOutlined />}
                    />
                </Dropdown>
            </span>
        ),
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
