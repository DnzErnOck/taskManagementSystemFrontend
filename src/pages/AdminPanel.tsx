import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';
import UserTable from './UserTable';
import UserForm from './UserForm';
import AdminTable from './AdminTable';

const { Header, Sider, Content } = Layout;

const AdminPanel: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('userList');

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (e: any) => {
    setSelectedMenuItem(e.key);
  };

  const handleFormSubmit = async (values: any) => {
    console.log('Form submitted with values:', values);
  };

  const renderContent = () => {
    switch (selectedMenuItem) {
      case 'userList':
        return <UserTable />;
      case 'adminList':
        return <AdminTable />;
      default:
        return <UserTable />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>
        <Menu theme="dark" defaultSelectedKeys={['userList']} mode="inline" onClick={handleMenuClick}>
          <Menu.Item key="userList" icon={<UserOutlined />}>
            Kullanıcı Listesi
          </Menu.Item>
          <Menu.Item key="adminList" icon={<PlusOutlined />}>
            Admin Listesi
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <h2 style={{ color: 'white', textAlign: 'center' }}>Admin Panel</h2>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            {renderContent()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPanel;
