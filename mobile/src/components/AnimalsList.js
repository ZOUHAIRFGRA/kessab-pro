import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAnimals, resetAnimals } from "../features/animalSlice";
import { getBaseURL } from "../api/axiosInstance";
import { styled } from "dripsy";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const AnimalsList = ({ searchText: propSearchText, route }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { animals, loading, error, totalPages } = useSelector(
    (state) => state.animals
  );
  const [currentPage, setCurrentPage] = useState(0);

  const searchText = route?.params?.searchText ?? propSearchText ?? "";

  useFocusEffect(
    React.useCallback(() => {
      setCurrentPage(0);
      dispatch(resetAnimals());

      dispatch(getAnimals({ page: 0, search: searchText, filterType: "tag" }));
    }, [dispatch, searchText])
  );

  const handlePagination = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
      dispatch(
        getAnimals({ page: newPage, search: searchText, filterType: "tag" })
      );
    }
  };
  const handleAnimalClick = (id) => {
    navigation.navigate("AnimalDetails", { animalId: id });
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View>
      <SectionTitle>{t("common.animals")}</SectionTitle>

      {animals.length === 0 ? (
        <NoAnimalsWrapper>
          <Icon name="emoticon-sad" size={40} color="#D3D3D3" />
          <NoAnimalsText>No animals found for this search.</NoAnimalsText>
        </NoAnimalsWrapper>
      ) : (
        <ItemList>
          {animals.map((animal) => (
            <ListItem
              key={animal.id}
              onPress={() => handleAnimalClick(animal.id)}
            >
              <Image
                source={{ uri: `${getBaseURL()}${animal.imagePaths[0]}` }}
                style={{ width: 50, height: 50, borderRadius: 8 }}
              />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <ListItemText>{animal.tag}</ListItemText>
                <Text>
                  {animal.category ? animal.category.typeName : "Uncategorized"}
                </Text>
                <Text>{animal.sex ? animal.sex : "Unknown Sex"}</Text>
              </View>
            </ListItem>
          ))}
        </ItemList>
      )}

      <PaginationWrapper>
        <PaginationButton
          onPress={() => handlePagination(currentPage - 1)}
          disabled={currentPage <= 0}
        >
          <Icon name="skip-previous" size={20} color="white" />
        </PaginationButton>

        <CurrentPageText>{`Page ${
          currentPage + 1
        } of ${totalPages}`}</CurrentPageText>

        <PaginationButton
          onPress={() => handlePagination(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
        >
          <Icon name="skip-next" size={20} color="white" />
        </PaginationButton>
      </PaginationWrapper>
    </View>
  );
};

const SectionTitle = styled(Text)({
  fontSize: 18,
  fontWeight: "bold",
  marginBottom: 12,
});

const ItemList = styled(ScrollView)({
  marginBottom: 16,
});

const ListItem = styled(TouchableOpacity)({
  flexDirection: "row",
  padding: 16,
  borderWidth: 1,
  borderRadius: 8,
  marginBottom: 8,
  backgroundColor: "white",
});

const ListItemText = styled(Text)({
  fontSize: 16,
  fontWeight: "500",
});

const PaginationWrapper = styled(View)({
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 16,
});

const PaginationButton = styled(TouchableOpacity)({
  paddingHorizontal: 12,
  paddingVertical: 6,
  marginHorizontal: 8,
  borderRadius: 8,
  backgroundColor: "#007BFF",
  justifyContent: "center",
  alignItems: "center",
});

const CurrentPageText = styled(Text)({
  fontSize: 16,
  fontWeight: "600",
  marginHorizontal: 8,
  color: "#007BFF",
});

const NoAnimalsWrapper = styled(View)({
  justifyContent: "center",
  alignItems: "center",
  padding: 20,
  flex: 1,
});

const NoAnimalsText = styled(Text)({
  fontSize: 16,
  fontWeight: "500",
  color: "#D3D3D3",
  marginTop: 10,
});

export default AnimalsList;
