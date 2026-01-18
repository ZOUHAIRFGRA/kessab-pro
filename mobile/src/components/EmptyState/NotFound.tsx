import React from "react";
import { View, Image, StyleSheet } from "react-native";
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
        style={styles.image}
        resizeMode="contain"
      />

      {/* Message */}
      <Text 
        className="text-primary-800 text-xl font-bold text-center"
        style={styles.text}
      >
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 280,
    height: 280,
    marginBottom: 24,
  },
  text: {
    maxWidth: 300,
  },
});
