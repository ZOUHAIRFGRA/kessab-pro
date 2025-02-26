import axiosInstance from './axiosInstance';

export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get('/users/me');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (updatedUser) => {
  try {
    const response = await axiosInstance.put('/users/update', updatedUser);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};
