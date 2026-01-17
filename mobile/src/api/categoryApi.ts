import { AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

// Request Types
export interface CategoryCreateRequest {
  typeName: string;
  iconId: number;
}

export interface CategoryUpdateRequest extends Partial<CategoryCreateRequest> {}

// Response Types
export interface CategoryIcon {
  id: number;
  name?: string;
  url?: string;
  [key: string]: any;
}

export interface Category {
  id: number;
  typeName: string;
  icon: CategoryIcon;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

// Internal payload type for API
interface CategoryPayload {
  typeName: string;
  icon: { id: number };
}

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response: AxiosResponse<Category[]> = await axiosInstance.get("/animal-categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching Categories:", error);
    throw error;
  }
};

export const getCategoryById = async (id: number): Promise<Category> => {
  try {
    const response: AxiosResponse<Category> = await axiosInstance.get(`/animal-categories/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Category:", error);
    throw error;
  }
};

export const createCategory = async (categoryData: CategoryCreateRequest): Promise<Category> => {
  try {
    const payload: CategoryPayload = {
      typeName: categoryData.typeName,
      icon: { id: categoryData.iconId },
    };
    const response: AxiosResponse<Category> = await axiosInstance.post("/animal-categories", payload);
    return response.data;
  } catch (error) {
    console.error("Error creating Category:", error);
    throw error;
  }
};

export const updateCategory = async (id: number, categoryData: CategoryUpdateRequest): Promise<Category> => {
  try {
    const payload: Partial<CategoryPayload> = {
      ...(categoryData.typeName && { typeName: categoryData.typeName }),
      ...(categoryData.iconId && { icon: { id: categoryData.iconId } }),
    };
    const response: AxiosResponse<Category> = await axiosInstance.put(`/animal-categories/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error("Error updating Category:", error);
    throw error;
  }
};

export const deleteCategory = async (id: number): Promise<boolean> => {
  try {
    await axiosInstance.delete(`/animal-categories/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting Category:", error);
    throw error;
  }
};
