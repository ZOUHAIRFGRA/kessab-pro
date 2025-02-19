import React from "react";
import { View, Text, Image, Touchable, TouchableOpacity } from "react-native";
import Card from "../global/Card";
import IconTag from "../global/IconTag";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";

const TransactionCardView = ({ transaction }) => {
  const navigator = useNavigation();
  const handleTransactionClick = () => {
    navigator.navigate("TransactionDetail", { transaction: transaction.id });
  };

  return (
    <TouchableOpacity onPress={() => handleTransactionClick()}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          padding: 15,
        }}
      >
        <View style={{ justifyContent: "center" }}>
          <Icon
            name="wallet-plus-outline"
            color={"green"}
            raised
            reverse
            type="material-community"
          />
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            flex: 1,
            gap: 4,
          }}
        >
          <IconTag tagName="money" color="grey" content={transaction.amount} />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 6,
              justifyContent: "space-evenly",
            }}
          >
            <IconTag
              tagName="calendar"
              color="grey"
              content={transaction.transactionDate}
              style={{ flex: 1 }}
            />
            <IconTag
              tagName="money"
              color="grey"
              content={transaction.method}
              style={{ flex: 1 }}
            />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default TransactionCardView;
