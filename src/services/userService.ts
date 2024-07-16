import { CreateUserRequest } from '../models/Requests/User/CreateUserRequest';
import { UpdateUserRequest } from '../models/Requests/User/UpdateUserRequest';
import { UserResponse } from '../models/Responses/User/UserResponse';
import api from './api';



const userService = {
     createUser : async (requestData: CreateUserRequest): Promise<UserResponse | void> => {
        try {
          // createUser logic here
          const response = await api.post('/users', requestData);
          return response.data as UserResponse; // Assuming response.data is UserResponse
        } catch (error) {
          console.error('Error creating user:', error);
          return; // Return void or handle error case appropriately
        }
      },
      

  updateUser: async (updateUserRequest: UpdateUserRequest): Promise<void> => {
    await api.put('/users', updateUserRequest);
  },

  getAllUsers: async (): Promise<UserResponse[]> => {
    const response = await api.get('/users');
    return response.data;
  },
  getByRoleType: async (): Promise<UserResponse[]> => {
    const response = await api.get('/users/roleType');
    return response.data;
  },

  getUserById: async (id: number): Promise<UserResponse> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  deleteUser: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
  updatePassword: async (id: number, password: string): Promise<UserResponse> => {
    const response = await api.put('/users/updatePassword', null, {
      params: { id, password }
    });
    return response.data;
  },
  
};

export default userService;
