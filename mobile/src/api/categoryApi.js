import axiosInstance from './axiosInstance'; 


export const getCategories = async () => {
  try {
    const response = await axiosInstance.get('/animal-categories');
    return response.data; 
  } catch (error) {
    console.error('Error fetching Categories:', error);
    throw error;
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await axiosInstance.get(`/animal-categories/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Category:', error);
    throw error.response?.data || error.message;
  }
};


export const createCategory = async (CategoryData) => {
  try {
    const response = await axiosInstance.post('/animal-categories', CategoryData);
    return response.data; 
  } catch (error) {
    console.error('Error creating Category:', error);
    throw error;
  }
};


