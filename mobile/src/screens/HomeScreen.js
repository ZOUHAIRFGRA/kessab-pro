import { styled } from "dripsy";
import React from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import WeatherWidget from "../components/WeatherWidget";
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

const HorizontalItem = styled(View)({
  width: 80,
  height: 80,
  backgroundColor: "#e0e0e0",
  borderRadius: 100,
  marginRight: 16,
  justifyContent: "center",
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 1,
});

const HorizontalItemText = styled(Text)();

const BottomNav = styled(View)({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 16,
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

const Heading = styled(Text)();

export default function HomeScreen({ navigation }) {
  const handleSearch = (text) => {
    console.log(`Search text: ${text}`);
  };

  return (
    <Container>
      <WeatherWidget />
      <Heading sx={{ variant: "text.heading" }}>
        Welcome to the Home Screen
      </Heading>
      <SearchInput
        placeholder="Search for sheep by ID"
        onSubmitEditing={(e) => handleSearch(e.nativeEvent.text)}
        placeholderTextColor="black"
      />
      <Grid>
        {[
          { name: "Management", icon: "briefcase" }, 
          { name: "Sales", icon: "cart-outline" }, 
          { name: "Food", icon: "corn" }, 
          { name: "Marketplace", icon: "store" }, 
        ].map((item) => (
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
        {[...Array(5)].map((_, index) => (
          <HorizontalItem key={index}>
            <HorizontalItemText sx={{ variant: "text.secondary" }}>
              Event {index + 1}
            </HorizontalItemText>
          </HorizontalItem>
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
