import { AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

// Request Types
export interface UserUpdateRequest {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  profileImage?: string;
  [key: string]: any;
}

// Response Types
export interface User {
  id: number | string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  profileImage?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

export const getUserProfile = async (): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await axiosInstance.get("/users/me");
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const updateUserProfile = async (updatedUser: UserUpdateRequest): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await axiosInstance.put("/users/update", updatedUser);
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};
