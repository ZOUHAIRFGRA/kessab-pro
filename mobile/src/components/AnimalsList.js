import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAnimals, resetAnimals } from "../features/animalSlice"; // import reset action
import { getBaseURL } from "../api/axiosInstance";
import { styled } from "dripsy";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFocusEffect } from "@react-navigation/native";


const AnimalsList = ({ route }) => {
  const dispatch = useDispatch();
  const { animals, loading, error, totalPages } = useSelector((state) => state.animals);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchText, setSearchText] = useState(route?.params?.searchText || ""); // Track searchText in state

  useFocusEffect(
    React.useCallback(() => {
      console.log("🐾 AnimalsList focused, resetting state...");

      setCurrentPage(0); // Reset pagination
      dispatch(resetAnimals()); // 🛑 Reset animal list in Redux

      // ⏳ Small delay to ensure state resets before fetching
      setTimeout(() => {
        let newSearchText = route?.params?.searchText || "";
        if (!route?.params?.searchText) {
          console.log("📢 Accessed via Sidebar, resetting searchText...");
          newSearchText = "";
        }
        setSearchText(newSearchText); // Update state with new search text
        dispatch(getAnimals({ page: 0, search: newSearchText, filterType: "tag" })); // Fetch fresh data
      }, 0); // Ensures resetAnimals() completes first

    }, [dispatch, route?.params?.searchText])
  );

  // Log when searchText changes
  useEffect(() => {
    console.log("🔍 searchText updated:", searchText);
  }, [searchText]);

  const handlePagination = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
      dispatch(getAnimals({ page: newPage, search: searchText, filterType: "tag" }));
    }
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  console.log("📦 Rendering with animals.length:", animals.length);

  return (
    <View>
      <SectionTitle>Animals</SectionTitle>

      {/* No animals found message */}
      {animals.length === 0 ? (
        <NoAnimalsWrapper>
          <Icon name="emoticon-sad" size={40} color="#D3D3D3" />
          <NoAnimalsText>No animals found for this search.</NoAnimalsText>
        </NoAnimalsWrapper>
      ) : (
        <ItemList>
          {animals.map((animal) => (
            <ListItem key={animal.id}>
              <Image
                source={{ uri: `${getBaseURL()}${animal.imagePaths[0]}` }}
                style={{ width: 50, height: 50, borderRadius: 8 }}
              />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <ListItemText>{animal.tag}</ListItemText>
                <Text>{animal.category ? animal.category.typeName : 'Uncategorized'}</Text>
                <Text>{animal.sex ? animal.sex : 'Unknown Sex'}</Text>
              </View>
            </ListItem>
          ))}
        </ItemList>
      )}

      <PaginationWrapper>
        <PaginationButton onPress={() => handlePagination(currentPage - 1)} disabled={currentPage <= 0}>
          <Icon name="skip-previous" size={20} color="white" />
        </PaginationButton>

        <CurrentPageText>{`Page ${currentPage + 1} of ${totalPages}`}</CurrentPageText>

        <PaginationButton onPress={() => handlePagination(currentPage + 1)} disabled={currentPage >= totalPages - 1}>
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
