import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  AlertCircle,
  Clock,
  ArrowRight,
  RefreshCw,
} from "lucide-react-native";
import {
  useGetAnimalsCountQuery,
  useGetUnsoldAnimalsQuery,
  useGetSalesQuery,
  useGetTransactionsQuery,
  useGetAllActivityLogsQuery,
} from "../services";
import "../../global.css";

export default function DashboardScreen() {
  const { t } = useTranslation();
  const isRTL = t("dir") === "rtl";
  const navigation = useNavigation<any>();

  // RTK Query hooks
  const {
    data: activitiesLogs = [],
    isLoading: activitiesLoading,
    refetch: refetchActivities,
  } = useGetAllActivityLogsQuery();

  const {
    data: totalAnimals = 0,
    isLoading: animalsCountLoading,
    refetch: refetchAnimalsCount,
  } = useGetAnimalsCountQuery();

  const {
    data: unsoldAnimals = [],
    isLoading: unsoldAnimalsLoading,
    refetch: refetchUnsoldAnimals,
  } = useGetUnsoldAnimalsQuery();

  const {
    data: salesData,
    isLoading: salesLoading,
    refetch: refetchSales,
  } = useGetSalesQuery({});

  const {
    data: transactionsData,
    isLoading: transactionsLoading,
    refetch: refetchTransactions,
  } = useGetTransactionsQuery();

  const sales = salesData?.content || [];
  const transactions = transactionsData || [];
  const totalUnsoldAnimals = unsoldAnimals.length;

  const fetchData = () => {
    refetchAnimalsCount();
    refetchUnsoldAnimals();
    refetchSales();
    refetchTransactions();
    refetchActivities();
  };

  const isLoading =
    animalsCountLoading || unsoldAnimalsLoading || salesLoading || transactionsLoading || activitiesLoading;

  // Calculate statistics
  const totalAnimalsCount = totalAnimals || 0;
  const totalUnsoldCount = totalUnsoldAnimals || 0;
  const totalSoldCount = totalAnimalsCount - totalUnsoldCount;
  const totalSalesCount = sales?.length || 0;

  const totalRevenue = transactions
    ? transactions.reduce((sum: number, t: any) => {
        const amountStr = t.amount?.toString().replace("DH", "").trim() || "0";
        return sum + parseFloat(amountStr);
      }, 0)
    : 0;

  const pendingPayments =
    sales?.filter((s: any) => s.paymentStatus === "NOT_PAID").length || 0;

  const totalRemainingAmount =
    sales?.reduce((sum: number, sale: any) => {
      const remainingStr =
        sale.paymentDetail?.remainingAmount?.toString().replace("DH", "").trim() || "0";
      return sum + parseFloat(remainingStr);
    }, 0) || 0;

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const salesThisMonth =
    sales?.filter((s: any) => {
      const [day, month, year] = (s.saleDate || "").split("-").map(Number);
      return month - 1 === currentMonth && year === currentYear;
    }).length || 0;

  if (isLoading) {
    return (
      <View className="flex-1 bg-surface-50 items-center justify-center">
        <ActivityIndicator size="large" color="#334e68" />
        <Text className="text-surface-500 mt-4 text-base">
          {t("common.loading_dashboard")}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-surface-50">
      {/* Header */}
      <LinearGradient
        colors={["#334e68", "#243b53"]}
        style={styles.header}
      >
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-white/70 text-sm">
              {t("common.Overview")}
            </Text>
            <Text className="text-white text-2xl font-bold">
              {t("common.dashboard")}
            </Text>
          </View>
          <TouchableOpacity
            onPress={fetchData}
            className="w-10 h-10 bg-white/10 rounded-full items-center justify-center"
          >
            <RefreshCw size={20} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        className="flex-1 -mt-4"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchData} />
        }
      >
        {/* Quick Stats Cards */}
        <View className="px-5 flex-row flex-wrap justify-between">
          {/* Total Animals */}
          <View className="w-[48%] bg-white rounded-2xl p-4 mb-3 shadow-sm">
            <View className="w-10 h-10 bg-info-100 rounded-xl items-center justify-center mb-3">
              <Icon name="sheep" size={22} color="#0ea5e9" />
            </View>
            <Text className="text-2xl font-bold text-primary-900">
              {totalAnimalsCount}
            </Text>
            <Text className="text-surface-500 text-xs mt-1">
              {t("common.total_animals")}
            </Text>
          </View>

          {/* Unsold */}
          <View className="w-[48%] bg-white rounded-2xl p-4 mb-3 shadow-sm">
            <View className="w-10 h-10 bg-success-100 rounded-xl items-center justify-center mb-3">
              <Icon name="sheep" size={22} color="#14b8a6" />
            </View>
            <Text className="text-2xl font-bold text-primary-900">
              {totalUnsoldCount}
            </Text>
            <Text className="text-surface-500 text-xs mt-1">
              {t("common.unsold_animals")}
            </Text>
          </View>

          {/* Sold */}
          <View className="w-[48%] bg-white rounded-2xl p-4 mb-3 shadow-sm">
            <View className="w-10 h-10 bg-accent-100 rounded-xl items-center justify-center mb-3">
              <ShoppingCart size={20} color="#f59e0b" />
            </View>
            <Text className="text-2xl font-bold text-primary-900">
              {totalSoldCount}
            </Text>
            <Text className="text-surface-500 text-xs mt-1">
              {t("common.sold_animals")}
            </Text>
          </View>

          {/* Sales */}
          <View className="w-[48%] bg-white rounded-2xl p-4 mb-3 shadow-sm">
            <View className="w-10 h-10 bg-primary-100 rounded-xl items-center justify-center mb-3">
              <TrendingUp size={20} color="#334e68" />
            </View>
            <Text className="text-2xl font-bold text-primary-900">
              {totalSalesCount}
            </Text>
            <Text className="text-surface-500 text-xs mt-1">
              {t("common.total_sales")}
            </Text>
          </View>
        </View>

        {/* Revenue Card */}
        <View className="px-5 mt-2">
          <LinearGradient
            colors={["#f59e0b", "#d97706"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.revenueCard}
          >
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-white/80 text-sm">
                  {t("common.total_revenue")}
                </Text>
                <Text className="text-white text-3xl font-bold mt-1">
                  {totalRevenue.toFixed(2)} MAD
                </Text>
              </View>
              <View className="w-14 h-14 bg-white/20 rounded-full items-center justify-center">
                <DollarSign size={28} color="white" />
              </View>
            </View>
            <View className="flex-row mt-4 pt-4 border-t border-white/20">
              <View className="flex-1">
                <Text className="text-white/70 text-xs">
                  {t("common.sales_this_month")}
                </Text>
                <Text className="text-white text-lg font-semibold">
                  {salesThisMonth}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-white/70 text-xs">
                  {t("common.pending_payments")}
                </Text>
                <Text className="text-white text-lg font-semibold">
                  {pendingPayments}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Remaining Amount */}
        {totalRemainingAmount > 0 && (
          <View className="px-5 mt-4">
            <View className="bg-danger-50 border border-danger-200 rounded-2xl p-4 flex-row items-center">
              <View className="w-10 h-10 bg-danger-100 rounded-full items-center justify-center">
                <AlertCircle size={20} color="#f43f5e" />
              </View>
              <View className="ml-3 flex-1">
                <Text className="text-danger-700 text-sm font-medium">
                  {t("common.remaining_amount_owed")}
                </Text>
                <Text className="text-danger-800 text-xl font-bold">
                  {totalRemainingAmount.toFixed(2)} MAD
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Recent Activities */}
        <View className="px-5 mt-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-primary-800 text-lg font-bold">
              {t("common.recent_activities")}
            </Text>
          </View>
          <View className="bg-white rounded-2xl overflow-hidden shadow-sm">
            {activitiesLogs && activitiesLogs.length > 0 ? (
              activitiesLogs.slice(0, 5).map((log: any, index: number) => (
                <View
                  key={log.id || index}
                  className={`flex-row items-center p-4 ${
                    index < Math.min(activitiesLogs.length, 5) - 1
                      ? "border-b border-surface-100"
                      : ""
                  }`}
                >
                  <View className="w-10 h-10 bg-surface-100 rounded-full items-center justify-center">
                    <Clock size={18} color="#627d98" />
                  </View>
                  <View className="ml-3 flex-1">
                    <Text className="text-primary-800 text-sm font-medium">
                      {log.activity}
                    </Text>
                    <Text className="text-surface-500 text-xs mt-0.5">
                      {log.logDate}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <View className="p-6 items-center">
                <Text className="text-surface-400 text-sm">
                  {t("common.No_activity_logs_found")}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Quick Links */}
        <View className="px-5 mt-6">
          <Text className="text-primary-800 text-lg font-bold mb-4">
            {t("common.Quick Access")}
          </Text>
          <View className="flex-row">
            <TouchableOpacity
              onPress={() => navigation.navigate("Sales")}
              className="flex-1 bg-white rounded-2xl p-4 mr-2 flex-row items-center shadow-sm"
            >
              <View className="w-10 h-10 bg-accent-100 rounded-xl items-center justify-center">
                <ShoppingCart size={18} color="#f59e0b" />
              </View>
              <Text className="text-primary-700 font-medium ml-3 flex-1">
                {t("common.view_all_sales")}
              </Text>
              <ArrowRight size={18} color="#a1a1aa" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 48,
    paddingBottom: 32,
    paddingHorizontal: 20,
  },
  revenueCard: {
    borderRadius: 16,
    padding: 20,
  },
});
