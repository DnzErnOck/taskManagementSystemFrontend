import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Typography, Card } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Giriş işlemi burada yapılacak
  };

  return (
    <Row justify="center" align="middle" style={{ height: '60vh', backgroundColor: '#f0f2f5' }}>
      <Col>
        <Card
          style={{
            width: 400,
            textAlign: 'center',
            borderRadius: 10,
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          }}
        >
          <Title level={2}>Giriş Yap</Title>
          <Form layout="vertical" style={{ textAlign: 'left' }}>
            <Form.Item label="Email">
              <Input
                prefix={<MailOutlined />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email adresinizi giriniz"
              />
            </Form.Item>
            <Form.Item label="Şifre">
              <Input.Password
                prefix={<LockOutlined />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Şifrenizi giriniz"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={handleLogin} block>
                Giriş Yap
              </Button>
            </Form.Item>
            <Form.Item>
              <span>Üyeliğiniz yoksa <Link to="/register">kaydolun</Link></span>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginPage;
