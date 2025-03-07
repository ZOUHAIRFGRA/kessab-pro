import Container from "../../components/global/Container";
import Button from "../../components/global/Button";
import Colors from "../../utils/Colors";
import React, { useState } from "react";
import { SearchBar } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import BuyersListCardView from "../../components/buyer/BuyersListCardView";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getBuyers } from "../../features/buyerSlice";
import { Pagination } from "../../components/global/Pagination";
export default function BuyersScreen() {
  const [q, setQ] = useState("");

  const { totalPages } = useSelector((states) => states.buyers);
  const dispatch = useDispatch();
  const getNextPage = (page) => {
    dispatch(
      getBuyers({
        page: page,
      })
    );
  };

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
          onChangeText={(v) => setQ(v)}
          round
          value={q}
          lightTheme
          placeholder={t("common.SearchByBuyerNameOrCIN")}
        />
      </Container>
      <Container sx={{ padding: 12, flex: 1 }}>
        <BuyersListCardView searchText={q} />
      </Container>
      {totalPages > 0 && (
        <Pagination
          pages={totalPages}
          onPageChange={(page) => getNextPage(page)}
        />
      )}

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
