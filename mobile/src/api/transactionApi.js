import axiosInstance from './axiosInstance'; 


export const fetchTransactions = async () => {
  try {
    const response = await axiosInstance.get('/transactions');
    return response.data; 
  } catch (error) {
    console.error('Error fetching Transactions:', error);
    throw error;
  }
};


export const fetchTransactionById = async (id) => {
  try {
    const response = await axiosInstance.get(`/transactions/${id}`);
    return response.data; 
  } catch (error) {
    console.error(`Error fetching Transaction with id ${id}:`, error);
    throw error;
  }
};


export const createTransaction = async (TransactionData) => {
  try {
    const response = await axiosInstance.post('/transactions', TransactionData);
    return response.data; 
  } catch (error) {
    console.error('Error creating Transaction:', error);
    throw error;
  }
};


export const updateTransaction = async (id, TransactionData) => {
  try {
    // console.log(`Updating Transaction ID: ${id}`, TransactionData); 
    const response = await axiosInstance.put(`/transactions/${id}`, TransactionData);
    // console.log("Update Response:", response.data); 
    return response.data;
  } catch (error) {
    console.error(`Error updating Transaction with id ${id}:`, error.response?.data || error);
    throw error;
  }
};


export const deleteTransaction = async (id) => {
  try {
    const response = await axiosInstance.delete(`/transactions/${id}`);
    return response.data; 
  } catch (error) {
    console.error(`Error deleting Transaction with id ${id}:`, error);
    throw error;
  }
};
