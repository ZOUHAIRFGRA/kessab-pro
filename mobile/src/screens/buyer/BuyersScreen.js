import Container from "../../components/global/Container";
import Button from "../../components/global/Button";
import Colors from "../../utils/Colors";
import React from "react";
import { SearchBar } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import BuyersListCardView from "../../components/buyer/BuyersListCardView";
import { useNavigation } from "@react-navigation/native";
export default function BuyersScreen() {
  const navigator = useNavigation();
  const { t } = useTranslation();
  return (
    <>
      <Container sx={{ paddingX: 12, paddingY: 8 }}>
        <SearchBar
          containerStyle={{
            backgroundColor: "hidden",
            padding: 0,
          }}
          inputContainerStyle={{ padding: 0 }}
          round
          lightTheme
          placeholder={t("common.SearchByBuyerNameOrCIN")}
        />
      </Container>
      <Container sx={{ padding: 12, flex: 1 }}>
        <BuyersListCardView />
      </Container>
      <Button
        type="primary"
        style={{
          padding: 12,
          marginRight: 12,
          marginLeft: 12,
          marginBottom: 8,
          justifyContent: "center",
          alignItems: "center",
        }}
        textStyle={{
          color: "white",
          fontWeight: "bold",
          textAlign: "center",
          fontSize: 16,
        }}
        icon={{
          name: "plus",
          color: Colors.white,
        }}
        onPress={() => navigator.navigate("addBuyerScreen")}
      >
        {t("common.AddNewClient")}
      </Button>
    </>
  );
}
