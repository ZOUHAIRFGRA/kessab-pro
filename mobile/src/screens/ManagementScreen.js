import { styled } from "dripsy";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Foundation";
import { getAnimals } from "../features/animalSlice";
import AnimalsList from "../components/AnimalsList";
import AddTransaction from "../components/AddTransaction";

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

const QuickActionList = styled(ScrollView)({
  paddingBottom: 8, 
});

const QuickActionItem = styled(TouchableOpacity)(({ isLast }) => ({
  backgroundColor: "#f9f9f9",
  padding: 12,
  borderRadius: 16,
  width: 120,
  height: 100,
  justifyContent: "space-around",
  alignItems: "center",
  marginRight: isLast ? 0 : 16, // Remove margin for last item
  borderWidth: 1,
  borderColor: "#ddd",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
}));

const ActionIcon = styled(Icon)({
  color: "#4A90E2",
  fontSize: 36,
});

const ActionText = styled(Text)({
  fontSize: 14,
  fontWeight: "600",
  color: "#333",
  textAlign: "center",
});

export default function ManagementScreen({ navigation }) {
  const [transactionModalVisible, setTransactionModalVisible] = useState(false);

  const dispatch = useDispatch();
  const { animals, loading, error } = useSelector((state) => state.animals);

  useEffect(() => {
    dispatch(getAnimals());
  }, [dispatch]);

  const handleSearch = (text) => {
    console.log(`Search text: ${text}`);
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <Container>
      <SectionTitle>Quick Actions</SectionTitle>
      <QuickActionList horizontal showsHorizontalScrollIndicator={true}>
        {[
          { name: "Add Animal", icon: "plus", route: "AddAnimal" },
          {
            name: "Add Transaction",
            icon: "dollar",
            action: () => setTransactionModalVisible(true),
          },
        ].map((action, index, array) => (
          <QuickActionItem
            key={index}
            isLast={index === array.length - 1} // Pass isLast prop
            onPress={
              action.route
                ? () => navigation.navigate(action.route)
                : action.action
            }
          >
            <ActionIcon name={action.icon} />
            <ActionText>{action.name}</ActionText>
          </QuickActionItem>
        ))}
      </QuickActionList>

      <SearchInput
        placeholder="Search for animals"
        onSubmitEditing={(e) => handleSearch(e.nativeEvent.text)}
        placeholderTextColor="black"
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <AnimalsList animals={animals} />

        {transactionModalVisible && (
          <AddTransaction onClose={() => setTransactionModalVisible(false)} />
        )}
      </ScrollView>
    </Container>
  );
}
