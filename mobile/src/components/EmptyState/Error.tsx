import React from "react";
import { View, Image } from "react-native";
import { AlertCircle } from "lucide-react-native";
import Text from "../global/Text";
import "../../../global.css";

interface ErrorProps {
  message?: string;
}

export default function Error({ message = "An error occurred" }: ErrorProps) {
  return (
    <View className="flex-1 justify-center items-center px-6 bg-surface-50">
      {/* Error Icon */}
      <View className="w-24 h-24 rounded-full bg-red-100 items-center justify-center mb-6">
        <AlertCircle size={48} color="#dc2626" />
      </View>

      {/* Error Message */}
      <Text className="text-primary-800 text-xl font-bold text-center mb-2">
        Oops! Something went wrong
      </Text>
      <Text className="text-surface-500 text-base text-center max-w-[280px]">
        {message}
      </Text>
    </View>
  );
}
