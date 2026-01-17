import { AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

// Response Types
export interface CategoryIcon {
  id: number;
  name: string;
  url?: string;
  iconData?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

export const getCategoriesIcons = async (): Promise<CategoryIcon[]> => {
  try {
    const response: AxiosResponse<CategoryIcon[]> = await axiosInstance.get("/animal-icons");
    return response.data;
  } catch (error) {
    console.error("Error fetching Categories Icons:", error);
    throw error;
  }
};
