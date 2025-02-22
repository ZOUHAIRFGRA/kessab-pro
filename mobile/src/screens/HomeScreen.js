import { styled } from "dripsy";
import React, { useEffect, useState } from "react";
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
import Colors from "../utils/Colors";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import AddAnimalModal from "./AddAnimalModal";
import { logout } from "../features/authSlice";

export default function HomeScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText] = useDebounce(searchText, 500);
  const [isAddAnimalModalVisible, setAddAnimalModalVisible] = useState(false);

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

  const handleAddSheepPress = () => {
    setAddAnimalModalVisible(true);
  };

  const closeAddAnimalModal = () => {
    setAddAnimalModalVisible(false);
  };

  return (
    <Container>
      {/* <WeatherWidget /> */}
      <SearchInput
        placeholder={t("common.search_placeholder")}
        value={searchText}
        onChangeText={handleSearchChange}
        onSubmitEditing={handleSearch}
        placeholderTextColor="black"
      />
      <Grid>
        {[
          {
            key: "Management",
            name: t("common.management"),
            icon: "playlist-edit",
          },
          { key: "Sales", name: t("common.sales"), icon: "cart-outline" },
          { key: "Food", name: t("common.food"), icon: "corn" },
          { key: "Marketplace", name: t("common.marketplace"), icon: "store" },
        ].map((item) => (
          <GridItem
            key={item.key}
            onPress={() => navigation.navigate(item.key)}
          >
            <Icon name={item.icon} size={36} color="dark" />
            <GridItemText sx={{ variant: "text.subheading", marginTop: 8 }}>
              {item.name}
            </GridItemText>
          </GridItem>
        ))}
      </Grid>

      <HorizontalScroll horizontal showsHorizontalScrollIndicator={false}>
        {[
          {
            key: "AddBuyer",
            name: t("common.add_buyer"),
            icon: "account-plus",
          },
          {
            key: "BuyersList",
            name: t("common.view_buyers"),
            icon: "account-group",
          },
          {
            key: "AddSheep",
            name: t("common.add_sheep"),
            icon: "sheep",
            onPress: handleAddSheepPress,
          },
          {
            key: "MySellsScreen",
            name: t("common.view_sales"),
            icon: "chart-line",
          },
          {
            key: "Inventory",
            name: t("common.inventory"),
            icon: "warehouse",
          },
        ].map((action, index) => (
          <HorizontalActionItem
            key={index}
            onPress={action.onPress || (() => navigation.navigate(action.key))}
            accessibilityRole="button"
            accessibilityLabel={`Navigate to ${action.name}`}
          >
            <ActionIcon name={action.icon} />
            <ActionText>{action.name}</ActionText>
          </HorizontalActionItem>
        ))}
      </HorizontalScroll>

      <BottomNav sx={{ marginVertical: 16 }}>
        {[
          { label: t("common.dashboard"), route: "Dashboard" },
          { label: t("common.QRscanner"), route: "QRScanner" },
          { label: t("common.profile"), route: "Profile" },
        ].map((item) => (
          <BottomNavItem
            key={item.route}
            onPress={() => navigation.navigate(item.route)}
            accessibilityRole="button"
            accessibilityLabel={`Navigate to ${item.label}`}
          >
            <BottomNavText sx={{ variant: "text.secondary" }}>
              {item.label}
            </BottomNavText>
          </BottomNavItem>
        ))}
      </BottomNav>

      <AddAnimalModal
        visible={isAddAnimalModalVisible}
        onClose={closeAddAnimalModal}
      />
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
