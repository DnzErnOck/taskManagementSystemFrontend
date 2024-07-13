import React, { useEffect, useState } from 'react';
import { Table, Button, message, Modal } from 'antd';
import adminService from '../services/adminService';
import AdminForm from './AdminForm';
import { CreateAdminRequest } from '../models/Requests/Admin/CreateAdminRequest';
import { AdminResponse } from '../models/Responses/Admin/AdminResponse';
import { UpdateAdminRequest } from '../models/Requests/Admin/UpdateAdminRequest';

const AdminTable: React.FC = () => {
  const [admins, setAdmins] = useState<AdminResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingAdmin, setEditingAdmin] = useState<AdminResponse | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const fetchAdmins = async () => {
    try {
      const response = await adminService.getAllAdmins();
      setAdmins(response);
    } catch (error) {
      message.error('Yöneticiler yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await adminService.deleteAdmin(id);
      setAdmins(admins.filter(admin => admin.id !== id));
      message.success('Yönetici başarıyla silindi');
    } catch (error) {
      message.error('Yönetici silinirken bir hata oluştu');
    }
  };

  const handleEdit = (admin: AdminResponse) => {
    setEditingAdmin(admin);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setEditingAdmin(null);
    setIsModalVisible(false);
  };

  const handleFormSubmit = async (values: CreateAdminRequest | UpdateAdminRequest) => {
    try {
      if (editingAdmin) {
        // Update case
        const updateValues = { ...values, id: editingAdmin.id,password:editingAdmin.password } as UpdateAdminRequest;
        await adminService.updateAdmin(updateValues);
        setAdmins(admins.map(admin => (admin.id === updateValues.id ? { ...admin, ...updateValues } : admin)));
        message.success('Yönetici başarıyla güncellendi');
      } else {
        // Create case
        const response = await adminService.createAdmin(values as CreateAdminRequest);
        setAdmins([...admins, response]);
        message.success('Yönetici başarıyla oluşturuldu');
      }
    } catch (error) {
      message.error('Yönetici işlemi sırasında bir hata oluştu');
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
      render: (_: any, record: AdminResponse) => (
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
        Yeni Yönetici
      </Button>
      <Table dataSource={admins} columns={columns} loading={loading} rowKey="id" />
      <Modal
        title={editingAdmin ? 'Yöneticiyi Güncelle' : 'Yeni Yönetici'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <AdminForm
          initialValues={editingAdmin ? { id: editingAdmin.id, name: editingAdmin.name, surname: editingAdmin.surname, email: editingAdmin.email,password:editingAdmin.password } : undefined}
          onCancel={handleCancel}
          onSubmit={handleFormSubmit}
        />
      </Modal>
    </>
  );
};

export default AdminTable;
