import React, { useCallback, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, AppState, StyleSheet } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { CameraView } from "expo-camera";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Flashlight, SwitchCamera } from "lucide-react-native";
import { parseQrResult } from "../helpers/gloablHelpers";
import "../../global.css";

export default function QRScannerScreen() {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);
  const navigation = useNavigation<any>();
  const { t } = useTranslation();

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

  useFocusEffect(
    useCallback(() => {
      return () => {
        qrLock.current = false;
      };
    }, [])
  );

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (data && !qrLock.current) {
      qrLock.current = true;
      const parsedData = parseQrResult(data);
      navigation.navigate(parsedData.to, parsedData.param);
    }
  };

  return (
    <View className="flex-1 bg-black">
      {/* Camera View */}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={handleBarCodeScanned}
      />

      {/* Overlay */}
      <View className="flex-1">
        {/* Top Bar */}
        <View className="pt-12 px-5 flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="w-10 h-10 bg-black/30 rounded-full items-center justify-center"
          >
            <ArrowLeft size={22} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-semibold">
            {t("common.QRscanner")}
          </Text>
          <View className="w-10" />
        </View>

        {/* Scanner Frame */}
        <View className="flex-1 items-center justify-center">
          {/* Scan Area */}
          <View className="w-64 h-64 relative">
            {/* Corner decorations */}
            <View className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-accent-500 rounded-tl-xl" />
            <View className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-accent-500 rounded-tr-xl" />
            <View className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-accent-500 rounded-bl-xl" />
            <View className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-accent-500 rounded-br-xl" />
          </View>

          {/* Instructions */}
          <View className="mt-8 px-10">
            <Text className="text-white text-center text-base">
              {t("common.Scan Qr Instruction") ||
                "Point your camera at a QR code to scan"}
            </Text>
          </View>
        </View>

        {/* Bottom Controls */}
        <View className="pb-12 px-5">
          <View className="bg-black/30 rounded-2xl p-4 flex-row justify-center space-x-6">
            <TouchableOpacity className="w-14 h-14 bg-white/10 rounded-full items-center justify-center">
              <Flashlight size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
