import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styled } from "dripsy";
import Colors from "../../utils/Colors";

const IconButton = ({ label, value, selected, onPress }) => {
  const isSelected = selected === value;

  return (
    <ButtonContainer
      onPress={onPress}
      sx={{
        bg: isSelected ? Colors.danger : "gray",
        borderColor: isSelected ? "darkgreen" : "gray",
      }}
    >
      <ButtonText sx={{ color: isSelected ? "white" : "black" }}>
        {label}
      </ButtonText>
    </ButtonContainer>
  );
};

const ButtonContainer = styled(TouchableOpacity)({
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 5,
  borderWidth: 1,
  marginHorizontal: 5,
  alignItems: "center",
});

const ButtonText = styled(Text)({
  fontWeight: "bold",
});

export default IconButton;
