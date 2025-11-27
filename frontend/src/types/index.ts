// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  dob: string;
  createdAt: string;
}

// Auth response from API
export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
}

// API error response
export interface ErrorResponse {
  success: false;
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

// Register form data
export interface RegisterFormData {
  name: string;
  dob: string;
  email: string;
  password: string;
}

// Login form data
export interface LoginFormData {
  email: string;
  password: string;
}

// Users list response
export interface UsersResponse {
  success: boolean;
  message: string;
  users: User[];
}
