import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { Task } from '../types/Task';
import { useAuth } from '../utils/AuthContext'; // useAuth hook'unu import ediyoruz

const { Option } = Select;

interface TaskFormProps {
  task?: Task;
  onSubmit: (taskData: Omit<Task, 'id' | 'createdDate'>) => Promise<void>;
  resetForm: boolean; // Prop to trigger form reset
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, resetForm }) => {
  const { user } = useAuth(); // useAuth hook'undan kullanıcıyı alıyoruz

  const [id, setId] = useState(task ? task.id : 0);
  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [taskStatus, setTaskStatus] = useState(task ? task.taskStatus : '');
  const [createdDate, setCreatedDate] = useState<string | undefined>(
    task && task.createdDate instanceof Date ? task.createdDate.toISOString().substring(0, 10) : undefined
  );

  useEffect(() => {
    if (task) {
      setId(task.id);
      setTitle(task.title);
      setDescription(task.description);
      setTaskStatus(task.taskStatus);
      setCreatedDate(task.createdDate instanceof Date ? task.createdDate.toISOString().substring(0, 10) : undefined);
    }
  }, [task]);

  // Reset form fields when resetForm prop changes
  useEffect(() => {
    if (resetForm) {
      setId(0);
      setTitle('');
      setDescription('');
      setTaskStatus('');
      setCreatedDate(undefined);
    }
  }, [resetForm]);

  const handleSubmit = async () => {
    const taskData = {
      id,
      title,
      description,
      userId: user ? user.id : 0, // Kullanıcı ID'sini buradan alıyoruz
      taskStatus,
      createdDate: createdDate ? new Date(createdDate) : undefined,
    };

    try {
      await onSubmit(taskData as Omit<Task, 'id' | 'createdDate'>);
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };

  return (
    <Form layout="vertical">
      <Form.Item label="Başlık">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </Form.Item>
      <Form.Item label="Açıklama">
        <Input.TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          autoSize={{ minRows: 3, maxRows: 6 }}
        />
      </Form.Item>
     
      {task && (
        <Form.Item label="Durum">
          <Select value={taskStatus} onChange={(value) => setTaskStatus(value)}>
            <Option value="Yeni">Yeni</Option>
            <Option value="Çalışıyor">Çalışıyor</Option>
            <Option value="Tamamlandı">Tamamlandı</Option>
          </Select>
        </Form.Item>
      )}
      <Form.Item>
        <Button type="primary" onClick={handleSubmit}>
          {task ? 'Güncelle' : 'Oluştur'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
