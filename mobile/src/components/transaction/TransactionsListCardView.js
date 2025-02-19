import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import FallBack, { FALLBACK_TYPE } from "../global/Fallback";
import Loading from "../global/Loading";
import { getTransactionsBySale } from "../../features/transactionSlice";
import TransactionCardView from "./TransactionCardView";

const TransactionListCardView = ({ id, type }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactionsBySale(id));
  }, [dispatch]);

  const { transactions, loading, error } = useSelector(
    ({ transactions }) => transactions
  );

  if (loading) return <Loading />;
  if (error) return <FallBack type={FALLBACK_TYPE.ERROR} />;

  return (
    <View style={{ flex: 1 }}>
      {transactions.length === 0 ? (
        <FallBack type={FALLBACK_TYPE.NOT_FOUND} message="No Transactions." />
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(transaction) => transaction.id.toString()}
          renderItem={({ item }) => <TransactionCardView transaction={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      )}
    </View>
  );
};

export default TransactionListCardView;
