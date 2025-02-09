import axiosInstance from "./axiosInstance";

export const login = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/login", userData);
    // console.log('response.data', response.data);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/register", userData);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
