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

export default QRScannerScreen = () => {
  // const [permission, requestPermission] = useCameraPermissions();
  // const isPermissionGranted = Boolean(permission?.granted);

  const [qrLock, setQrLock] = useState(false);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setQrLock(false);
      };
    }, [])
  );

  return (
    <>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={({ data }) => {
          if (data && !qrLock) {
            setTimeout(async () => {
              console.log(data);
            }, 500);
            setQrLock(true);
          }
        }}
      />
    </>
  );
};
