import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';

interface UserFormProps {
  initialValues?: {
    id: number;
    name: string;
    surname: string;
    email: string;
    password?: string; // Password alanı opsiyonel olarak tanımlandı
  };
  onCancel?: () => void;
  onSubmit: (values: any) => void;
}

const UserForm: React.FC<UserFormProps> = ({ initialValues, onCancel, onSubmit }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!initialValues) {
      form.resetFields(); // initialValues yoksa formu sıfırla
    } else {
      form.setFieldsValue(initialValues); // initialValues varsa formu initialValues ile doldur
    }
  }, [initialValues, form]);

  const onFinish = (values: any) => {
    onSubmit(values);
    form.resetFields(); // Form submit edildikten sonra formu sıfırla
  };

  const isUpdateMode = initialValues && initialValues.id !== undefined; // Güncelleme modunda mı kontrolü

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={initialValues} // initialValues prop'unu Form component'ine doğrudan aktarıyoruz
    >
      <Form.Item
        label="Ad"
        name="name"
        rules={[{ required: true, message: 'Lütfen adınızı girin!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Soyad"
        name="surname"
        rules={[{ required: true, message: 'Lütfen soyadınızı girin!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="E-posta"
        name="email"
        rules={[{ required: true, message: 'Lütfen e-postanızı girin!' }]}
      >
        <Input />
      </Form.Item>
      {!isUpdateMode && ( // Eğer güncelleme modunda değilse password alanını göster
        <Form.Item
          label="Şifre"
          name="password"
          rules={[{ required: true, message: 'Lütfen şifrenizi girin!' }]}
        >
          <Input.Password />
        </Form.Item>
      )}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Kaydet
        </Button>
        <Button style={{ marginLeft: '10px' }} onClick={onCancel}>
          İptal
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
