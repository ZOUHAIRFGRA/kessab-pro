import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const IconButton = ({ label, selected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.button, selected === label && styles.selectedButton]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#ddd",
    borderRadius: 5,
    marginRight: 10,
  },
  selectedButton: {
    backgroundColor: "green",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default IconButton;
