import axiosInstance from './axiosInstance'; 


export const fetchAnimals = async () => {
  try {
    const response = await axiosInstance.get('/animals');
    return response.data; 
  } catch (error) {
    console.error('Error fetching animals:', error);
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
    const response = await axiosInstance.post('/animals', animalData);
    return response.data; 
  } catch (error) {
    console.error('Error creating animal:', error);
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