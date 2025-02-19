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

const Container = styled(View)({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
});

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
        <CardIcon
          icon="person-outline"
          text="Buyer name"
          subText={buyer.fullName}
        />
        <CardIcon icon="card-outline" text="Sale Date" subText={buyer.cin} />

        <CardIcon
          icon="wallet-outline"
          text="map-outline"
          subText={buyer.address}
          style={{ flex: 1 }}
        />

        <CardIcon
          icon="wallet-outline"
          text="call-outline"
          subText={buyer.phone}
          style={{ flex: 1 }}
        />

        {/* <FallBack type={FALLBACK_TYPE.NOT_FOUND} message={"Not Found"} /> */}
      </Container>
    </ScrollView>
  );
}
