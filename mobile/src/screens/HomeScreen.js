import { styled } from "dripsy";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import WeatherWidget from "../components/WeatherWidget";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDebounce } from "use-debounce"; 
import { useDispatch } from "react-redux";
import { resetAnimals } from "../features/animalSlice";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {

  const navigation = useNavigation();
  const dispatch = useDispatch(); 
  const [searchText, setSearchText] = useState(""); 
  const [debouncedSearchText] = useDebounce(searchText, 500); 

  const handleSearch = () => {
    if (debouncedSearchText) {
      
      dispatch(resetAnimals());

      
      setSearchText("");

      
      navigation.navigate("AnimalsList", { searchText: debouncedSearchText });
    }
  };

  const handleSearchChange = (text) => {
    setSearchText(text); 
  };

  return (
    <Container>
      <WeatherWidget />
      <SearchInput
        placeholder="Search for sheep by ID"
        value={searchText}
        onChangeText={handleSearchChange} 
        onSubmitEditing={handleSearch} 
        placeholderTextColor="black"
      />
      <Grid>
        {[{ name: "Management", icon: "briefcase" }, { name: "Sales", icon: "cart-outline" }, { name: "Food", icon: "corn" }, { name: "Marketplace", icon: "store" }].map((item) => (
          <GridItem
            key={item.name}
            onPress={() => navigation.navigate(item.name)}
            
          >
            <Icon name={item.icon} size={36} color="#3E4E50" />
            <GridItemText sx={{ variant: "text.subheading", marginTop: 8 }}>
              {item.name}
            </GridItemText>
          </GridItem>
        ))}
      </Grid>

      <HorizontalScroll horizontal showsHorizontalScrollIndicator={false}>
        {[{ name: "Add Buyer", icon: "account-plus", route: "AddBuyer" }, { name: "View Buyers", icon: "account-group", route: "BuyersList" }, { name: "Add Sheep", icon: "sheep", route: "AddSheep" }, { name: "View Sales", icon: "chart-line", route: "MySellsScreen" }, { name: "Inventory", icon: "warehouse", route: "Inventory" }].map((action, index) => (
          <HorizontalActionItem
            key={index}
            onPress={() => navigation.navigate(action.route)}
            accessibilityRole="button"
            accessibilityLabel={`Navigate to ${action.name}`}
          >
            <ActionIcon name={action.icon} />
            <ActionText>{action.name}</ActionText>
          </HorizontalActionItem>
        ))}
      </HorizontalScroll>

      <BottomNav>
        {["Dashboard", "QRScanner", "Profile"].map((item) => (
          <BottomNavItem
            key={item}
            onPress={() => navigation.navigate(item)}
            accessibilityRole="button"
            accessibilityLabel={`Navigate to ${item}`}
          >
            <BottomNavText sx={{ variant: "text.secondary" }}>
              {item}
            </BottomNavText>
          </BottomNavItem>
        ))}
      </BottomNav>
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
  marginVertical: 16,
  height: 48,
  backgroundColor: "inputBackground",
});

const Grid = styled(View)({
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  marginVertical: 16,
});

const GridItem = styled(TouchableOpacity)({
  width: "48%",
  height: 120,
  backgroundColor: "secondary",
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 1,
  borderRadius: 8,
  borderColor: "border",
  marginBottom: 16,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
});

const GridItemText = styled(Text)();

const HorizontalScroll = styled(ScrollView)({
  marginVertical: 16,
});

const HorizontalActionItem = styled(TouchableOpacity)({
  backgroundColor: "#f9f9f9",
  padding: 12,
  borderRadius: 16,
  width: 100,
  height: 120,
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

const BottomNav = styled(View)({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 8,
  borderWidth: 1,
  borderColor: "border",
  borderRadius: 10,
  backgroundColor: "navBackground",
});

const BottomNavItem = styled(TouchableOpacity)({
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 12,
  paddingHorizontal: 8,
  borderWidth: 1,
  borderColor: "border",
  borderRadius: 8,
  marginHorizontal: 4,
  backgroundColor: "white",
});

const BottomNavText = styled(Text)();
