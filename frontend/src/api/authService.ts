import apiClient from './client';
import type {
  AuthResponse,
  RegisterFormData,
  LoginFormData,
  UsersResponse,
} from '../types';

/**
 * Register a new user
 */
export const register = async (data: RegisterFormData): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/api/auth/register', data);
  return response.data;
};

/**
 * Login an existing user
 */
export const login = async (data: LoginFormData): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/api/auth/login', data);
  return response.data;
};

/**
 * Get all users (protected route)
 */
export const getUsers = async (): Promise<UsersResponse> => {
  const response = await apiClient.get<UsersResponse>('/api/protected/users');
  return response.data;
};

/**
 * Get current user profile (protected route)
 */
export const getProfile = async (): Promise<{ success: boolean; user: AuthResponse['user'] }> => {
  const response = await apiClient.get('/api/protected/profile');
  return response.data;
};
