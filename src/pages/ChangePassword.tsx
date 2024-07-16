// ChangePassword.tsx
import React from 'react';
import { Form, Input, Button, message, Typography, Card } from 'antd';
import { useAuth } from '../utils/AuthContext';
import userService from '../services/userService';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const { Title, Text } = Typography;

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ChangePassword: React.FC = () => {
  const { user, logout } = useAuth();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    if (user?.id !== undefined) {
      userService.updatePassword(user.id, values.password)
        .then(() => {
          message.success('Şifreniz güncellendi. Yeniden giriş yapmanız gerekiyor.');
          logout(); // Kullanıcıyı logout yap
          navigate('/login'); // Kullanıcıyı login sayfasına yönlendir
        })
        .catch(error => {
          message.error('Bir hata oluştu.');
        });
    }
  };

  return (
    <FormWrapper>
      <StyledCard>
        <Title level={2} style={{ textAlign: 'center' }}>Şifreyi Güncelle</Title>
        <Text type="secondary" style={{ display: 'block', marginBottom: '20px', textAlign: 'center' }}>
          Güvenliğiniz için şifrenizi düzenli olarak güncellemeniz önemlidir.
        </Text>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="password"
            label="Yeni Şifre"
            rules={[{ required: true, message: 'Lütfen yeni şifrenizi giriniz!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>Şifreyi Güncelle</Button>
          </Form.Item>
        </Form>
      </StyledCard>
    </FormWrapper>
  );
};

export default ChangePassword;
