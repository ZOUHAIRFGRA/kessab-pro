import React, { useEffect } from "react";
import { View, Image, Touchable, TouchableOpacity } from "react-native";
import Card from "../global/Card";
import IconTag from "../global/IconTag";
import { getBaseURL } from "../../api/axiosInstance";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../utils/Colors";
import { getPickedUpDate } from "../../helpers/AnimalHelpers";
import Text from "../../components/global/Text";
import { useTranslation } from "react-i18next";

const AnimalCardView = ({ animal }) => {
  const { t } = useTranslation();
  const navigator = useNavigation();
  const handleAnimalClick = () => {
    navigator.navigate("AnimalDetails", { animalId: animal.id });
  };

  return (
    <TouchableOpacity onPress={() => handleAnimalClick()}>
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
              uri: getBaseURL() + animal.imagePaths[0],
            }}
            style={{
              width: "100%",
              borderRadius: 8,
              height: "100%",
              borderWidth: 1,
              borderColor: Colors.primaryLight,
            }}
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
          <Text style={{ fontWeight: "bold" }}>{animal.tag}</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 6,
              justifyContent: "space-evenly",
            }}
          >
            <IconTag
              tagName="venus-mars"
              color="grey"
              content={t(`common.Gender.${animal.sex}`)}
              style={{ flex: 1 }}
            />
            <IconTag
              tagName="money"
              color="grey"
              content={animal.price}
              style={{ flex: 1 }}
            />
          </View>
          <IconTag
            tagName="truck"
            color="grey"
            content={getPickedUpDate(animal)}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default AnimalCardView;
