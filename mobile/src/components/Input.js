import React from "react";
import { TextInput, View, Text } from "react-native";
import { styled } from "dripsy";
import { useTranslation } from "react-i18next";

const Input = ({ placeholder, value, onChangeText, editable = true, style ,keyboardType}) => {
  const {t }= useTranslation();
  const isRTL = t("dir") === "rtl";

  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={{ fontWeight: "bold", textAlign: isRTL ? "right" : "left" }}>{placeholder}</Text>
      <StyledTextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        style={style}
        placeholderTextColor="black"
        keyboardType={keyboardType}
        textAlign={isRTL ? "right" : "left"} 

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
