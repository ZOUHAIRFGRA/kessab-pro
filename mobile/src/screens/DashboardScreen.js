import React, { useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { styled } from "dripsy";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getAnimalsCount, getUnsoldAnimals } from "../features/animalSlice";
import { getSales } from "../features/saleSlice";
import { getTransactions } from "../features/transactionSlice";
// import { getBuyers } from "../features/buyerSlice";
import { getAllAnimalActivitiesLogs } from "../features/animalActivitiesLogSlice";

const DashboardScreen = () => {
  const { t } = useTranslation();
  const isRTL = t("dir") === "rtl";
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {
    activitiesLogs,
    loading: activitiesLoading,
    error: activitiesError,
  } = useSelector((state) => state.animalActivitiesLogs);
  const {
    totalAnimals,
    totalUnsoldAnimals,
    loading: animalsLoading,
    error: animalsError,
  } = useSelector((state) => state.animals);
  const {
    sales,
    loading: salesLoading,
    error: salesError,
  } = useSelector((state) => state.sales);
  const {
    transactions,
    loading: transactionsLoading,
    error: transactionsError,
  } = useSelector((state) => state.transactions);

  useEffect(() => {
    console.log("Dispatching getAnimalsCount...");
    dispatch(getAnimalsCount()).catch((err) =>
      console.error("getAnimalsCount failed:", err)
    );
    console.log("Dispatching getUnsoldAnimals...");
    dispatch(getUnsoldAnimals()).catch((err) =>
      console.error("getUnsoldAnimals failed:", err)
    );
    console.log("Dispatching getSales...");
    dispatch(getSales()).catch((err) => console.error("getSales failed:", err));
    console.log("Dispatching getTransactions...");
    dispatch(getTransactions()).catch((err) =>
      console.error("getTransactions failed:", err)
    );

    console.log("Dispatching getAllAnimalActivitiesLogs...");
    dispatch(getAllAnimalActivitiesLogs()).catch((err) =>
      console.error("getAllAnimalActivitiesLogs failed:", err)
    );
  }, [dispatch]);

  const isLoading =
    animalsLoading || salesLoading || transactionsLoading || activitiesLoading;

  const hasErrors =
    animalsError || salesError || transactionsError || activitiesError;

  const navigateTo = (screen) => navigation.navigate(screen);

  if (isLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#4A90E2" />
        <LoadingText isRTL={isRTL}>{t("common.loading_dashboard")}</LoadingText>
      </LoadingContainer>
    );
  }

  if (hasErrors) {
    return (
      <ErrorContainer>
        <ErrorTitle isRTL={isRTL}>{t("common.data_fetch_error")}</ErrorTitle>
        <ErrorText isRTL={isRTL}>
          {animalsError ||
            salesError ||
            transactionsError ||
            buyersError ||
            activitiesError}
        </ErrorText>
      </ErrorContainer>
    );
  }

  // console.log("totalAnimals", totalAnimals);
  // console.log("totalUnsoldAnimals", totalUnsoldAnimals);
  // console.log("sales", sales);
  // console.log("transactions", transactions);
  // console.log("buyers", buyers);
  // console.log("activitiesLogs", activitiesLogs);

  const totalAnimalsCount = totalAnimals || 0;
  const totalUnsoldCount = totalUnsoldAnimals || 0;
  const totalSoldCount = totalAnimalsCount - totalUnsoldCount;
  const totalSalesCount = sales.length || 0;
  const totalTransactionsCount = transactions.content
    ? transactions.content.length
    : 0;
  const totalRevenue = transactions.content
    ? transactions.content.reduce((sum, t) => {
        const amountStr = t.amount.replace("DH", "").trim();
        return sum + parseFloat(amountStr);
      }, 0)
    : 0;
  const pendingPayments =
    sales.filter((s) => s.paymentStatus === "NOT_PAID").length || 0;
  const totalRemainingAmount =
    sales.reduce((sum, sale) => {
      const remainingStr = sale.paymentDetail.remainingAmount
        .replace("DH", "")
        .trim();
      return sum + parseFloat(remainingStr);
    }, 0) || 0;
  const totalAgreedAmount =
    sales.reduce((sum, sale) => {
      const agreedStr = sale.agreedAmount.replace("DH", "").trim();
      return sum + parseFloat(agreedStr);
    }, 0) || 0;

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const salesThisMonth =
    sales.filter((s) => {
      const [day, month, year] = s.saleDate.split("-").map(Number);
      return month - 1 === currentMonth && year === currentYear;
    }).length || 0;

  const transactionsThisMonth = transactions.content
    ? transactions.content.filter((t) => {
        const transDate = new Date(t.transactionDate);
        return (
          transDate.getMonth() === currentMonth &&
          transDate.getFullYear() === currentYear
        );
      }).length
    : 0;

  const lastSoldAnimals = sales.flatMap((sale) => sale.animals).slice(0, 3);
  console.log("lastSoldAnimals", lastSoldAnimals);

  const recentTransactions = transactions.content
    ? transactions.content.slice(0, 3)
    : [];

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        {/* Header */}
        <Header isRTL={isRTL}>
          <HeaderText>{t("common.dashboard")}</HeaderText>
        </Header>

        {/* Animal Statistics */}
        <StatCard>
          <StatTitle isRTL={isRTL}>{t("common.animal_statistics")}</StatTitle>
          <StatItem isRTL={isRTL}>
            <Icon name="sheep" size={20} color="#4A90E2" />
            <StatLabel isRTL={isRTL}>{t("common.total_animals")}</StatLabel>
            <StatValue>{totalAnimalsCount}</StatValue>
          </StatItem>
          <StatItem isRTL={isRTL}>
            <Icon name="sheep" size={20} color="#34C759" />
            <StatLabel isRTL={isRTL}>{t("common.unsold_animals")}</StatLabel>
            <StatValue>{totalUnsoldCount}</StatValue>
          </StatItem>
          <StatItem isRTL={isRTL}>
            <Icon name="sheep" size={20} color="#FF9500" />
            <StatLabel isRTL={isRTL}>{t("common.sold_animals")}</StatLabel>
            <StatValue>{totalSoldCount}</StatValue>
          </StatItem>
        </StatCard>

        {/* Sales Statistics */}
        <StatCard>
          <StatTitle isRTL={isRTL}>{t("common.sales_statistics")}</StatTitle>
          <StatItem isRTL={isRTL}>
            <Icon name="cart-outline" size={20} color="#4A90E2" />
            <StatLabel isRTL={isRTL}>{t("common.total_sales")}</StatLabel>
            <StatValue>{totalSalesCount}</StatValue>
          </StatItem>
          <StatItem isRTL={isRTL}>
            <Icon name="cart-check" size={20} color="#34C759" />
            <StatLabel isRTL={isRTL}>{t("common.sales_this_month")}</StatLabel>
            <StatValue>{salesThisMonth}</StatValue>
          </StatItem>
          <StatItem isRTL={isRTL}>
            <Icon name="alert-circle-outline" size={20} color="#FF9500" />
            <StatLabel isRTL={isRTL}>{t("common.pending_payments")}</StatLabel>
            <StatValue>{pendingPayments}</StatValue>
          </StatItem>
        </StatCard>

        {/* Financial Statistics */}
        <StatCard>
          <StatTitle isRTL={isRTL}>
            {t("common.financial_statistics")}
          </StatTitle>
          <StatItem isRTL={isRTL}>
            <Icon name="cash" size={20} color="#4A90E2" />
            <StatLabel isRTL={isRTL}>{t("common.total_revenue")}</StatLabel>
            <StatValue>{totalRevenue.toFixed(2)} MAD</StatValue>
          </StatItem>
          <StatItem isRTL={isRTL}>
            <Icon name="cash-check" size={20} color="#34C759" />
            <StatLabel isRTL={isRTL}>
              {t("common.transactions_this_month")}
            </StatLabel>
            <StatValue>{transactionsThisMonth}</StatValue>
          </StatItem>
          <StatItem isRTL={isRTL}>
            <Icon name="cash-remove" size={20} color="#FF3B30" />
            <StatLabel isRTL={isRTL}>
              {t("common.remaining_amount_owed")}
            </StatLabel>
            <StatValue>{totalRemainingAmount.toFixed(2)} MAD</StatValue>
          </StatItem>
          <StatItem isRTL={isRTL}>
            <Icon name="cash-plus" size={20} color="#4A90E2" />
            <StatLabel isRTL={isRTL}>
              {t("common.total_agreed_sales")}
            </StatLabel>
            <StatValue>{totalAgreedAmount.toFixed(2)} MAD</StatValue>
          </StatItem>
        </StatCard>

        {/* Last Sold Animals */}
        <StatCard>
          <StatTitle isRTL={isRTL}>{t("common.last_sold_animals")}</StatTitle>
          {lastSoldAnimals.length > 0 ? (
            lastSoldAnimals.map((animal, index) => (
              <ActivityRow key={index} isRTL={isRTL}>
                <Icon name="sheep" size={16} color="#64748b" />
                <ActivityText isRTL={isRTL}>
                  {animal.tag || "Unknown Tag"} -{" "}
                  {sales.find((s) => s.animals.includes(animal))?.saleDate ||
                    "N/A"}
                </ActivityText>
              </ActivityRow>
            ))
          ) : (
            <ActivityText isRTL={isRTL}>
              {t("common.no_sold_animals")}
            </ActivityText>
          )}
          <MoreLink onPress={() => navigateTo("Sales")} isRTL={isRTL}>
            {t("common.view_all_sales")}
          </MoreLink>
        </StatCard>

        {/* Recent Transactions */}
        <StatCard>
          <StatTitle isRTL={isRTL}>{t("common.recent_transactions")}</StatTitle>
          {recentTransactions.length > 0 ? (
            recentTransactions.map((trans) => (
              <ActivityRow key={trans.id} isRTL={isRTL}>
                <Icon name="cash" size={16} color="#64748b" />
                <ActivityText isRTL={isRTL}>
                  {trans.amount} - {trans.transactionDate}
                </ActivityText>
              </ActivityRow>
            ))
          ) : (
            <ActivityText isRTL={isRTL}>
              {t("common.no_transactions")}
            </ActivityText>
          )}
        </StatCard>

        {/* Recent Activities */}
        <StatCard>
          <StatTitle isRTL={isRTL}>{t("common.recent_activities")}</StatTitle>
          {activitiesLogs.length > 0 ? (
            activitiesLogs.slice(0, 3).map((log) => (
              <ActivityRow key={log.id} isRTL={isRTL}>
                <Icon name="history" size={16} color="#64748b" />
                <ActivityText isRTL={isRTL}>
                  {log.activity} - {log.logDate}
                </ActivityText>
              </ActivityRow>
            ))
          ) : (
            <ActivityText isRTL={isRTL}>{t("common.No_activity_logs_found")}</ActivityText>
          )}
        </StatCard>
      </ScrollView>
    </Container>
  );
};

const Container = styled(View)({
  flex: 1,
  backgroundColor: "#F7F9FC",
});

const LoadingContainer = styled(View)({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#F7F9FC",
});

const ErrorContainer = styled(View)({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#F7F9FC",
  padding: 16,
});

const LoadingText = styled(Text)(({ isRTL }) => ({
  fontSize: 16,
  color: "#64748B",
  marginTop: 8,
  textAlign: isRTL ? "right" : "center",
  fontWeight: "500",
}));

const ErrorTitle = styled(Text)(({ isRTL }) => ({
  fontSize: 18,
  color: "#DC3545",
  textAlign: isRTL ? "right" : "center",
  fontWeight: "600",
}));

const ErrorText = styled(Text)(({ isRTL }) => ({
  fontSize: 14,
  color: "#DC3545",
  marginTop: 8,
  textAlign: isRTL ? "right" : "center",
}));

const Header = styled(View)(({ isRTL }) => ({
  marginBottom: 12,
  alignItems: isRTL ? "flex-end" : "flex-start",
}));

const HeaderText = styled(Text)({
  fontSize: 24,
  fontWeight: "700",
  color: "#1E293B",
});

const StatCard = styled(View)({
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  padding: 16,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 3,
  elevation: 1,
});

const StatTitle = styled(Text)(({ isRTL }) => ({
  fontSize: 16,
  fontWeight: "600",
  color: "#1E293B",
  marginBottom: 12,
  textAlign: isRTL ? "right" : "left",
}));

const StatItem = styled(View)(({ isRTL }) => ({
  flexDirection: isRTL ? "row-reverse" : "row",
  alignItems: "center",
  marginBottom: 8,
}));

const StatLabel = styled(Text)(({ isRTL }) => ({
  fontSize: 14,
  color: "#64748B",
  flex: 1,
  marginLeft: isRTL ? 0 : 8,
  marginRight: isRTL ? 8 : 0,
  textAlign: isRTL ? "right" : "left",
}));

const StatValue = styled(Text)({
  fontSize: 16,
  fontWeight: "600",
  color: "#1E293B",
});

const ActivityRow = styled(View)(({ isRTL }) => ({
  flexDirection: isRTL ? "row-reverse" : "row",
  alignItems: "center",
  marginBottom: 8,
}));

const ActivityText = styled(Text)(({ isRTL }) => ({
  fontSize: 13,
  color: "#475569",
  marginLeft: isRTL ? 0 : 8,
  marginRight: isRTL ? 8 : 0,
  textAlign: isRTL ? "right" : "left",
}));

const MoreLink = styled(Text)(({ isRTL }) => ({
  fontSize: 13,
  color: "#4A90E2",
  textAlign: isRTL ? "right" : "left",
  marginTop: 4,
}));

export default DashboardScreen;
