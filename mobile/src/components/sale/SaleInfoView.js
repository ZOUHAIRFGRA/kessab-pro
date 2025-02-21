import React, { useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { styled } from "dripsy";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "../EmptyState/NotFound";
import FallBack, { FALLBACK_TYPE } from "../global/Fallback";
import Loading from "../global/Loading";
import { getSale } from "../../features/saleSlice";
import CardIcon from "../global/CardIcon";
import { getPickedUpRatio } from "../../helpers/AnimalHelpers";
import { t } from "i18next";

const Container = styled(View)({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
});

export default function SaleInfoView({ id }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSale(id));
  }, [dispatch, id]);

  useEffect(() => {
    console.log("mounted");
    return () => {
      console.log("unmount");
    };
  }, []);

  const { sale, loading, error } = useSelector(({ sales }) => sales);
  console.log({ animals: sale?.animals });

  if (loading || !sale) return <Loading />;
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
          text={t("common.buyer_name")}
          subText={sale.buyer.fullName}
        />
        <CardIcon
          icon="calendar-outline"
          text={t("common.sale_date")}
          subText={sale.saleDate}
        />
        <CardIcon
          icon="handshake-o"
          iconType="font-awesome"
          text={t("common.agreed_amount")}
          subText={sale.agreedAmount}
          hideIcon
          style={{ flex: 1 }}
        />
        <Container
          sx={{
            flexDirection: "row",
            flex: 1,
            gap: 12,
          }}
        >
          <CardIcon
            icon="wallet-outline"
            text={t("common.remaining_amount")}
            subText={sale.paymentDetail.remainingAmount}
            hideIcon
            style={{ flex: 1 }}
          />
          <CardIcon
            icon="wallet-outline"
            text={t("common.paid_amount")}
            subText={sale.paymentDetail.paidAmount}
            hideIcon
            style={{ flex: 1 }}
          />
        </Container>

        <CardIcon
          icon="wallet-outline"
          text={t("common.payment_status")}
          subText={t(`payment_type.${sale.paymentStatus}`)}
        />

        <CardIcon
          icon="cart-outline"
          text={t("common.picked_up_ratio")}
          subText={getPickedUpRatio(sale.animals)}
        />
      </Container>
    </ScrollView>
  );
}
