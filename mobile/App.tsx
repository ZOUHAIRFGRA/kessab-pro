import React, { useEffect } from "react";
import { View, StatusBar, Platform } from "react-native";
import { Provider, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigator from "./src/navigation/RootNavigator";
import { store, AppDispatch } from "./src/store/store";
import { setToken } from "./src/features/authSlice";
import { SERVER_IP } from "@env";
import Toast from "react-native-toast-message";
import "./src/localization/i18n";
import "./global.css";

const AppWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Show server IP on startup (remove in production)
    if (__DEV__) {
      Toast.show({
        type: "info",
        text1: "Server API",
        text2: `Loaded from env: ${SERVER_IP}`,
      });
    }
  }, []);

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        dispatch(setToken(token));
      }
    };
    loadToken();
  }, [dispatch]);

  return <RootNavigator />;
};

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <View
          style={{
            flex: 1,
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          }}
        >
          <StatusBar
            barStyle="light-content"
            translucent
            backgroundColor="transparent"
          />
          <AppWrapper />
          <Toast />
        </View>
      </SafeAreaProvider>
    </Provider>
  );
}
