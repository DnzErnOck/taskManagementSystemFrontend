import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Typography } from 'antd';
import { useAuth } from '../utils/AuthContext';
import userService from '../services/userService';

const { Title } = Typography;

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [id, setId] = useState<number | undefined>(undefined); // Kullanıcı ID'sini state olarak tutuyoruz
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user?.id !== undefined) {
      setId(user.id); // AuthContext'ten alınan kullanıcı ID'sini state'e set ediyoruz
      // Kullanıcı bilgilerini formun değerlerine set ediyoruz
      userService.getUserById(user.id).then(response => {
        form.setFieldsValue({
          name: response.name,
          surname: response.surname,
          email: response.email,
        });
        setPassword(response.password);
      });
    }
  }, [user, form]);

  const onFinish = (values: any) => {
    if (id === undefined) {
      message.error('Kullanıcı bilgileri alınamadı.');
      return;
    }

    // Güncellenecek kullanıcı bilgileri
    const updatedUserInfo = {
      id,
      name: values.name,
      surname: values.surname,
      email: values.email,
      password: password, // Şifreyi formdan aldık
    };

    // Kullanıcı bilgilerini güncelleme isteği gönderiyoruz
    userService.updateUser(updatedUserInfo)
      .then(() => {
        message.success('Bilgileriniz güncellendi.');
      })
      .catch(error => {
        message.error('Bir hata oluştu.');
      });
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <Title level={2}>Profil Bilgileri</Title>
      {/* Form componentini kullanarak profil bilgilerini güncelleyebiliriz */}
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="name" label="Adınız">
          <Input />
        </Form.Item>
        <Form.Item name="surname" label="Soyadınız">
          <Input />
        </Form.Item>
        <Form.Item name="email" label="E-posta Adresiniz">
          <Input />
        </Form.Item>
        {/* Şifre alanını formda görünmez yapıyoruz */}
        <Form.Item style={{ display: 'none' }} name="password">
          <Input type="password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>Bilgileri Güncelle</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Profile;
