import axios from "axios";
import { Platform } from "react-native";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { SERVER_IP } from "@env";
import { logout } from "../features/authSlice";
import store from '../store/store';

export const getBaseURL = () => {
  const serverIp = SERVER_IP || "192.168.1.8";

  if (Platform.OS === "android") {
    return Constants.executionEnvironment === "expo"
      ? "http://10.0.2.2:8080"
      : `http://${serverIp}:8080`;
  } else if (Platform.OS === "ios") {
    return Constants.executionEnvironment === "expo"
      ? `http://${serverIp}:8080`
      : `http://${serverIp}:8080`;
  }

  return `http://localhost:8080`;
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

const handleLogout = async () => {
  await AsyncStorage.clear();
  store.dispatch(logout());
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      await handleLogout();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
