import React, { useEffect, useState } from 'react';
import { Table, Button, message, Modal } from 'antd';
import userService from '../services/userService';
import UserForm from './UserForm';
import { CreateUserRequest } from '../models/Requests/User/CreateUserRequest';
import { UserResponse } from '../models/Responses/User/UserResponse';
import { UpdateUserRequest } from '../models/Requests/User/UpdateUserRequest';

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingUser, setEditingUser] = useState<UserResponse | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getByRoleType();
        setUsers(response);
      } catch (error) {
        message.error('Kullanıcılar yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await userService.deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
      message.success('Kullanıcı başarıyla silindi');
    } catch (error) {
      message.error('Kullanıcı silinirken bir hata oluştu');
    }
  };

  const handleEdit = (user: UserResponse) => {
    setEditingUser(user);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setEditingUser(null);
    setIsModalVisible(false);
  };

  const handleFormSubmit = async (values: CreateUserRequest | UpdateUserRequest) => {
    try {
      if (editingUser && 'id' in editingUser) {
        // Update case
        const updateValues = { ...values, id: editingUser.id,password:editingUser.password };
        await userService.updateUser(updateValues);
        setUsers(users.map(user => (user.id === updateValues.id ? { ...user, ...updateValues } : user)));
        message.success('Kullanıcı başarıyla güncellendi');
      } else {
        // Create case
        const response = await userService.createUser(values as CreateUserRequest);
        if (response) {
          const newUser = response as UserResponse;
          setUsers([...users, newUser]);
          message.success('Kullanıcı başarıyla oluşturuldu');
        } else {
          message.error('Kullanıcı oluşturma başarısız oldu');
        }
      }
    } catch (error) {
      message.error('Kullanıcı işlemi sırasında bir hata oluştu');
    } finally {
      handleCancel();
    }
  };

  const columns = [
    { title: 'id', dataIndex: 'id', key: 'id' },
    { title: 'Ad', dataIndex: 'name', key: 'name' },
    { title: 'Soyad', dataIndex: 'surname', key: 'surname' },
    { title: 'E-posta', dataIndex: 'email', key: 'email' },
    { title: 'Rol', dataIndex: 'roleType', key: 'roleType' },
    {
      title: 'İşlemler',
      key: 'actions',
      render: (_: any, record: UserResponse) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>Güncelle</Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            Sil
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ marginBottom: '16px' }}>
        Yeni Kullanıcı
      </Button>
      <Table dataSource={users} columns={columns} loading={loading} rowKey="id" />
      <Modal
        title={editingUser ? 'Kullanıcıyı Güncelle' : 'Yeni Kullanıcı'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <UserForm
          initialValues={editingUser ? { id: editingUser.id, name: editingUser.name, surname: editingUser.surname, email: editingUser.email,password:editingUser.password } : undefined}
          onCancel={handleCancel}
          onSubmit={handleFormSubmit}
        />
      </Modal>
    </>
  );
};

export default UserTable;
