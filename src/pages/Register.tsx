

import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Typography, Card } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Kayıt işlemi burada yapılacak
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
          <Title level={2}>Kaydol</Title>
          <Form layout="vertical" style={{ textAlign: 'left' }}>
            <Form.Item label="Ad">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Adınızı giriniz"
              />
            </Form.Item>
            <Form.Item label="Soyad">
              <Input
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                placeholder="Soyadınızı giriniz"
              />
            </Form.Item>
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
              <Button type="primary" onClick={handleRegister} block>
                Kaydol
              </Button>
            </Form.Item>
            <Form.Item>
              <span>Zaten üye misiniz? <Link to="/login">Giriş yapın</Link></span>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Register;
