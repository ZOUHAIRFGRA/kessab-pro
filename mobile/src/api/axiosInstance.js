import axios from "axios";
import { Platform } from "react-native";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { SERVER_IP } from "@env"; 

export const getBaseURL = () => {
  const serverIp = SERVER_IP || "192.168.1.19"; 
// console.log("serverIp from axiso:", serverIp);
  
  if (Platform.OS === "android") {
    return Constants.executionEnvironment === "expo"
      ? "http://10.0.2.2:8080"
      : `http://${serverIp}:8080`;
  } else if (Platform.OS === "ios") {
    return Constants.executionEnvironment === "expo"
      ? `http://${serverIp}:8080`
      : `http://${serverIp}:8080`;
  }

  return `http://${serverIp}:8080`;
};

const axiosInstance = axios.create({
  baseURL: `${getBaseURL()}/api`,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
