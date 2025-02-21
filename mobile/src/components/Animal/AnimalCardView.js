import React, { useEffect } from "react";
import { View, Text, Image, Touchable, TouchableOpacity } from "react-native";
import Card from "../global/Card";
import IconTag from "../global/IconTag";
import { getBaseURL } from "../../api/axiosInstance";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getAnimalById } from "../../features/animalSlice";
import Loading from "../global/Loading";
import FallBack, { FALLBACK_TYPE } from "../global/Fallback";
import Colors from "../../utils/Colors";
import { getPickedUpDate } from "../../helpers/AnimalHelpers";

const AnimalCardView = ({ animal }) => {
  const navigator = useNavigation();
  const handleAnimalClick = () => {
    navigator.navigate("AnimalDetails", { animalId: animal.id });
  };
  console.log({animalfromCard : animal});
  
  return (
    <TouchableOpacity onPress={() => handleAnimalClick()}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
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
              content={animal.sex}
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
