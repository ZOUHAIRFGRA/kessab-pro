import React, { useEffect } from "react";
import { View, StatusBar, Platform,Text } from "react-native";
import { DripsyProvider } from "dripsy";
import { Provider, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import theme from "./src/styles/theme";
import RootNavigator from "./src/navigation/RootNavigator";
import { store } from "./src/store/store";
import { setToken } from "./src/features/authSlice"; // Import setToken action
import { SERVER_IP } from "@env";
import 'react-native-toast-message';
import Toast from 'react-native-toast-message'; // Import the Toast component

const AppWrapper = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    console.log("Server IP from env:", SERVER_IP);
    Toast.show({
      type: "info",
      text1: "Server IP",
      text2: `Loaded from env: ${SERVER_IP}`,
    });
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
      <DripsyProvider theme={theme}>
        <View
          style={{
            flex: 1,
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 36,
          }}
        >
          <StatusBar barStyle="dark-content" translucent backgroundColor="transparent"  />
          <AppWrapper />
          <Toast innerRef={(ref) => Toast.setRef(ref)} /> 
        </View>
      </DripsyProvider>
    </Provider>
  );
}
