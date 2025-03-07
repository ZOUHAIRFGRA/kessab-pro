import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Share } from "react-native";
import { styled } from "dripsy";
import { useDispatch, useSelector } from "react-redux";
import FallBack, { FALLBACK_TYPE } from "../global/Fallback";
import Loading from "../global/Loading";
import { getSale, exportSaleInvoice } from "../../features/saleSlice";
import CardIcon from "../global/CardIcon";
import { getPickedUpRatio } from "../../helpers/AnimalHelpers";
import { useTranslation } from "react-i18next";
import Button from "../global/Button";
import Colors from "../../utils/Colors";
import ConfirmationModal from "../global/ConfirmationModal";
import saleApi from "../../api/saleApi";
import { useToast } from "../../hooks/useToast";

// import * as Permissions from "expo-permissions";

// import Share from "react-native-share";

const Container = styled(View)({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
});

export default function SaleInfoView({ id }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isCloseConfirmationModalOpen, setIsCloseConfirmationModalOpen] =
    useState(false);
  const { showSuccessToast, showErrorToast } = useToast();
  const onCloseConfirmation = () => {
    saleApi
      .closeSale(id)
      .then(() => {
        showSuccessToast();
        dispatch(getSale(id));
      })
      .catch((e) => {
        showErrorToast();
      });
  };
  const {
    sale,
    saleLoading: loading,
    error,
  } = useSelector((states) => states.sales);

  if (loading || !sale) return <Loading />;
  if (error) return <FallBack type={FALLBACK_TYPE.NOT_FOUND} />;

  return (
    <ScrollView>
      {isCloseConfirmationModalOpen && (
        <ConfirmationModal
          visible={isCloseConfirmationModalOpen}
          toggleVisible={setIsCloseConfirmationModalOpen}
          action={onCloseConfirmation}
          title={t("modal.confirmation")}
          closable
          btnParams={{
            type: "secondary",
            icon: {
              name: "trash",
            },
            btnText: t("common.confirm"),
          }}
          bodyText={t("modal.close_sale_confirmation")}
        />
      )}
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
      <Container sx={{ padding: 16 }}>
        <Button
          type="primary"
          style={{
            padding: 12,
            marginRight: 12,
            marginLeft: 12,
            marginBottom: 8,
            justifyContent: "center",
            alignItems: "center",

            width: "100%",
          }}
          textStyle={{
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 16,
          }}
          icon={{
            name: "handshake-o",
            color: Colors.white,
          }}
          onPress={() => setIsCloseConfirmationModalOpen(true)}
          disabled={sale?.paymentStatus === "FULLY_PAID"}
        >
          {t("common.close_sale")}
        </Button>
        <Button
          type="secondary"
          style={{
            padding: 12,
            marginRight: 12,
            marginLeft: 12,
            marginBottom: 8,
            justifyContent: "center",
            alignItems: "center",

            width: "100%",
          }}
          textStyle={{
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 16,
          }}
          icon={{
            name: "share-alt",
            color: Colors.white,
          }}
          onPress={() => exportSaleInvoice(id)}
        >
          {t("common.share_print")}
        </Button>
      </Container>
    </ScrollView>
  );
}
