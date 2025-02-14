import axios, { AxiosResponse } from 'axios';
import { Task } from '../types/Task';

const API_URL = 'http://localhost:8080/api/v1/tasks';

export const createTask = async (taskData: Omit<Task, 'id' | 'createdDate' | 'status'>): Promise<void> => {
  try {
    await axios.post(API_URL, taskData);
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTask = async (taskData: Partial<Omit<Task, 'createdDate'>>): Promise<void> => {
  try {
    await axios.put(`${API_URL}`, taskData);
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const deleteTask = async (taskId: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${taskId}`);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

export const getAllTasks = async (): Promise<Task[]> => {
  try {
    const response: AxiosResponse<Task[]> = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const getTaskById = async (taskId: number): Promise<Task> => {
  try {
    const response: AxiosResponse<Task> = await axios.get(`${API_URL}/${taskId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching task by id:', error);
    throw error;
  }
};
export const getTasksByUserId = async (userId: number): Promise<Task[]> => {
  try {
    const response: AxiosResponse<Task[]> = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks by user id:', error);
    throw error;
  }
};


export const getTasksOrderedByCreateDate = async (order: 'asc' | 'desc'): Promise<Task[]> => {
  const response = await axios.get(`${API_URL}/ordered?sort=${order}`);
  return response.data;
};

export const getTasksByStatus = async (status: string): Promise<Task[]> => {
  try {
    const response: AxiosResponse<Task[]> = await axios.get(`${API_URL}/status`, {
      params: { taskStatusType: status },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks by status:', error);
    throw error;
  }
  
};
export const getTasksFiltered = async (userId?: number, status?: string, sortOrder: 'asc' | 'desc' = 'asc'): Promise<Task[]> => {
  try {
    const response = await axios.get(`${API_URL}/taskFiltred`, {
      params: { userId, status, sortOrder }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching filtered tasks:', error);
    throw error;
  }
};
