import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';

interface AdminFormProps {
  initialValues?: {
    id?: number;
    name: string;
    surname: string;
    email: string;
    password?: string;
  };
  onCancel: () => void;
  onSubmit: (values: any) => void;
}

const AdminForm: React.FC<AdminFormProps> = ({ initialValues, onCancel, onSubmit }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const onFinish = (values: any) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
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
      {!initialValues && (
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

export default AdminForm;
