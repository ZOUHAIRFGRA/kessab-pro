import { styled } from "dripsy";
import React from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

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
  marginVertical: 16,
  height: 48,
  backgroundColor: "inputBackground",
});

const SectionTitle = styled(Text)({
  fontSize: 18,
  fontWeight: "bold",
  color: "text",
  marginBottom: 12,
});

const ItemList = styled(ScrollView)({
  marginBottom: 16,
});

const ListItem = styled(TouchableOpacity)({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: 16,
  borderWidth: 1,
  borderColor: "border",
  borderRadius: 8,
  backgroundColor: "white",
  marginBottom: 8,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
});

const ListItemText = styled(Text)({
  fontSize: 16,
  fontWeight: "500",
  color: "text",
});

const QuickActionList = styled(ScrollView)({
  marginVertical: 16,
});

const QuickActionItem = styled(TouchableOpacity)({
  backgroundColor: "#f9f9f9",
  padding: 12,
  borderRadius: 16,
  width: 120,
  height: 100,
  justifyContent: "space-around",
  alignItems: "center",
  marginRight: 16,
  borderWidth: 1,
  borderColor: "#ddd",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
});

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
  const handleSearch = (text) => {
    console.log(`Search text: ${text}`);
  };

  const animals = [
    { id: "001", type: "Sheep", status: "Available" },
    { id: "002", type: "Goat", status: "Sold" },
  ];

  const transactions = [
    { id: "TXN001", animal: "Sheep 001", status: "Paid" },
    { id: "TXN002", animal: "Goat 002", status: "Not Yet Paid" },
  ];

  return (
    <Container>
      <SearchInput
        placeholder="Search for animals"
        onSubmitEditing={(e) => handleSearch(e.nativeEvent.text)}
        placeholderTextColor="black"
      />

      <SectionTitle>Animals</SectionTitle>
      <ItemList>
        {animals.map((animal, index) => (
          <ListItem
            key={index}
            onPress={() => navigation.navigate("AnimalDetails", { id: animal.id })}
          >
            <ListItemText>
              {animal.type} (ID: {animal.id})
            </ListItemText>
            <Text>{animal.status}</Text>
          </ListItem>
        ))}
      </ItemList>

      <SectionTitle>Transactions</SectionTitle>
      <ItemList>
        {transactions.map((txn, index) => (
          <ListItem
            key={index}
            onPress={() => navigation.navigate("TransactionDetails", { id: txn.id })}
          >
            <ListItemText>{txn.animal}</ListItemText>
            <Text>{txn.status}</Text>
          </ListItem>
        ))}
      </ItemList>

      <SectionTitle>Quick Actions</SectionTitle>
      <QuickActionList horizontal showsHorizontalScrollIndicator={false}>
        {[
          { name: "Add Animal", icon: "plus", route: "AddAnimal" },
          { name: "View Sales", icon: "cart", route: "Sales" },
          { name: "Analytics", icon: "chart-bar", route: "Analytics" },
        ].map((action, index) => (
          <QuickActionItem
            key={index}
            onPress={() => navigation.navigate(action.route)}
          >
            <ActionIcon name={action.icon} />
            <ActionText>{action.name}</ActionText>
          </QuickActionItem>
        ))}
      </QuickActionList>
    </Container>
  );
}
