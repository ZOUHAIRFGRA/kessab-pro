import React from "react";
import { Image } from "react-native";
import Header from "../components/global/Header";
import Container from "../components/global/Container";
import * as Progress from "react-native-progress";
import Colors from "../utils/Colors";

export default function MarketplaceScreen() {
  return (
    <Container
      sx={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
      }}
    >
      <Image
        source={require("../../assets/marketplace.png")}
        style={{ height: 400, width: 400, resizeMode: "contain" }}
      />

      <Header>Coming soon...!</Header>
      <Progress.Bar color={Colors.primary} indeterminate={true} width={150} />
    </Container>
  );
}
