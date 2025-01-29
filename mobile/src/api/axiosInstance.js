import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://10.0.2.2:8080/api',
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {

    // TODO: Add token to request headers
    const token = ''; 
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
