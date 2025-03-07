import React from "react";
import { View, Image, Touchable, TouchableOpacity } from "react-native";
import Card from "../global/Card";
import IconTag from "../global/IconTag";
import { getAnimalCategoryCounts } from "../../helpers/SaleHelpers";
import { getBaseURL } from "../../api/axiosInstance";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../utils/Colors";
import Text from "../../components/global/Text";

const SaleCardView = ({ sale }) => {
  const navigator = useNavigation();
  const handleSaleClick = () => {
    navigator.navigate("SellDetail", { saleId: sale.id });
  };

  return (
    <TouchableOpacity onPress={() => handleSaleClick()}>
      <Card
        sx={{
          display: "flex",
          padding: 15,
        }}
      >
        <View
          style={{
            position: "relative",
            width: 80,
            height: 80,
            marginRight: 12,
          }}
        >
          <Image
            source={{
              uri: getBaseURL() + sale?.animals[0]?.gallery[0],
            }}
            style={{
              width: "100%",
              borderRadius: 8,
              height: "100%",
              borderWidth: 1,
              borderColor: Colors.primaryLight,
            }}
          />
          <View
            style={{
              position: "absolute",
              bottom: -5,
              right: 0,
              backgroundColor: Colors.primary,
              borderRadius: 10,
              width: 20,
              height: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white" }}>{sale.animals.length}</Text>
          </View>
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
          <Text style={{ fontWeight: "bold" }}>
            {getAnimalCategoryCounts(sale)}
          </Text>
          <IconTag tagName="user" color="grey" content={sale.buyer.fullName} />
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
              content={sale.saleDate}
              style={{ flex: 1 }}
            />
            <IconTag
              tagName="money"
              color="grey"
              content={sale.agreedAmount}
              style={{ flex: 1 }}
            />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default SaleCardView;
