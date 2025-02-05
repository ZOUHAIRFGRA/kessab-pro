import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { styled } from "dripsy";
import { useNavigation } from "@react-navigation/native";
import { getBaseURL } from "../api/axiosInstance";

const SectionTitle = styled(Text)({
  fontSize: 18,
  fontWeight: "bold",
  marginBottom: 12,
});
const ItemList = styled(ScrollView)({ marginBottom: 16 });
const ListItem = styled(TouchableOpacity)({
  flexDirection: "row",
  padding: 16,
  borderWidth: 1,
  borderRadius: 8,
  marginBottom: 8,
  backgroundColor: "white",
});
const ListItemText = styled(Text)({ fontSize: 16, fontWeight: "500" });

const AnimalsList = ({ animals }) => {
  const navigation = useNavigation();

  return (
    <View>
      <SectionTitle>Animals</SectionTitle>
      <ItemList>
        {animals.map((animal) => (
          <ListItem
            key={animal.id}
            onPress={() => navigation.navigate("AnimalDetails", { animal })}
          >
            <Image
              source={{ uri: `${getBaseURL()}${animal.imagePaths}` }}
              style={{ width: 50, height: 50, borderRadius: 8 }}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <ListItemText>{animal.tag}</ListItemText>
              <Text>{animal.category.typeName}</Text>
            </View>
          </ListItem>
        ))}
      </ItemList>
    </View>
  );
};

export default AnimalsList;
