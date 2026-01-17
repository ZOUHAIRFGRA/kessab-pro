import "../../global.css";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ScreenWrapperProps {
  children: React.ReactNode;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children }) => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="p-5 flex-1 justify-center">
        {children}
      </View>
    </SafeAreaView>
  );
};

export default ScreenWrapper;
