import React from "react";
import { View, Text, Image, Touchable, TouchableOpacity } from "react-native";
import Card from "../global/Card";
import IconTag from "../global/IconTag";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import Header from "../global/Header";
import Container from "../global/Container";

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
          justifyContent: "space-between",
          padding: 15,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            gap: 6,
            alignItems: "center",
          }}
        >
          <Icon
            name="wallet-plus-outline"
            color={"green"}
            raised
            reverse
            type="material-community"
          />
          <Container>
            <Text style={{ fontSize: 16 }}>{transaction.transactionDate}</Text>
            <Text style={{ fontSize: 16 }}>{transaction.method}</Text>
          </Container>
        </View>

        <View>
          <IconTag
            tagName="plus"
            color="grey"
            content={transaction.amount + " DH"}
            style={{ flex: 1, borderWidth: 0 }}
            textStyle={{
              fontSize: 24,
              fontWeight: "bold",
            }}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default TransactionCardView;
