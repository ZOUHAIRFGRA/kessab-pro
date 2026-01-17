import "../../global.css";
import React from "react";
import { TouchableOpacity, Text } from "react-native";

interface ImagePickerButtonProps {
  onPress: () => void;
  children: React.ReactNode;
}

const ImagePickerButton: React.FC<ImagePickerButtonProps> = ({ onPress, children }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="mt-2.5 bg-[#1e3a5f] justify-center items-center py-2.5 px-5 rounded-lg mb-1.5"
    >
      <Text className="text-white text-base font-bold">
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default ImagePickerButton;
