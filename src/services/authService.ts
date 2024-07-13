// src/services/authService.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1'; // Backend API URL

export interface SignInRequest {
    email: string;
    password: string;
  }

export const registerUser = async (name: string, surname: string, email: string, password: string,roleType:string) => {
  const response = await axios.post(`${API_BASE_URL}/auth/signup`, { name, surname, email, password,roleType });
  return response.data;
};

export const signIn = async (request: SignInRequest): Promise<any> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signin`, request);
      return response.data;
    } catch (error) {
      throw new Error('Failed to sign in'); // Handle error as needed
    }
  };