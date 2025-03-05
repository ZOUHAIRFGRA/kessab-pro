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

export const createCategory = async (categoryData) => {
  try {
    const payload = {
      typeName: categoryData.typeName,
      icon: { id: categoryData.iconId }, // Format as expected by backend
    };
    const response = await axiosInstance.post('/animal-categories', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating Category:', error);
    throw error;
  }
};

export const updateCategory = async (id, categoryData) => {
  try {
    const payload = {
      typeName: categoryData.typeName,
      icon: { id: categoryData.iconId }, // Format as expected by backend
    };
    const response = await axiosInstance.put(`/animal-categories/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error updating Category:', error);
    throw error.response?.data || error.message;
  }
};

export const deleteCategory = async (id) => {
  try {
    await axiosInstance.delete(`/animal-categories/${id}`);
    return true;
  } catch (error) {
    console.error('Error deleting Category:', error);
    throw error.response?.data || error.message;
  }
};