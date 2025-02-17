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

const Container = styled(View)({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
});

export default function SaleInfoView({ sale = null }) {

  return (
    <ScrollView>
    {
      sale ? (
        <Container
        sx={{
          gap: 12,
          justifyContent: "start",
          flex: 1,
          alignItems: "start",
          padding: 18,
        }}
      >
        <CardIcon icon="person-outline" text="Buyer name" subText={sale.buyer.fullName} />
        <CardIcon icon="calendar-outline" text="Sale Date" subText={sale.saleDate} />
        <Container
          sx={{
            flexDirection: "row",
            flex: 1,
            gap: 12,
          }}
        >
          <CardIcon
            icon="handshake-o"
            iconType="font-awesome"
            text="Agreed amount"
            subText={sale.agreedAmount}
          hideIcon
          style={{ flex: 1 }}
          />
          <CardIcon
            icon="wallet-outline"
            text="Paid amount"
            subText={sale.agreedAmount}
          hideIcon
          style={{ flex: 1 }}

          />
        </Container>

        <CardIcon
          icon="wallet-outline"
          text="Payment statut"
          subText={sale.paymentStatus}
        />
        <CardIcon icon="cart-outline" text="Animal count" subText={sale.animals.length} />
        <CardIcon
          icon="log-out-outline"
          text="is picked up"
          subText={"salam"}
        />

        {/* <FallBack type={FALLBACK_TYPE.NOT_FOUND} message={"Not Found"} /> */}
      </Container>
      ) : (
        <FallBack type={FALLBACK_TYPE.NOT_FOUND} />
      )}
    </ScrollView>
  );
}
