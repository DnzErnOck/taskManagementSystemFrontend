import React, { useState, useEffect } from 'react';
import { List, Button, message, Card, Typography, Select, Modal } from 'antd';
import { Task } from '../types/Task';
import { getAllTasks, deleteTask, updateTask, createTask, getTasksByStatus, getTasksOrderedByCreateDate, getTasksByUserId } from '../services/taskService';
import TaskForm from '../components/TaskForm';
import { PlusOutlined, SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
import { useAuth } from '../utils/AuthContext'; // useAuth hook'unu import ediyoruz

const { Title, Text } = Typography;
const { Option } = Select;

const TaskListPage: React.FC = () => {
  const { user } = useAuth(); // useAuth hook'undan kullanıcıyı alıyoruz
  const [tasks, setTasks] = useState<Task[]>([]); // State to hold tasks fetched from backend
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined); // State for currently editing task
  const [isFormVisible, setIsFormVisible] = useState(false); // State to control visibility of task form modal
  const [resetForm, setResetForm] = useState(false); // State to trigger form reset
  const [filteredStatus, setFilteredStatus] = useState<string | undefined>(undefined); // State to hold status filter
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // State to hold sort order

  useEffect(() => {
    fetchTasks();
  }, [filteredStatus, sortOrder]); // Fetch tasks on component mount and when filters or sort order change

  // Function to fetch tasks from backend based on filters and sort order
  const fetchTasks = async () => {
    try {
      if (!user) {
        return; // Eğer kullanıcı yoksa hiçbir şey yapma
      }

      let fetchedTasks: Task[] = [];

      // Kullanıcı ID'sine göre görevleri al
      fetchedTasks = await getTasksByUserId(user.id);

      // Check if a status filter is applied
      if (filteredStatus) {
        fetchedTasks = fetchedTasks.filter(task => task.taskStatus === filteredStatus);
      }

      // Apply local sorting based on sort order
      if (sortOrder === 'asc') {
        fetchedTasks.sort((a, b) => (a.createdDate > b.createdDate ? 1 : -1));
      } else if (sortOrder === 'desc') {
        fetchedTasks.sort((a, b) => (a.createdDate < b.createdDate ? 1 : -1));
      }

      // Update tasks state with fetched tasks
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      message.error('Görevler alınırken bir hata oluştu.');
    }
  };

  // Function to handle task deletion
  const handleDelete = async (taskId: number) => {
    try {
      // Delete task by ID
      await deleteTask(taskId);
      // Fetch updated task list after deletion
      fetchTasks();
      message.success('Görev başarıyla silindi.');
    } catch (error) {
      console.error('Error deleting task:', error);
      message.error('Görev silinirken bir hata oluştu.');
    }
  };

  // Function to handle task editing
  const handleEdit = (task: Task) => {
    setEditingTask(task); // Set the task to be edited
    setIsFormVisible(true); // Show the task form modal
    setResetForm(false); // Do not reset form fields when editing
  };

  // Function to handle task form submission
  const handleFormSubmit = async (taskData: Omit<Task, 'id' | 'createdDate'>) => {
    try {
      if (editingTask) {
        // Update existing task
        await updateTask({ ...taskData, id: editingTask.id });
        message.success('Görev başarıyla güncellendi.');
      } else {
        // Create new task
        await createTask(taskData);
        message.success('Yeni görev başarıyla eklendi.');
      }

      // Reset form and fetch updated task list
      setEditingTask(undefined);
      setIsFormVisible(false);
      setResetForm(true);
      fetchTasks();
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error('İşlem sırasında bir hata oluştu.');
    }
  };

  // Function to handle status filter change
  const handleStatusFilterChange = async (value: string | undefined) => {
    setFilteredStatus(value || undefined); // Update status filter
    setSortOrder('asc'); // Reset sort order when changing filters
    // Do not fetch tasks here, let useEffect handle it
  };

  // Function to toggle sort order between ascending and descending
  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc')); // Toggle sort order
    // Do not fetch tasks here, let useEffect handle it
  };

  // Function to get status color based on task status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Yeni':
        return '#4876ff'; // Blue
      case 'Çalışıyor':
        return '#87d068'; // Green
      case 'Tamamlandı':
        return '#f52d2d'; // Red
      default:
        return 'inherit'; // Default color
    }
  };

  // Render task list page UI
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
