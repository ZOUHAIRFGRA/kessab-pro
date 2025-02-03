import axiosInstance from './axiosInstance'; 


export const fetchSales = async () => {
  try {
    const response = await axiosInstance.get('/sales');
    return response.data; 
  } catch (error) {
    console.error('Error fetching Sales:', error);
    throw error;
  }
};


export const fetchSaleById = async (id) => {
  try {
    const response = await axiosInstance.get(`/sales/${id}`);
    return response.data; 
  } catch (error) {
    console.error(`Error fetching Sale with id ${id}:`, error);
    throw error;
  }
};


export const createSale = async (SaleData) => {
  try {
    const response = await axiosInstance.post('/sales', SaleData);
    return response.data; 
  } catch (error) {
    console.error('Error creating Sale:', error);
    throw error;
  }
};


export const updateSale = async (id, SaleData) => {
  try {
    const response = await axiosInstance.put(`/sales/${id}`, SaleData);
    return response.data; 
  } catch (error) {
    console.error(`Error updating Sale with id ${id}:`, error);
    throw error;
  }
};


export const deleteSale = async (id) => {
  try {
    const response = await axiosInstance.delete(`/sales/${id}`);
    return response.data; 
  } catch (error) {
    console.error(`Error deleting Sale with id ${id}:`, error);
    throw error;
  }
};
