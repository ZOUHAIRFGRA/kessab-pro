import React, { useCallback, useEffect } from "react";
import { Linking, Pressable, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import FallBack, { FALLBACK_TYPE } from "../global/Fallback";
import Loading from "../global/Loading";
import { getBuyer } from "../../features/buyerSlice";
import Colors from "../../utils/Colors";
import Header from "../global/Header";

import Container from "../global/Container";
import Card from "../global/Card";
import Button from "../global/Button";
import { Icon } from "@rneui/base";
import Text from "../../components/global/Text";
import { useTranslation } from "react-i18next";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getValue } from "../../helpers/gloablHelpers";

export default function BuyerInfoView({ id, hideLinkButton = false }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const {
    error,
    buyerLoading: loading,
    buyer,
  } = useSelector(({ buyers }) => buyers);
  useEffect(() => {
    dispatch(getBuyer(id));
  }, [dispatch]);
  const navigator = useNavigation();
  const handleBuyerLinkClick = () => {
    navigator.navigate("buyerDetail", { buyerId: buyer.id });
  };

  if (loading || !buyer) return <Loading />;
  if (error) return <FallBack type={FALLBACK_TYPE.NOT_FOUND} />;

  return (
    <ScrollView>
      <Container
        sx={{
          gap: 12,
          justifyContent: "start",
          flex: 1,
          alignItems: "start",
          padding: 18,
        }}
      >
        <Card sx={{ gap: 24, flexDirection: "column", padding: 20 }}>
          <Container sx={{ justifyContent: "center", flexDirection: "row" }}>
            <Icon
              name="person"
              size={36}
              reverse
              raised
              color={Colors.primary}
            />
          </Container>
          <Container style={{ flex: 1, justifyContent: "end" }}>
            <Text>{t("common.FullName")}</Text>
            <Header level={"h3"}>{getValue(buyer?.fullName)}</Header>
          </Container>
          <Container style={{ flex: 1, justifyContent: "end" }}>
            <Text>{t("common.CIN")}</Text>
            <Header level={"h3"}>{getValue(buyer?.CIN)}</Header>
          </Container>
          <Container style={{ flex: 1, justifyContent: "end" }}>
            <Text>{t("common.Address")}</Text>
            <Header level={"h3"}>{getValue(buyer?.address)}</Header>
          </Container>
          <Container style={{ flex: 1, justifyContent: "end" }}>
            <Pressable onPress={() => Linking.openURL(`tel:${buyer.phone}`)}>
              <Text>{t("common.Phone")}</Text>
              <Header level={"h3"}>{getValue(buyer?.phone)}</Header>
            </Pressable>
          </Container>
        </Card>
        {!hideLinkButton && (
          <Button
            type="primary"
            style={{
              padding: 12,
              marginRight: 12,
              marginLeft: 12,
              marginBottom: 8,
              display: "flex",
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
              name: "reply-all",
              color: Colors.white,
            }}
            onPress={handleBuyerLinkClick}
          >
            {t("common.SeeAllBuyerDetails")}
          </Button>
        )}
      </Container>
    </ScrollView>
  );
}
