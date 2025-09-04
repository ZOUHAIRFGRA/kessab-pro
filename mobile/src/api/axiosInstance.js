import axios from "axios";
import { Platform } from "react-native";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { SERVER_IP } from "@env";
import { logout } from "../features/authSlice";
import store from '../store/store';

export const getBaseURL = () => {
    const serverIp = "https://9e7aadfeab2b.ngrok-free.app";

    // if (Platform.OS === "android") {
    //     return Constants.executionEnvironment === "expo" ?
    //         "http://10.0.2.2:31042" :
    //         `http://${serverIp}:31042`;
    // } else if (Platform.OS === "ios") {
    //     return Constants.executionEnvironment === "expo" ?
    //         `http://${serverIp}:31042` :
    //         `http://${serverIp}:31042`;
    // }

    return serverIp;
};

const axiosInstance = axios.create({
    baseURL: `${getBaseURL()}/api`,
    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    async(config) => {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

const handleLogout = async() => {
    await AsyncStorage.clear();
    store.dispatch(logout());
};

axiosInstance.interceptors.response.use(
    (response) => response,
    async(error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            await handleLogout();
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;