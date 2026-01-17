import "../../../global.css";
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react-native";
import FallBack, { FALLBACK_TYPE } from "../global/Fallback";
import Loading from "../global/Loading";
import {
  getTransactionsByBuyer,
  getTransactionsBySale,
} from "../../features/transactionSlice";
import TransactionCardView from "./TransactionCardView";
import AddTransactionModal from "./AddTransactionModal";

interface Transaction {
  id: number;
  transactionDate: string;
  method: string;
  amount: number;
}

interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

interface RootState {
  transactions: TransactionState;
}

interface TransactionsListCardViewProps {
  id: number;
  type?: "sale" | "buyer";
}

const TransactionsListCardView: React.FC<TransactionsListCardViewProps> = ({
  id,
  type = "sale",
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (type === "sale") {
      dispatch(getTransactionsBySale(id) as any);
    }

    if (type === "buyer") {
      dispatch(getTransactionsByBuyer(id) as any);
    }
  }, [dispatch, id, type]);

  const { transactions, loading, error } = useSelector(
    (state: RootState) => state.transactions
  );

  if (loading || !transactions) return <Loading />;

  if (error) return <FallBack type={FALLBACK_TYPE.ERROR} />;

  return (
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
        />
      )}

      {isVisible && (
        <AddTransactionModal
          id={id}
          type={type}
          visible={isVisible}
          toggleDialog={setIsVisible}
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
  );
};

export default TransactionsListCardView;
