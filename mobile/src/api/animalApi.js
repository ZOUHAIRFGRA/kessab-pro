import axios from "axios";
import axiosInstance from "./axiosInstance";

export const fetchAnimals = async (
  page = 0,
  size = 2,
  search = "",
  filterType = "tag"
) => {
  try {
    const response = await axiosInstance.get("/animals", {
      params: { page, size, search, filterType },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching animals:", error);
    throw error;
  }
};

export const fetchAnimalsCount = async () => {
  try {
    const response = await axiosInstance.get("/animals/count");
    return response.data;
  } catch (error) {
    console.error("Error fetching animals count:", error);
    throw error;
  }
}

export const fetchAnimalsBySale = (saleId) => {
  return axiosInstance.get(`/animals/by-sale/${saleId}`);
};
export const fetchUnsoldAnimals = async () => {
 try {
   const response = await axiosInstance.get("/animals/unsold");
   return response.data;
 } catch (error) {
    console.error("Error fetching unsold animals:", error);
    throw error;
  }
};

export const fetchAnimalsByBuyer = (buyerId) => {
  return axiosInstance.get(`/animals/by-buyer/${buyerId}`);
};

export const fetchAnimalById = async (id) => {
  try {
    const response = await axiosInstance.get(`/animals/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching animal with id ${id}:`, error);
    throw error;
  }
};

export const createAnimal = async (animalData) => {
  try {
    const response = await axiosInstance.post("/animals", animalData, {
      headers: { "Content-Type": "multipart/form-data" },
      transformRequest: (data) => data, // Prevent Axios from converting FormData
    });
    return response.data;
  } catch (error) {
    console.error("Error creating animal:", error);
    throw error;
  }
};

export const updateAnimal = async (id, animalData) => {
  try {
    const response = await axiosInstance.put(`/animals/${id}`, animalData, {
      headers: { "Content-Type": "multipart/form-data" },
      transformRequest: (data) => data, // Prevent Axios from converting FormData
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating animal with id ${id}:`, error);
    throw error;
  }
};

export const deleteAnimal = async (id) => {
  try {
    const response = await axiosInstance.delete(`/animals/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting animal with id ${id}:`, error);
    throw error;
  }
};

export const fetchAnimalMedicalLogs = async (animalId) => {
  try {
    const response = await axiosInstance.get(
      `/animal-medical-logs/animal/${animalId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching medical logs for animal ${animalId}:`, error);
    throw error;
  }
};

export const fetchAnimalActivitiesLogs = async (animalId) => {
  try {
    const response = await axiosInstance.get(
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

export const fetchAllAnimalActivitiesLogs = async () => {
  try {
    const response = await axiosInstance.get(`/animal-activities-logs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all activities logs:", error);
    throw error;
  }
};

export const updateAnimalActivitiesLog = async (logId, logData) => {
  try {
    const response = await axiosInstance.put(
      `/animal-activities-logs/${logId}`,
      logData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating activity log ${logId}:`, error);
    throw error;
  }
};

export const removeAnimalActivityLog = async (logId) => {
  try {
    const response = await axiosInstance.delete(
      `/animal-activities-logs/${logId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error deleting activity log ${logId}:`, error);
    throw error;
  }
};

export const removeAnimalMedicalLog = async (logId) => {
  try {
    const response = await axiosInstance.delete(
      `/animal-medical-logs/${logId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error deleting medical log ${logId}:`, error);
    throw error;
  }
};

export const addAnimalMedicalLog = async (logData) => {
  try {
    const response = await axiosInstance.post(`/animal-medical-logs`, logData);
    return response.data;
  } catch (error) {
    console.error(
      `Error adding medical log for animal ${logData.animalId}:`,
      error
    );
    throw error;
  }
};

export const addAnimalActivitiesLog = async (logData) => {
  try {
    const response = await axiosInstance.post(
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
export const updateAnimalMedicalLog = async (logId, logData) => {
  try {
    const response = await axiosInstance.put(
      `/animal-medical-logs/${logId}`,
      logData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating medical log ${logId}:`, error);
    throw error;
  }
};
