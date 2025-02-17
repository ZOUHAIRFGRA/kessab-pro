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

const Container = styled(View)({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
});

export default function BuyerInfoView({buyerId}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBuyer(buyerId));
  }, [dispatch, buyerId]);

  const loading = useSelector(({ buyers }) => buyers.loading);
  const error = useSelector(({ buyers }) => buyers.error);
  const buyer = useSelector(({ buyers }) => buyers.buyer);

  console.log("BuyerInfoView: ", buyer);
  


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
        {loading && <Loading />}
        {error && <FallBack />}
       
       {
        !loading && !error && <>
         <CardIcon icon="person-outline" text="Buyer name" subText={"salam"} />
        <CardIcon icon="calendar-outline" text="Sale Date" subText={"salam"} />
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
            subText={"salam"}
          hideIcon
          style={{ flex: 1 }}
          />
          <CardIcon
            icon="wallet-outline"
            text="Paid amount"
            subText={"salam"}
          hideIcon
          style={{ flex: 1 }}

          />
        </Container>

        <CardIcon
          icon="wallet-outline"
          text="Payment statut"
          subText={"salam"}
        />
        <CardIcon icon="cart-outline" text="Animal count" subText={"salam"} />
        <CardIcon
          icon="log-out-outline"
          text="is picked up"
          subText={"salam"}
        />
        </>
       }

        {/* <FallBack type={FALLBACK_TYPE.NOT_FOUND} message={"Not Found"} /> */}
      </Container>
    </ScrollView>
  );
}