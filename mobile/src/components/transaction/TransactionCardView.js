import React from "react";
import { View, Image, Touchable, TouchableOpacity } from "react-native";
import Card from "../global/Card";
import IconTag from "../global/IconTag";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import Container from "../global/Container";
import Text from "../../components/global/Text";
import { useTranslation } from "react-i18next";

const TransactionCardView = ({ transaction }) => {
  const { t } = useTranslation();
  const navigator = useNavigation();
  const handleTransactionClick = () => {
    navigator.navigate("TransactionDetail", { transaction: transaction.id });
  };

  return (
    <TouchableOpacity onPress={() => handleTransactionClick()}>
      <Card
        sx={{
          justifyContent: "space-between",
          padding: 15,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            flexDirection: t("dir") === "rtl" ? "row-reverse" : "row",
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
            <Text style={{ fontSize: 16 }}>
              {t(`common.${transaction.method}`)}
            </Text>
          </Container>
        </View>

        <View>
          <IconTag
            tagName="plus"
            color="grey"
            content={transaction.amount}
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
