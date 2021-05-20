import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;


const PrivateFooter = () => (
    <Footer style={{ textAlign: 'center' }}>
        App ©2021
        <br />
        Created by Stefan Jakob Bauer
    </Footer>
);

export default PrivateFooter;
