import axios from "axios";
import { Platform } from "react-native";
import Constants from "expo-constants";

// Function to determine base URL
export const getBaseURL = () => {
  if (Platform.OS === "android") {
    return Constants.executionEnvironment === "expo" ? "http://10.0.2.2:8080" : "http://192.168.1.19:8080";
  } else if (Platform.OS === "ios") {
    return Constants.executionEnvironment === "expo" ? "http://localhost:8080" : "http://192.168.1.19:8080";
  }
  return "http://localhost:8080"; // Default fallback
};

const axiosInstance = axios.create({
  baseURL: `${getBaseURL()}/api`,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = ""; // Add token logic here if needed
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosInstance;
