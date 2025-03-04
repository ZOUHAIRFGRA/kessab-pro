import React, { useCallback, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { styled } from "dripsy";
import Icon from "react-native-vector-icons/FontAwesome";
import AnimalsList from "../components/AnimalsList";
import AddAnimalModal from "../components/AddAnimalModal";
import { useDebounce } from "use-debounce";
import { getAnimals, resetAnimals } from "../features/animalSlice";
import { useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useToast } from "../hooks/useToast";

export default function ManagementScreen() {
  const { t } = useTranslation();
  const { showErrorToast } = useToast();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isRTL = t("dir") === "rtl";

  const [addAnimalModalVisible, setAddAnimalModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText] = useDebounce(searchText, 300);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAnimals = useCallback(
    (search = "") => {
      setIsLoading(true);
      dispatch(resetAnimals());
      dispatch(getAnimals({ page: 0, search, filterType: "tag" })).finally(() =>
        setIsLoading(false)
      );
    },
    [dispatch]
  );

  useFocusEffect(
    useCallback(() => {
      fetchAnimals("");
    }, [fetchAnimals])
  );

  const handleSearchChange = (text) => setSearchText(text);

  const handleSearchSubmit = () => {
    if (debouncedSearchText.length < 3) {
      showErrorToast(t("common.search_too_short"));
      return;
    }
    fetchAnimals(debouncedSearchText);
  };

  const resetSearchText = () => {
    setSearchText("");
    fetchAnimals("");
  };

  return (
    <Container>
      <SectionTitle isRTL={isRTL}>{t("common.quick_actions")}</SectionTitle>
      <QuickActionList isRTL={isRTL}>
        <QuickActionItem
          onPress={() => setAddAnimalModalVisible(true)}
          isRTL={isRTL}
          accessibilityRole="button"
          accessibilityLabel={t("common.add_animal")}
        >
          <QuickActionIcon name="plus" />
          <QuickActionText isRTL={isRTL}>{t("common.add_animal")}</QuickActionText>
        </QuickActionItem>
      </QuickActionList>

      <SearchContainer>
        <SearchInput
          placeholder={t("common.search_by_tag")}
          value={searchText}
          onChangeText={handleSearchChange}
          onSubmitEditing={handleSearchSubmit}
          placeholderTextColor="#888"
          textAlign={isRTL ? "right" : "left"}
          editable={!isLoading}
        />
        {searchText.length > 0 && (
          <ClearButton onPress={resetSearchText} isRTL={isRTL}>
            <Icon name="times-circle" size={20} color="#888" />
          </ClearButton>
        )}
        {isLoading && (
          <ActivityIndicator
            style={{
              position: "absolute",
              right: isRTL ? null : 40,
              left: isRTL ? 40 : null,
              top: 14,
            }}
            color="#4A90E2"
          />
        )}
      </SearchContainer>

      <AnimalsListContainer>
        <AnimalsList searchText={debouncedSearchText} isLoading={isLoading} />
      </AnimalsListContainer>

      {addAnimalModalVisible && (
        <AddAnimalModal
          visible={addAnimalModalVisible}
          onClose={() => {
            setAddAnimalModalVisible(false);
            resetSearchText();
          }}
        />
      )}
    </Container>
  );
}

// Styled Components for ManagementScreen
const Container = styled(View)({
  flex: 1,
  padding: 16,
  backgroundColor: "#f5f5f5",
  gap: 16,
});

const SectionTitle = styled(Text)(({ isRTL }) => ({
  fontSize: 20,
  fontWeight: "700",
  color: "#2c3e50",
  marginBottom: 12,
  textAlign: isRTL ? "right" : "left",
  letterSpacing: 0.5,
}));

const QuickActionList = styled(View)(({ isRTL }) => ({
  flexDirection: isRTL ? "row-reverse" : "row",
  gap: 16,
  marginBottom: 16,
}));

const QuickActionItem = styled(TouchableOpacity)(({ isRTL, pressed }) => ({
  backgroundColor: pressed ? "#e6f0fa" : "#fff",
  padding: 16,
  borderRadius: 12,
  width: 120,
  height: 100,
  justifyContent: "center",
  alignItems: "center",
  marginLeft: isRTL ? 16 : 0,
  marginRight: isRTL ? 0 : 16,
  borderWidth: 1,
  borderColor: "#e0e0e0",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.1,
  shadowRadius: 6,
  elevation: 4,
}));

const QuickActionIcon = styled(Icon)({
  color: "#4A90E2",
  fontSize: 40,
  marginBottom: 8,
});

const QuickActionText = styled(Text)(({ isRTL }) => ({
  fontSize: 14,
  fontWeight: "600",
  color: "#555",
  textAlign: isRTL ? "right" : "center",
  numberOfLines: 2,
}));

const SearchContainer = styled(View)({
  position: "relative",
  marginBottom: 16,
});

const SearchInput = styled(TextInput)({
  borderWidth: 1,
  borderColor: "#d0d0d0",
  padding: 12,
  paddingRight: 40,
  borderRadius: 10,
  height: 50,
  backgroundColor: "#fff",
  fontSize: 16,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.05,
  shadowRadius: 4,
  elevation: 2,
});

const ClearButton = styled(TouchableOpacity)(({ isRTL }) => ({
  position: "absolute",
  right: isRTL ? null : 10,
  left: isRTL ? 10 : null,
  top: 15,
}));

const AnimalsListContainer = styled(View)({
  flex: 1,
  backgroundColor: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)", // Subtle gradient
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#e5e7eb",
  overflow: "hidden",
});