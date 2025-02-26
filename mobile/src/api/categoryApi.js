import axiosInstance from './axiosInstance'; 


export const getCategories = async () => {
  try {
    const response = await axiosInstance.get('/animal-categories');
    return response.data; 
  } catch (error) {
    console.error('Error fetching Categoris:', error);
    throw error;
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

