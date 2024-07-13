import axios from 'axios';
import { CreateAdminRequest } from '../models/Requests/Admin/CreateAdminRequest';
import { UpdateAdminRequest } from '../models/Requests/Admin/UpdateAdminRequest';
import { AdminResponse } from '../models/Responses/Admin/AdminResponse';

const API_URL = 'http://localhost:8080/api/v1/admins';

const createAdmin = async (data: CreateAdminRequest): Promise<AdminResponse> => {
  const response = await axios.post<AdminResponse>(API_URL, data);
  return response.data;
};

const updateAdmin = async (data: UpdateAdminRequest): Promise<void> => {
  await axios.put<void>(API_URL, data);
};

const getAllAdmins = async (): Promise<AdminResponse[]> => {
  const response = await axios.get<AdminResponse[]>(API_URL);
  return response.data;
};

const getAdminById = async (id: number): Promise<AdminResponse> => {
  const response = await axios.get<AdminResponse>(`${API_URL}/${id}`);
  return response.data;
};

const deleteAdmin = async (id: number): Promise<void> => {
  await axios.delete<void>(`${API_URL}/${id}`);
};

const adminService = {
  createAdmin,
  updateAdmin,
  getAllAdmins,
  getAdminById,
  deleteAdmin,
};

export default adminService;
