import React, { useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { styled } from "dripsy";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "../EmptyState/NotFound";
import FallBack, { FALLBACK_TYPE } from "../global/Fallback";
import Loading from "../global/Loading";
import { getSale } from "../../features/saleSlice";
import { useFocusEffect } from "@react-navigation/native"; // Importing the hook
import CardIcon from "../global/CardIcon";
import { getBuyer } from "../../features/buyerSlice";
import Colors from "../../utils/Colors";
import Header from "../global/Header";
import Container from "../global/Container";
import Card from "../global/Card";
import Button from "../global/Button";
import { Icon } from "@rneui/base";

export default function BuyerInfoView({ id }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBuyer(id));
  }, [dispatch, id]);

  const buyer = useSelector(({ buyers }) => buyers.buyer);
  const loading = useSelector(({ buyers }) => buyers.loading);
  const error = useSelector(({ buyers }) => buyers.error);

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
            <Text>{"Full name"}</Text>
            <Header level={"h3"}>{buyer.fullName}</Header>
          </Container>
          <Container style={{ flex: 1, justifyContent: "end" }}>
            <Text>{"CIN"}</Text>
            <Header level={"h3"}>{buyer.cin}</Header>
          </Container>
          <Container style={{ flex: 1, justifyContent: "end" }}>
            <Text>{"ADDRESS"}</Text>
            <Header level={"h3"}>{buyer.address}</Header>
          </Container>
          <Container style={{ flex: 1, justifyContent: "end" }}>
            <Text>{"Phone"}</Text>
            <Header level={"h3"}>{buyer.phone}</Header>
          </Container>
        </Card>
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
        >
          See full buyer details
        </Button>
      </Container>
    </ScrollView>
  );
}
