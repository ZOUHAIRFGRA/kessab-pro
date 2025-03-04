import React from "react";
import { View, TouchableOpacity } from "react-native";
import Card from "../global/Card";
import IconTag from "../global/IconTag";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../utils/Colors";
import { Icon } from "@rneui/base";

const BuyerCardView = ({ buyer }) => {
  const navigator = useNavigation();
  const handleBuyerClick = () => {
    navigator.navigate("buyerDetail", { buyerId: buyer.id });
  };

  return (
    <TouchableOpacity onPress={() => handleBuyerClick()}>
      <Card
        sx={{
          display: "flex",
          padding: 15,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginRight: 5,
          }}
        >
          <Icon
            name="user"
            type="font-awesome"
            color={Colors.primary}
            size={26}
            raised
            reverse
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
          <IconTag
            textStyle={{
              fontSize: 18,
              fontWeight: "bold",
            }}
            hideIcon
            color="grey"
            content={buyer.fullName}
            style={{ borderWidth: 0 }}
          />

          <IconTag
            tagName="vcard"
            color="grey"
            content={buyer.CIN}
            style={{ flex: 1, borderWidth: 0 }}
          />
          <IconTag
            tagName="phone"
            color="grey"
            content={buyer.phone}
            style={{ flex: 1, borderWidth: 0 }}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default BuyerCardView;
