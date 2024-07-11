// components/HomePage.tsx

import React from 'react';
import { Row, Col, Typography, Button } from 'antd';
import { Link } from 'react-router-dom';
import AppFooter from '../components/Footer';

const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  return (
    <div style={{ padding: '50px' }}>
      <Row justify="center" align="middle" style={{ minHeight: '80vh' }}>
        <Col span={12}>
          <div style={{ textAlign: 'center' }}>
            <Title level={1}>Task Management System</Title>
            <Paragraph>
              Welcome to our task management system. Manage your tasks efficiently with our powerful tools.
            </Paragraph>
            <Button type="primary" size="large" style={{ marginRight: '10px' }}>
              <Link to="/login">Giriş Yap</Link>
            </Button>
            <Button type="default" size="large">
              <Link to="/register">Kaydol</Link>
            </Button>
          </div>
        </Col>
        <Col span={12}>
          <img src="/task-management-image.png" alt="Task Management" style={{ maxWidth: '100%' }} />
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
