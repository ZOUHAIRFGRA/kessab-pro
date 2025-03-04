import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AppState,
} from "react-native";
import { parseQrResult } from "../helpers/gloablHelpers";

export default QRScannerScreen = () => {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const navigator = useNavigation();

  useEffect(() => {
    const backHandler = (e) => {
      e.preventDefault();
      navigator.navigate("Home");
      return true;
    };

    navigator.addListener("beforeRemove", backHandler);

    return () => {
      navigator.removeListener("beforeRemove", backHandler);
    };
  }, [navigator]);

  useFocusEffect(
    useCallback(() => {
      console.log("salam");

      return () => {
        console.log("bay");

        qrLock.current = null;
      };
    }, [])
  );

  return (
    <>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={({ data }) => {
          if (data && !qrLock.current) {
            qrLock.current = true;
            const parsedData = parseQrResult(data);
            navigator.navigate(parsedData.to, parsedData.param);
          }
        }}
      />
    </>
  );
};
