import { styled } from "dripsy";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import WeatherWidget from "../components/WeatherWidget";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDebounce } from "use-debounce";
import { useDispatch } from "react-redux";
import { resetAnimals } from "../features/animalSlice";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import AddAnimalModal from "../components/AddAnimalModal";
import { useToast } from "../hooks/useToast";
import Colors from "../utils/Colors";

export default function HomeScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { showErrorToast } = useToast();
  const isRTL = t("dir") === "rtl";
  const searchInputRef = useRef(null);

  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText] = useDebounce(searchText, 300);
  const [isAddAnimalModalVisible, setAddAnimalModalVisible] = useState(false);

  // Removed useEffect that auto-focused the input
  // useEffect(() => {
  //   searchInputRef.current?.focus();
  // }, []);

  const handleSearch = () => {
    if (debouncedSearchText.length < 3) {
      showErrorToast(t("common.search_too_short"));
      return;
    }
    dispatch(resetAnimals());
    setSearchText("");
    navigation.navigate("AnimalsList", { searchText: debouncedSearchText });
  };

  const handleSearchChange = (text) => setSearchText(text);
  const handleAddSheepPress = () => setAddAnimalModalVisible(true);
  const closeAddAnimalModal = () => setAddAnimalModalVisible(false);

  const gridItems = [
    { key: "Management", name: t("common.management"), icon: "playlist-edit" },
    { key: "Sales", name: t("common.sales"), icon: "cart-outline" },
    { key: "Food", name: t("common.food"), icon: "corn" },
    { key: "Marketplace", name: t("common.marketplace"), icon: "store" },
  ];

  const actions = [
    { key: "AddBuyer", name: t("common.add_buyer"), icon: "account-plus" },
    { key: "BuyersList", name: t("common.view_buyers"), icon: "account-group" },
    { key: "AddSheep", name: t("common.add_sheep"), icon: "sheep", onPress: handleAddSheepPress },
    { key: "MySellsScreen", name: t("common.view_sales"), icon: "chart-line" },
    { key: "Inventory", name: t("common.inventory"), icon: "warehouse" },
  ];

  return (
    <Container>
      <WeatherWidgetContainer>
        <WeatherWidget />
      </WeatherWidgetContainer>

      <SearchInputContainer>
        <SearchInput
          ref={searchInputRef}
          placeholder={t("common.search_placeholder")}
          value={searchText}
          onChangeText={handleSearchChange}
          onSubmitEditing={handleSearch}
          placeholderTextColor="black"
          textAlign={isRTL ? "right" : "left"}
        />
        {searchText.length > 0 && (
          <ClearButton onPress={() => setSearchText("")} isRTL={isRTL}>
            <Icon name="close-circle" size={20} color="gray" />
          </ClearButton>
        )}
        {debouncedSearchText && !searchText && (
          <ActivityIndicator
            style={{
              position: "absolute",
              right: isRTL ? null : 40,
              left: isRTL ? 40 : null,
              top: 14,
            }}
          />
        )}
      </SearchInputContainer>

      <Grid>
        {gridItems.map((item) => (
          <GridItem key={item.key} onPress={() => navigation.navigate(item.key)}>
            <Icon name={item.icon} size={36} color="dark" />
            <GridItemText sx={{ variant: "text.subheading", marginTop: 8, textAlign: isRTL ? "right" : "left" }}>
              {item.name}
            </GridItemText>
          </GridItem>
        ))}
      </Grid>

      <HorizontalScrollContainer>
        <HorizontalScroll horizontal showsHorizontalScrollIndicator={false}>
          {actions.map((action, index) => (
            <HorizontalActionItem
              key={index}
              onPress={action.onPress || (() => navigation.navigate(action.key))}
              accessibilityRole="button"
              accessibilityLabel={`Navigate to ${action.name}`}
            >
              <ActionIcon name={action.icon} />
              <ActionText sx={{ textAlign: isRTL ? "right" : "center" }}>{action.name}</ActionText>
            </HorizontalActionItem>
          ))}
        </HorizontalScroll>
      </HorizontalScrollContainer>

      <BottomNav>
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
            accessibilityHint={t(`common.nav_hint_${item.route.toLowerCase()}`)}
          >
            <BottomNavText sx={{ variant: "text.secondary", textAlign: isRTL ? "right" : "center" }}>
              {item.label}
            </BottomNavText>
          </BottomNavItem>
        ))}
      </BottomNav>

      <AddAnimalModal visible={isAddAnimalModalVisible} onClose={closeAddAnimalModal} />
    </Container>
  );
}

const Container = styled(View)({
  flex: 1,
  padding: 16,
  backgroundColor: "background",
  gap: 12,
});

const WeatherWidgetContainer = styled(View)({
  height: 100,
  marginBottom: 12,
});

const SearchInputContainer = styled(View)({
  position: "relative",
  marginBottom: 12,
});

const SearchInput = styled(TextInput)({
  borderWidth: 1,
  borderColor: "border",
  padding: 12,
  borderRadius: 8,
  height: 48,
  backgroundColor: "inputBackground",
});

const ClearButton = styled(TouchableOpacity)(({ isRTL }) => ({
  position: "absolute",
  right: isRTL ? null : 10,
  left: isRTL ? 10 : null,
  top: 12,
}));

const Grid = styled(View)({
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  marginBottom: 12,
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
  marginBottom: 12,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
});

const GridItemText = styled(Text)({
  numberOfLines: 2,
  ellipsizeMode: "tail",
});

const HorizontalScrollContainer = styled(View)({
  flexGrow: 0,
  marginBottom: 16,
});

const HorizontalScroll = styled(ScrollView)({
  flexDirection: "row",
  paddingVertical: 8,
});

const HorizontalActionItem = styled(TouchableOpacity)(({ pressed }) => ({
  backgroundColor: pressed ? "#e0e0e0" : "#f9f9f9",
  padding: 12,
  borderRadius: 16,
  width: 100,
  height: 120,
  justifyContent: "space-around",
  alignItems: "center",
  marginRight: 12,
  borderWidth: 1,
  borderColor: "#ddd",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
  activeOpacity: 0.8,
}));

const ActionIcon = styled(Icon)({
  color: Colors.primary,
  fontSize: 36,
});

const ActionText = styled(Text)({
  fontSize: 14,
  fontWeight: "600",
  color: "#333",
});

const BottomNav = styled(View)({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  borderWidth: 1,
  borderColor: "border",
  borderRadius: 10,
  backgroundColor: "navBackground",
  padding: 8,
});

const BottomNavItem = styled(TouchableOpacity)(({ isActive }) => ({
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 12,
  paddingHorizontal: 8,
  borderWidth: 1,
  borderColor: "border",
  borderRadius: 8,
  marginHorizontal: 4,
  backgroundColor: isActive ? "#e0f7fa" : "white",
}));

const BottomNavText = styled(Text)();