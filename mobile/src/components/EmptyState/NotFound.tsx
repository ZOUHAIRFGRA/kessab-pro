import React from "react";
import { View, Image } from "react-native";
import Text from "../global/Text";
import "../../../global.css";

interface NotFoundProps {
  message: string;
}

export default function NotFound({ message }: NotFoundProps) {
  return (
    <View className="flex-1 justify-center items-center px-6 bg-surface-50">
      {/* Illustration */}
      <Image
        source={require("../../../assets/farmer_feeding_cattle.png")}
        className="w-[280px] h-[280px] mb-6"
        resizeMode="contain"
      />

      {/* Message */}
      <Text className="text-primary-800 text-xl font-bold text-center max-w-[300px]">
        {message}
      </Text>
    </View>
  );
}
