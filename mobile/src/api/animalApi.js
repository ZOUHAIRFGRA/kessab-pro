import axiosInstance from "./axiosInstance";

export const fetchAnimals = async (page = 0, size = 2, search = "", filterType = "tag") => {
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
    console.log("animalData", animalData);
    const response = await axiosInstance.post("/animals", animalData, {
      headers: { "Content-Type": "multipart/form-data" },
      transformRequest: (data) => data, // Prevent Axios from converting FormData

    });
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error("Error creating animal:", error);
    throw error;
  }
};

export const updateAnimal = async (id, animalData) => {
  try {
    const response = await axiosInstance.put(`/animals/${id}`, animalData);
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

export const addAnimalActivitiesLog = async (animalId, logData) => {
  try {
    const response = await axiosInstance.post(
      `/animal-activities-logs/animal/${animalId}`,
      logData
    );
    return response.data;
  } catch (error) {
    console.error(`Error adding activity log for animal ${animalId}:`, error);
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

export const addAnimalMedicalLog = async (animalId, logData) => {
  try {
    const response = await axiosInstance.post(
      `/animal-medical-logs/animal/${animalId}`,
      logData
    );
    return response.data;
  } catch (error) {
    console.error(`Error adding medical log for animal ${animalId}:`, error);
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
