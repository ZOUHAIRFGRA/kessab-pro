import axiosInstance from "./axiosInstance";
import { AxiosResponse } from "axios";

// Request Types
export interface LoginRequest {
  username?: string;
  email?: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

// Response Types
export interface AuthResponse {
  token: string;
  user: {
    id: number | string;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
  };
}

export const login = async (userData: LoginRequest): Promise<AuthResponse> => {
  try {
    const response: AxiosResponse<AuthResponse> = await axiosInstance.post("/auth/login", userData);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const register = async (userData: RegisterRequest): Promise<AuthResponse> => {
  try {
    const response: AxiosResponse<AuthResponse> = await axiosInstance.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
