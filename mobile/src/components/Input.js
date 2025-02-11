import React from "react";
import { TextInput, View, Text } from "react-native";
import { styled } from "dripsy";

const Input = ({ placeholder, value, onChangeText, editable = true, style ,keyboardType}) => {
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={{ fontWeight: "bold" }}>{placeholder}</Text>
      <StyledTextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        style={style}
        placeholderTextColor="black"
        keyboardType={keyboardType}
      />
    </View>
  );
};

const StyledTextInput = styled(TextInput)({
  borderWidth: 1,
  borderColor: "#ccc",
  padding: 10,
  borderRadius: 5,
  marginTop: 5,
});

export default Input;
