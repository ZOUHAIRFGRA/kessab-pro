import "../../../global.css";
import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { Plus, Receipt } from "lucide-react-native";
import FallBack, { FALLBACK_TYPE } from "../global/Fallback";
import Loading from "../global/Loading";
import { useGetTransactionsBySaleQuery, useGetTransactionsByBuyerQuery } from "../../services";
import TransactionCardView from "./TransactionCardView";
import AddTransactionModal from "./AddTransactionModal";
import type { Transaction } from "../../types/api";

interface TransactionsListCardViewProps {
  id: string; // UUID
  type?: "sale" | "buyer";
  agreedAmount?: string; // For sales: format "8166.55DH"
  paidAmount?: string; // For sales: format "500.0DH"
}

const TransactionsListCardView: React.FC<TransactionsListCardViewProps> = ({
  id,
  type = "sale",
  agreedAmount,
  paidAmount,
}) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  // Conditional RTK Query hooks
  const {
    data: saleTransactions,
    isLoading: saleLoading,
    error: saleError,
  } = useGetTransactionsBySaleQuery(id, {
    skip: type !== "sale",
  });

  const {
    data: buyerTransactions,
    isLoading: buyerLoading,
    error: buyerError,
  } = useGetTransactionsByBuyerQuery(id, {
    skip: type !== "buyer",
  });

  const isLoading = type === "sale" ? saleLoading : buyerLoading;
  const error = type === "sale" ? saleError : buyerError;
  const transactions: Transaction[] = type === "sale" 
    ? (saleTransactions || []) 
    : (buyerTransactions || []);

  if (isLoading) return <Loading />;

  if (error) return <FallBack type={FALLBACK_TYPE.ERROR} />;

  return (
    <View className="flex-1 bg-surface-50">
      {/* Header */}
      <LinearGradient
        colors={["#334e68", "#243b53"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingHorizontal: 24, paddingTop: 48, paddingBottom: 24 }}
      >
        <View className="flex-row items-center gap-3">
          <View className="bg-white/20 rounded-full p-3">
            <Receipt size={24} color="#ffffff" strokeWidth={2} />
          </View>
          <View className="flex-1">
            <Text className="text-white text-2xl font-bold">
              {t("common.Transactions")}
            </Text>
            <Text className="text-white/80 text-sm mt-1">
              {transactions.length} {t("common.payments")}
            </Text>
          </View>
        </View>
      </LinearGradient>

      <View className="flex-1">
      {transactions.length === 0 ? (
        <FallBack
          type={FALLBACK_TYPE.NOT_FOUND}
          message={t(`common.noTransactions`)}
        />
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(transaction) => transaction.id.toString()}
          renderItem={({ item }) => (
            <TransactionCardView transaction={item} type={type} id={id} />
          )}
          ItemSeparatorComponent={() => <View className="h-2.5" />}
          contentContainerStyle={{ paddingTop: 16 }}
        />
      )}

      {isVisible && (
        <AddTransactionModal
          id={id}
          type={type}
          visible={isVisible}
          toggleDialog={setIsVisible}
          agreedAmount={agreedAmount}
          paidAmount={paidAmount}
        />
      )}

      <TouchableOpacity
        className="bg-primary-700 rounded-2xl p-4 mx-3 mb-2 flex-row items-center justify-center gap-3 shadow-sm"
        onPress={() => setIsVisible(true)}
      >
        <Plus size={20} color="#ffffff" strokeWidth={2.5} />
        <Text className="text-white font-bold text-center text-base">
          {t("common.addTransaction")}
        </Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default TransactionsListCardView;
