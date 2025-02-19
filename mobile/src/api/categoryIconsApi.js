import axiosInstance from './axiosInstance'; 


export const getCategoriesIcons = async () => {
  try {
    const response = await axiosInstance.get('/animal-icons');
    return response.data; 
  } catch (error) {
    console.error('Error fetching Categoris:', error);
    throw error;
  }
};
