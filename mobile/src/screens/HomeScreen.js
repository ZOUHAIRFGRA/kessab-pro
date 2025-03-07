import { styled } from "dripsy";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
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
    { key: "BuyersList", name: t("common.view_buyers"), icon: "account-group" },
    { key: "Marketplace", name: t("common.marketplace"), icon: "store" },
  ];

  const actions = [
    {
      key: "addBuyerScreen",
      name: t("common.add_buyer"),
      icon: "account-plus",
    },
    {
      key: "AddSheep",
      name: t("common.add_sheep"),
      icon: "sheep",
      onPress: handleAddSheepPress,
    },
    { key: "Category", name: t("common.categories"), icon: "layers" },
    { key: "MySellsScreen", name: t("common.view_sales"), icon: "chart-line" },
  ];

  return (
    <Container>
      <ContentContainer>
        <SearchInputContainer>
          <SearchInput
            ref={searchInputRef}
            placeholder={t("common.search_placeholder")}
            value={searchText}
            onChangeText={handleSearchChange}
            onSubmitEditing={handleSearch}
            placeholderTextColor="#999"
            textAlign={isRTL ? "right" : "left"}
          />
          <SearchIconContainer isRTL={isRTL}>
            <Icon name="magnify" size={24} color={Colors.primary} />
          </SearchIconContainer>
          {searchText.length > 0 && (
            <ClearButton onPress={() => setSearchText("")} isRTL={isRTL}>
              <Icon name="close-circle" size={20} color="#666" />
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
              color={Colors.primary}
            />
          )}
        </SearchInputContainer>

        <Grid>
          {gridItems.map((item) => (
            <GridItem
              key={item.key}
              onPress={() => navigation.navigate(item.key)}
            >
              <Icon name={item.icon} size={36} color="dark" />
              <GridItemText
                sx={{
                  variant: "text.subheading",
                  marginTop: 8,
                  textAlign: isRTL ? "right" : "left",
                }}
              >
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
                onPress={
                  action.onPress || (() => navigation.navigate(action.key))
                }
                accessibilityRole="button"
                accessibilityLabel={`Navigate to ${action.name}`}
              >
                <ActionIcon name={action.icon} />
                <ActionText sx={{ textAlign: isRTL ? "right" : "center" }}>
                  {action.name}
                </ActionText>
              </HorizontalActionItem>
            ))}
          </HorizontalScroll>
        </HorizontalScrollContainer>
      </ContentContainer>

      <BottomNavContainer>
        <BottomNav>
          {[
            {
              label: t("common.dashboard"),
              route: "Dashboard",
              icon: "view-dashboard",
            },
            {
              label: t("common.QRscanner"),
              route: "QRScanner",
              icon: "qrcode-scan",
            },
            {
              label: t("common.profile"),
              route: "Profile",
              icon: "account",
            },
          ].map((item) => {
            const isActive =
              navigation.isFocused?.() &&
              navigation.getCurrentRoute?.().name === item.route;

            return (
              <BottomNavItem
                key={item.route}
                onPress={() => navigation.navigate(item.route)}
                accessibilityRole="button"
                accessibilityLabel={`Navigate to ${item.label}`}
                accessibilityHint={t(
                  `common.nav_hint_${item.route.toLowerCase()}`
                )}
                isActive={isActive}
              >
                <BottomNavIcon name={item.icon} isActive={isActive} />
                <BottomNavText
                  sx={{
                    variant: "text.secondary",
                    textAlign: isRTL ? "right" : "center",
                  }}
                  isActive={isActive}
                >
                  {item.label}
                </BottomNavText>
              </BottomNavItem>
            );
          })}
        </BottomNav>
      </BottomNavContainer>

      <AddAnimalModal
        visible={isAddAnimalModalVisible}
        onClose={closeAddAnimalModal}
      />
    </Container>
  );
}

const Container = styled(SafeAreaView)({
  flex: 1,
  backgroundColor: "background",
});

const ContentContainer = styled(ScrollView)({
  flex: 1,
  padding: 16,
});

const SearchInputContainer = styled(View)({
  position: "relative",
  marginBottom: 16,
});

const SearchInput = styled(TextInput)({
  height: 50,
  borderRadius: 12,
  backgroundColor: "#fff",
  paddingHorizontal: 40, // Increased padding to accommodate icons
  paddingVertical: 12,
  fontSize: 16,
  color: "#333",
  borderWidth: 1,
  borderColor: "#ddd",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
});

const SearchIconContainer = styled(View)(({ isRTL }) => ({
  position: "absolute",
  left: isRTL ? null : 10,
  right: isRTL ? 10 : null,
  top: 13,
}));

const ClearButton = styled(TouchableOpacity)(({ isRTL }) => ({
  position: "absolute",
  right: isRTL ? null : 10,
  left: isRTL ? 10 : null,
  top: 15,
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

const BottomNavContainer = styled(View)({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "background",
  paddingHorizontal: 16,
  paddingBottom: 16,
  paddingTop: 8,
});

const BottomNav = styled(View)({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: 16,
  backgroundColor: Colors.white,
  padding: 8,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: -2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 5,
});

const BottomNavItem = styled(TouchableOpacity)(({ isActive }) => ({
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 10,
  paddingHorizontal: 8,
  borderRadius: 12,
  backgroundColor: isActive ? Colors.secondaryLight : "transparent",
  transition: "all 0.2s ease-in-out",
}));

const BottomNavIcon = styled(Icon)(({ isActive }) => ({
  fontSize: 24,
  color: isActive ? Colors.secondary : Colors.primary,
}));

const BottomNavText = styled(Text)(({ isActive }) => ({
  fontSize: 12,
  marginTop: 4,
  fontWeight: isActive ? "700" : "500",
  color: isActive ? Colors.secondary : Colors.primary,
}));
