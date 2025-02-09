import React, { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { styled } from "dripsy";
import Icon from "react-native-vector-icons/FontAwesome";
import AnimalsList from "../components/AnimalsList";
import AddTransaction from "../components/AddTransaction";
import AddAnimalModal from "../components/AddAnimalModal";
import { useDebounce } from "use-debounce";
import { getAnimals, resetAnimals } from "../features/animalSlice";
import { useDispatch } from "react-redux";
import { useFocusEffect } from '@react-navigation/native'; 

export default function ManagementScreen({ navigation }) {
  const [transactionModalVisible, setTransactionModalVisible] = useState(false);
  const [addAnimalModalVisible, setAddAnimalModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText] = useDebounce(searchText, 500); 
  const dispatch = useDispatch();

  
  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  
  const resetSearchText = () => {
    setSearchText(""); 
  };

  
  useFocusEffect(
    React.useCallback(() => {
      console.log("ManagementScreen focused");
      dispatch(resetAnimals()); 
      console.log("'''''''''''''''''''''''Animals reset");
      dispatch(getAnimals({ page: 0, search: "", filterType: "tag" })); 
    }, [dispatch]) 
  );

  useEffect(() => {
    if (searchText) {
      
      setCurrentPage(0);
    }
  }, [searchText]);
  

  return (
    <Container>
      <SectionTitle>Quick Actions</SectionTitle>
      <QuickActionList>
        {[{ name: "Add Animal", icon: "plus", action: () => setAddAnimalModalVisible(true) },
          { name: "+ Transaction", icon: "dollar", action: () => setTransactionModalVisible(true) }].map((action, index) => (
            <QuickActionItem key={index} onPress={action.action}>
              <Icon name={action.icon} color="#4A90E2" size={36} />
              <Text>{action.name}</Text>
            </QuickActionItem>
        ))}
      </QuickActionList>

      <SearchInput
        placeholder="Search by tag"
        value={searchText}
        onChangeText={handleSearchChange} 
        placeholderTextColor="black"
        onSubmitEditing={() => {
          dispatch(resetAnimals()); 
          resetSearchText(); 
        }} 
      />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Pass debounced search text to AnimalsList component */}
        <AnimalsList searchText={debouncedSearchText} />

        {transactionModalVisible ? (
          <AddTransaction onClose={() => { setTransactionModalVisible(false); resetSearchText(); }} />
        ) : null}

        {addAnimalModalVisible ? (
          <AddAnimalModal visible={addAnimalModalVisible} onClose={() => { setAddAnimalModalVisible(false); resetSearchText(); }} />
        ) : null}
      </ScrollView>
    </Container>
  );
}

const Container = styled(View)({
  flex: 1,
  padding: 16,
  backgroundColor: "background",
});

const SearchInput = styled(TextInput)({
  borderWidth: 1,
  borderColor: "border",
  padding: 12,
  borderRadius: 8,
  marginBottom: 16,
  height: 48,
  backgroundColor: "inputBackground",
});

const SectionTitle = styled(Text)({
  fontSize: 18,
  fontWeight: "bold",
  color: "text",
  marginBottom: 12,
});

const QuickActionList = styled(View)({
  flexDirection: "row",
  gap: 16,
  marginBottom: 16,
});

const QuickActionItem = styled(TouchableOpacity)(({ isLast }) => ({
  backgroundColor: "#f9f9f9",
  padding: 12,
  borderRadius: 16,
  width: 120,
  height: 100,
  justifyContent: "space-around",
  alignItems: "center",
  marginRight: isLast ? 0 : 16,
  borderWidth: 1,
  borderColor: "#ddd",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
}));
