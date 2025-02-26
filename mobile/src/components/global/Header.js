import React from "react";
import { View } from "react-native";
import Text from "../../components/global/Text";
import Container from "./Container";
const Header = ({ level, children }) => {
  let fontSize;

  switch (level) {
    case "h1":
      fontSize = 32;
      break;
    case "h2":
      fontSize = 28;
      break;
    case "h3":
      fontSize = 24;
      break;
    default:
      fontSize = 20;
  }

  return (
    <Container>
      <Text
        style={{
          fontWeight: "bold",
          fontSize,
        }}
      >
        {children}
      </Text>
    </Container>
  );
};

export default Header;
