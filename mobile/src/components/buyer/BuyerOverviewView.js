import React, { useCallback, useEffect } from "react";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getBuyerOverview, resetBuyer } from "../../features/buyerSlice";
import Colors from "../../utils/Colors";
import Header from "../global/Header";
import Container from "../global/Container";
import Card from "../global/Card";
import { color, Icon } from "@rneui/base";
import Text from "../global/Text";
import { useTranslation } from "react-i18next";
import Loading from "../global/Loading";
import FallBack, { FALLBACK_TYPE } from "../global/Fallback";
import { useFocusEffect } from "@react-navigation/native";

export default function BuyerOverviewView({ id }) {
  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(resetBuyer());
      };
    }, [])
  );

  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBuyerOverview(id));
  }, [dispatch, id]);
  const {
    error,
    buyerLoading: loading,
    buyer,
    animalsPickedUp,
    animalsNotPickedUp,
    totalAnimals,
    totalToPay,
    totalPaid,
  } = useSelector((states) => states.buyers);

  if (loading || !buyer) return <Loading />;
  if (error) return <FallBack type={FALLBACK_TYPE.NOT_FOUND} />;

  const formatCurrency = (value) => {
    return value.toFixed(2) + " MAD";
  };

  return (
    <ScrollView>
      <Container
        sx={{
          gap: 16,
          justifyContent: "start",
          flex: 1,
          alignItems: "start",
          padding: 18,
        }}
      >
        {/* Buyer Info Card */}
        <Card
          sx={{
            gap: 12,
            flexDirection: "column",
            padding: 20,
            borderRadius: 12,
            width: "100%",
            backgroundColor: Colors.white,
            shadowColor: Colors.primary,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Container sx={{ justifyContent: "center", flexDirection: "row" }}>
            <Icon
              name="person"
              size={40}
              reverse
              raised
              color={Colors.primary}
            />
          </Container>
          <Container sx={{ justifyContent: "center", alignItems: "center" }}>
            <Header level={"h2"} style={{ color: Colors.primary }}>
              {buyer.fullName}
            </Header>
          </Container>
        </Card>

        {/* Animals Statistics Card */}
        <Card
          sx={{
            gap: 16,
            flexDirection: "column",
            padding: 20,
            borderRadius: 12,
            width: "100%",
            backgroundColor: Colors.white,
            shadowColor: Colors.primary,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Header
            level={"h3"}
            style={{ color: Colors.secondary, marginBottom: 8 }}
          >
            {t("common.AnimalsStatistics")}
          </Header>

          <Container
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Container
              sx={{ flexDirection: "column", alignItems: "center", flex: 1 }}
            >
              <Icon name="pets" size={28} color={Colors.primary} />
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  color: Colors.primary,
                }}
              >
                {totalAnimals}
              </Text>
              <Text style={{ color: Colors.primary }}>
                {t("common.TotalAnimals")}
              </Text>
            </Container>

            <Container
              sx={{ flexDirection: "column", alignItems: "center", flex: 1 }}
            >
              <Icon name="check-circle" size={28} color={Colors.success} />
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  color: Colors.success,
                }}
              >
                {animalsPickedUp}
              </Text>
              <Text style={{ color: Colors.success }}>
                {t("common.PickedUp")}
              </Text>
            </Container>

            <Container
              sx={{ flexDirection: "column", alignItems: "center", flex: 1 }}
            >
              <Icon name="timer" size={28} color={Colors.warning} />
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  color: Colors.warning,
                }}
              >
                {animalsNotPickedUp}
              </Text>
              <Text style={{ color: Colors.warning }}>
                {t("common.NotPickedUp")}
              </Text>
            </Container>
          </Container>
        </Card>

        {/* Payment Card */}
        <Card
          sx={{
            gap: 16,
            flexDirection: "column",
            padding: 20,
            borderRadius: 12,
            width: "100%",
            backgroundColor: Colors.white,
            shadowColor: Colors.primary,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Header
            level={"h3"}
            style={{ color: Colors.secondary, marginBottom: 8 }}
          >
            {t("common.PaymentSummary")}
          </Header>

          <Container
            sx={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <Icon
              name="attach-money"
              size={24}
              color={Colors.primary}
              style={{ marginRight: 12 }}
            />
            <Container sx={{ flex: 1 }}>
              <Text style={{ color: Colors.primary }}>
                {t("common.TotalToPay")}
              </Text>
              <Header level={"h3"} style={{ color: Colors.primary }}>
                {formatCurrency(totalToPay)}
              </Header>
            </Container>
          </Container>

          <Container
            sx={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <Icon
              name="payment"
              size={24}
              color={Colors.success}
              style={{ marginRight: 12 }}
            />
            <Container sx={{ flex: 1 }}>
              <Text style={{ color: Colors.success }}>
                {t("common.TotalPaid")}
              </Text>
              <Header level={"h3"} style={{ color: Colors.success }}>
                {formatCurrency(totalPaid)}
              </Header>
            </Container>
          </Container>

          <Container
            sx={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: Colors.secondaryLight,
              padding: 12,
              borderRadius: 8,
            }}
          >
            <Icon
              name="account-balance"
              size={24}
              color={Colors.secondary}
              style={{ marginRight: 12 }}
            />
            <Container sx={{ flex: 1 }}>
              <Text style={{ color: Colors.secondary }}>
                {t("common.RemainingBalance")}
              </Text>
              <Header level={"h3"} style={{ color: Colors.secondary }}>
                {formatCurrency(totalToPay - totalPaid)}
              </Header>
            </Container>
          </Container>
        </Card>
      </Container>
    </ScrollView>
  );
}
