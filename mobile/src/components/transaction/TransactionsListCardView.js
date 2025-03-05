import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import FallBack, { FALLBACK_TYPE } from "../global/Fallback";
import Loading from "../global/Loading";
import {
  getTransactionsByBuyer,
  getTransactionsBySale,
} from "../../features/transactionSlice";
import TransactionCardView from "./TransactionCardView";
import Button from "../global/Button";
import AddTransactionModal from "./AddTransactionModal";

const TransactionListCardView = ({ id, type = "sale" }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (type === "sale") {
      dispatch(getTransactionsBySale(id));
    }

    if (type === "buyer") {
      dispatch(getTransactionsByBuyer(id));
    }
  }, [dispatch]);

  const { transactions, loading, error } = useSelector(
    ({ transactions }) => transactions
  );

  if (loading || !transactions) return <Loading />;

  if (error) return <FallBack type={FALLBACK_TYPE.ERROR} />;

  return (
    <View style={{ flex: 1 }}>
      {transactions.length === 0 ? (
        <FallBack type={FALLBACK_TYPE.NOT_FOUND} message="No Transactions." />
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(transaction) => transaction.id.toString()}
          renderItem={({ item }) => (
            <TransactionCardView transaction={item} type={type} id={id} />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
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
      <Button
        type={"primary"}
        style={{
          padding: 12,
          marginRight: 12,
          marginLeft: 12,
          marginBottom: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        textStyle={{
          color: "white",
          fontWeight: "bold",
          textAlign: "center",
          fontSize: 16,
        }}
        icon={{
          name: "plus",
          color: "white",
        }}
        onPress={() => setIsVisible(true)}
      >
        Add new transaction
      </Button>
    </View>
  );
};

export default TransactionListCardView;
