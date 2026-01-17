import { AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

// Request Types
export interface AnimalFilterParams {
  page?: number;
  size?: number;
  search?: string;
  filterType?: string;
}

export interface AnimalCreateRequest {
  tag: string;
  categoryId: number;
  gender?: string;
  birthDate?: string;
  weight?: number;
  price?: number;
  image?: File | Blob;
  [key: string]: any;
}

export interface AnimalUpdateRequest extends Partial<AnimalCreateRequest> {}

export interface MedicalLogRequest {
  animalId: number;
  date: string;
  description: string;
  treatment?: string;
  veterinarian?: string;
  [key: string]: any;
}

export interface ActivityLogRequest {
  animalId: number;
  date: string;
  activityType: string;
  description: string;
  [key: string]: any;
}

// Response Types
export interface Animal {
  id: number;
  tag: string;
  categoryId: number;
  categoryName?: string;
  gender?: string;
  birthDate?: string;
  weight?: number;
  price?: number;
  imageUrl?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

export interface AnimalListResponse {
  content: Animal[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface MedicalLog {
  id: number;
  animalId: number;
  date: string;
  description: string;
  treatment?: string;
  veterinarian?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ActivityLog {
  id: number;
  animalId: number;
  date: string;
  activityType: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export const fetchAnimals = async (
  page: number = 0,
  size: number = 2,
  search: string = "",
  filterType: string = "tag"
): Promise<AnimalListResponse> => {
  try {
    const response: AxiosResponse<AnimalListResponse> = await axiosInstance.get("/animals", {
      params: { page, size, search, filterType },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching animals:", error);
    throw error;
  }
};

export const fetchAnimalsCount = async (): Promise<number> => {
  try {
    const response: AxiosResponse<number> = await axiosInstance.get("/animals/count");
    return response.data;
  } catch (error) {
    console.error("Error fetching animals count:", error);
    throw error;
  }
};

export const fetchAnimalsBySale = (saleId: number): Promise<AxiosResponse<Animal[]>> => {
  return axiosInstance.get(`/animals/by-sale/${saleId}`);
};

export const fetchUnsoldAnimals = async (): Promise<Animal[]> => {
  try {
    const response: AxiosResponse<Animal[]> = await axiosInstance.get("/animals/unsold");
    return response.data;
  } catch (error) {
    console.error("Error fetching unsold animals:", error);
    throw error;
  }
};

export const fetchAnimalsByBuyer = (buyerId: number): Promise<AxiosResponse<Animal[]>> => {
  return axiosInstance.get(`/animals/by-buyer/${buyerId}`);
};

export const fetchAnimalById = async (id: number): Promise<Animal> => {
  try {
    const response: AxiosResponse<Animal> = await axiosInstance.get(`/animals/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching animal with id ${id}:`, error);
    throw error;
  }
};

export const createAnimal = async (animalData: FormData): Promise<Animal> => {
  try {
    const response: AxiosResponse<Animal> = await axiosInstance.post("/animals", animalData, {
      headers: { "Content-Type": "multipart/form-data" },
      transformRequest: (data) => data,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating animal:", error);
    throw error;
  }
};

export const updateAnimal = async (id: number, animalData: FormData): Promise<Animal> => {
  try {
    const response: AxiosResponse<Animal> = await axiosInstance.put(`/animals/${id}`, animalData, {
      headers: { "Content-Type": "multipart/form-data" },
      transformRequest: (data) => data,
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating animal with id ${id}:`, error);
    throw error;
  }
};

export const deleteAnimal = async (id: number): Promise<void> => {
  try {
    const response: AxiosResponse<void> = await axiosInstance.delete(`/animals/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting animal with id ${id}:`, error);
    throw error;
  }
};

export const fetchAnimalMedicalLogs = async (animalId: number): Promise<MedicalLog[]> => {
  try {
    const response: AxiosResponse<MedicalLog[]> = await axiosInstance.get(
      `/animal-medical-logs/animal/${animalId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching medical logs for animal ${animalId}:`, error);
    throw error;
  }
};

export const fetchAnimalActivitiesLogs = async (animalId: number): Promise<ActivityLog[]> => {
  try {
    const response: AxiosResponse<ActivityLog[]> = await axiosInstance.get(
      `/animal-activities-logs/animal/${animalId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching activities logs for animal ${animalId}:`,
      error
    );
    throw error;
  }
};

export const fetchAllAnimalActivitiesLogs = async (): Promise<ActivityLog[]> => {
  try {
    const response: AxiosResponse<ActivityLog[]> = await axiosInstance.get(`/animal-activities-logs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all activities logs:", error);
    throw error;
  }
};

export const updateAnimalActivitiesLog = async (logId: number, logData: Partial<ActivityLogRequest>): Promise<ActivityLog> => {
  try {
    const response: AxiosResponse<ActivityLog> = await axiosInstance.put(
      `/animal-activities-logs/${logId}`,
      logData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating activity log ${logId}:`, error);
    throw error;
  }
};

export const removeAnimalActivityLog = async (logId: number): Promise<void> => {
  try {
    const response: AxiosResponse<void> = await axiosInstance.delete(
      `/animal-activities-logs/${logId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error deleting activity log ${logId}:`, error);
    throw error;
  }
};

export const removeAnimalMedicalLog = async (logId: number): Promise<void> => {
  try {
    const response: AxiosResponse<void> = await axiosInstance.delete(
      `/animal-medical-logs/${logId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error deleting medical log ${logId}:`, error);
    throw error;
  }
};

export const addAnimalMedicalLog = async (logData: MedicalLogRequest): Promise<MedicalLog> => {
  try {
    const response: AxiosResponse<MedicalLog> = await axiosInstance.post(`/animal-medical-logs`, logData);
    return response.data;
  } catch (error) {
    console.error(
      `Error adding medical log for animal ${logData.animalId}:`,
      error
    );
    throw error;
  }
};

export const addAnimalActivitiesLog = async (logData: ActivityLogRequest): Promise<ActivityLog> => {
  try {
    const response: AxiosResponse<ActivityLog> = await axiosInstance.post(
      `/animal-activities-logs`,
      logData
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error adding activity log for animal ${logData.animalId}:`,
      error
    );
    throw error;
  }
};

export const updateAnimalMedicalLog = async (logId: number, logData: Partial<MedicalLogRequest>): Promise<MedicalLog> => {
  try {
    const response: AxiosResponse<MedicalLog> = await axiosInstance.put(
      `/animal-medical-logs/${logId}`,
      logData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating medical log ${logId}:`, error);
    throw error;
  }
};
