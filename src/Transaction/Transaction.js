import React from 'react';

import TransactionTable from './Table';
// import FilterNav from './Filtering';
// import UpdatingNav from './Updating';


// import './style/style.css';

export default function Transaction() {
    return (
        <div className="page-container transparent no-gap">
            {/* <FilterNav />
            <UpdatingNav /> */}
            <TransactionTable />
        </div>
    );
}
