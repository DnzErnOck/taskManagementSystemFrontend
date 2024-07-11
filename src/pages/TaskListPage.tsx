import React, { useState, useEffect } from 'react';
import { List, Button, message, Card, Typography, Select } from 'antd';
import { Task } from '../types/Task';
import { getAllTasks, deleteTask, updateTask, createTask, getTasksByStatus } from '../services/taskService';
import TaskForm from '../components/TaskForm';
import { PlusOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

const TaskListPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [resetForm, setResetForm] = useState(false); // State to reset form fields
  const [filteredStatus, setFilteredStatus] = useState<string | undefined>(undefined);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      let fetchedTasks: Task[] = [];
      if (filteredStatus) {
        fetchedTasks = await getTasksByStatus(filteredStatus);
      } else {
        fetchedTasks = await getAllTasks();
      }
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      message.error('Görevler alınırken bir hata oluştu.');
    }
  };

  const handleDelete = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      fetchTasks(); // Görev silindikten sonra liste yenileme
      message.success('Görev başarıyla silindi.');
    } catch (error) {
      console.error('Error deleting task:', error);
      message.error('Görev silinirken bir hata oluştu.');
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsFormVisible(true);
    setResetForm(false); // Reset form state to false when editing
  };

  const handleFormSubmit = async (taskData: Omit<Task, 'id' | 'createdDate'>) => {
    try {
      if (editingTask) {
        await updateTask({ ...taskData, id: editingTask.id }); // Include task id when updating
        message.success('Görev başarıyla güncellendi.');
      } else {
        await createTask(taskData);
        message.success('Yeni görev başarıyla eklendi.');
      }
      setEditingTask(undefined);
      setIsFormVisible(false);
      setResetForm(true); // Trigger form reset
      fetchTasks(); // Form gönderildikten sonra liste yenileme
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error('İşlem sırasında bir hata oluştu.');
    }
  };

  const handleStatusFilterChange = async (value: string | undefined) => {
    setFilteredStatus(value);
    try {
      let filteredTasks: Task[] = [];
      if (value === "") {
        filteredTasks = await getAllTasks(); // Tüm görevleri getir
      } else {
        filteredTasks = await getTasksByStatus(value!); // Belirli duruma göre filtrele
      }
      setTasks(filteredTasks);
    } catch (error) {
      console.error('Error fetching tasks by status:', error);
      message.error('Duruma göre filtreleme sırasında bir hata oluştu.');
    }
  };

  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Yeni':
        return '#4876ff';
      case 'Çalışıyor':
        return '#87d068'; // Yeşil
      case 'Tamamlandı':
        return '#f52d2d'; // Kırmızı
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
        <Option value="">Tümü</Option>
        <Option value="Çalışıyor">Çalışıyor</Option>
        <Option value="Tamamlandı">Tamamlandı</Option>
      </Select>
      {isFormVisible && (
        <Card style={{ marginBottom: '20px' }}>
          <TaskForm task={editingTask} onSubmit={handleFormSubmit} resetForm={resetForm} />
        </Card>
      )}
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
              <Text>{task.description}</Text>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default TaskListPage;
