import React from "react";
import { TouchableOpacity } from "react-native";
import { styled, Text } from "dripsy";

const StyledButton = styled(TouchableOpacity)({
  marginTop: 10,
  backgroundColor: "blue",
  justifyContent: "center",
  alignItems: "center",
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 5,
  marginBottom: 5,
});

const StyledText = styled(Text)({
  color: "white",
  fontSize: 16,
  fontWeight: "bold",
});

const ImagePickerButton = ({ onPress, children }) => {
  return (
    <StyledButton onPress={onPress}>
      <StyledText>{children}</StyledText>
    </StyledButton>
  );
};

export default ImagePickerButton;
