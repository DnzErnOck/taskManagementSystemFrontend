import React, { useState, useEffect } from 'react';
import { List, Button, message, Card, Typography, Select, Modal } from 'antd';
import { Task } from '../types/Task';
import { deleteTask, updateTask, createTask } from '../services/taskService';
import { getTasksFiltered } from '../services/taskService';
import TaskForm from '../components/TaskForm';
import { PlusOutlined, SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
import { useAuth } from '../utils/AuthContext';

const { Title, Text } = Typography;
const { Option } = Select;

const TaskListPage: React.FC = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [resetForm, setResetForm] = useState(false);
  const [filteredStatus, setFilteredStatus] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    fetchTasks();
  }, [filteredStatus, sortOrder]);

  const fetchTasks = async () => {
    try {
      if (!user) {
        return;
      }

      const fetchedTasks = await getTasksFiltered(user.id, filteredStatus, sortOrder);
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      message.error('Görevler alınırken bir hata oluştu.');
    }
  };

  const handleDelete = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      fetchTasks();
      message.success('Görev başarıyla silindi.');
    } catch (error) {
      console.error('Error deleting task:', error);
      message.error('Görev silinirken bir hata oluştu.');
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsFormVisible(true);
    setResetForm(false);
  };

  const handleFormSubmit = async (taskData: Omit<Task, 'id' | 'createdDate'>) => {
    try {
      if (editingTask) {
        await updateTask({ ...taskData, id: editingTask.id });
        message.success('Görev başarıyla güncellendi.');
      } else {
        await createTask(taskData);
        message.success('Yeni görev başarıyla eklendi.');
      }

      setEditingTask(undefined);
      setIsFormVisible(false);
      setResetForm(true);
      fetchTasks();
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error('İşlem sırasında bir hata oluştu.');
    }
  };

  const handleStatusFilterChange = async (value: string | undefined) => {
    setFilteredStatus(value || undefined);
    setSortOrder('asc');
  };

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Yeni':
        return '#4876ff';
      case 'Çalışıyor':
        return '#87d068';
      case 'Tamamlandı':
        return '#f52d2d';
      default:
        return 'inherit';
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <Title level={2} style={{ textAlign: 'center' }}>Görev Listesi</Title>
      <div style={{ marginBottom: '20px', textAlign: 'right' }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => { setEditingTask(undefined); setIsFormVisible(true); setResetForm(true); }}
        >
          Yeni Görev Ekle
        </Button>
      </div>
      <Select
        style={{ width: 200, marginBottom: '20px' }}
        placeholder="Duruma göre filtrele"
        allowClear
        onChange={handleStatusFilterChange}
      >
        <Option value="NEW">Yeni</Option>
        <Option value="IN_PROGRESS">Çalışıyor</Option>
        <Option value="COMPLETE">Tamamlandı</Option>
      </Select>
      <Button
        type="link"
        icon={sortOrder === 'asc' ? <SortAscendingOutlined /> : <SortDescendingOutlined />}
        onClick={toggleSortOrder}
        style={{ float: 'right', marginBottom: '20px' }}
      >
        Sıralama: {sortOrder === 'asc' ? 'Artan' : 'Azalan'}
      </Button>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={tasks}
        renderItem={(task) => (
          <List.Item key={task.id}>
            <Card
              title={task.title}
              extra={
                <>
                  <Button type="link" onClick={() => handleEdit(task)}>Düzenle</Button>
                  <Button type="link" danger onClick={() => handleDelete(task.id)}>Sil</Button>
                </>
              }
            >
              <div style={{ marginBottom: '10px' }}>
                <Text strong>Durum: </Text>
                <span style={{ color: getStatusColor(task.taskStatus), marginLeft: '5px' }}>
                  {task.taskStatus}
                </span>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <Text strong>Oluşturma Tarihi: </Text>
                <span>{task.createdDate ? new Date(task.createdDate).toLocaleDateString() : '-'}</span>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <Text strong>Açıklama: </Text>
                <Text style={{ fontSize: '16px', lineHeight: '1.6', maxHeight: '120px', overflow: 'auto' }}>{task.description}</Text>
              </div>
            </Card>
          </List.Item>
        )}
      />
      <Modal
        title={editingTask ? 'Görevi Düzenle' : 'Yeni Görev Ekle'}
        visible={isFormVisible}
        onCancel={() => setIsFormVisible(false)}
        footer={null}
      >
        <TaskForm task={editingTask} onSubmit={handleFormSubmit} resetForm={resetForm} />
      </Modal>
    </div>
  );
};

export default TaskListPage;
