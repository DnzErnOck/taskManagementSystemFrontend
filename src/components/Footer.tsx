import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const AppFooter: React.FC = () => {
  return (
    <Footer style={{ textAlign: 'center' }}>
      Task Manager ©2023 Created by Taskify
    </Footer>
  );
};

export default AppFooter;
