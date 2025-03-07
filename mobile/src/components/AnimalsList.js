import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAnimals, resetAnimals } from "../features/animalSlice";
import { fetchCategoryById } from "../features/categorySlice";
import { getBaseURL } from "../api/axiosInstance";
import { styled } from "dripsy";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import Colors from "../utils/Colors";
const AnimalsList = ({ searchText: propSearchText, route, isLoading }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    animals,
    error: animalsError,
    totalPages,
  } = useSelector((state) => state.animals);
  const { categories } = useSelector((state) => state.categories);
  const [currentPage, setCurrentPage] = useState(0);
  const [fetchedCategoryIds, setFetchedCategoryIds] = useState(new Set());
  const fadeAnim = new Animated.Value(1);

  const searchText = route?.params?.searchText ?? propSearchText ?? "";
  const isRTL = t("dir") === "rtl";

  const fetchAnimals = useCallback(
    (page) => {
      dispatch(getAnimals({ page, search: searchText, filterType: "tag" }));
    },
    [dispatch, searchText]
  );

  useFocusEffect(
    useCallback(() => {
      setCurrentPage(0);
      dispatch(resetAnimals());
      fetchAnimals(0);
    }, [dispatch, fetchAnimals])
  );

  useEffect(() => {
    const newCategoryIds = animals
      .map((animal) =>
        typeof animal.category === "string"
          ? animal.category
          : animal.category?.id
      )
      .filter((id) => id && !fetchedCategoryIds.has(id) && !categories[id]);

    newCategoryIds.forEach((categoryId) => {
      dispatch(fetchCategoryById(categoryId));
      setFetchedCategoryIds((prev) => new Set(prev).add(categoryId));
    });
  }, [animals, dispatch]);

  const handlePagination = (newPage) => {
    if (newPage >= 0 && newPage < totalPages && !isLoading) {
      setCurrentPage(newPage);
      fetchAnimals(newPage);
    }
  };

  const handleAnimalClick = (id) => {
    navigation.navigate("AnimalDetails", { animalId: id });
  };

  React.useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 0.4,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [isLoading, fadeAnim]);

  const renderItem = useCallback(
    ({ item }) => {
      const categoryId =
        typeof item.category === "string" ? item.category : item.category?.id;
      const category = categories.find(
        (category) => category.id === categoryId
      );
      const categoryName = category
        ? category.typeName
        : t("common.uncategorized");
      const statusText = item.saleId ? t("common.sold") : t("common.unsold");

      return (
        <ListItem onPress={() => handleAnimalClick(item.id)}>
          <AnimalImage
            source={{ uri: `${getBaseURL()}${item.imagePaths[0]}` }}
            defaultSource={{ uri: "https://placehold.co/50x50" }}
          />
          <AnimalInfo>
            <ListItemText>{item.tag}</ListItemText>
            <AnimalSubText>{categoryName}</AnimalSubText>
            <AnimalSubText>{item.sex || t("common.unknown_sex")}</AnimalSubText>
            <AnimalStatus>{statusText}</AnimalStatus>
          </AnimalInfo>
        </ListItem>
      );
    },
    [categories, handleAnimalClick, t]
  );

  return (
    <Container>
      {isLoading ? (
        <LoadingOverlay>
          <Animated.View style={{ opacity: fadeAnim }}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </Animated.View>
        </LoadingOverlay>
      ) : animalsError ? (
        <ErrorText>
          {t("common.error")}: {animalsError}
        </ErrorText>
      ) : animals.length === 0 ? (
        <NoAnimalsWrapper>
          <Icon name="emoticon-sad" size={40} color={Colors.warning} />
          <NoAnimalsText>{t("common.no_animals_found")}</NoAnimalsText>
          <AddAnimalPrompt
            onPress={() => navigation.navigate("ManagementScreen")}
          >
            <PromptText>{t("common.add_animal_prompt")}</PromptText>
          </AddAnimalPrompt>
        </NoAnimalsWrapper>
      ) : (
        <FlatList
          data={animals}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 8, paddingBottom: 16 }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <SectionTitle isRTL={isRTL}>{t("common.animals")}</SectionTitle>
          }
          ListFooterComponent={
            <PaginationWrapper isRTL={isRTL}>
              <PaginationButton
                onPress={() => handlePagination(currentPage - 1)}
                disabled={currentPage <= 0 || isLoading}
              >
                <Icon name="chevron-left" size={20} color="#fff" />
              </PaginationButton>
              <CurrentPageText>{`${
                currentPage + 1
              } / ${totalPages}`}</CurrentPageText>
              <PaginationButton
                onPress={() => handlePagination(currentPage + 1)}
                disabled={currentPage >= totalPages - 1 || isLoading}
              >
                <Icon name="chevron-right" size={20} color="#fff" />
              </PaginationButton>
            </PaginationWrapper>
          }
        />
      )}
    </Container>
  );
};

const Container = styled(View)({
  flex: 1,
});

const SectionTitle = styled(Text)(({ isRTL }) => ({
  fontSize: 22,
  fontWeight: "700",
  color: "#1e293b",
  marginBottom: 12,
  textAlign: isRTL ? "right" : "left",
  letterSpacing: 0.5,
}));

const ListItem = styled(TouchableOpacity)(({ pressed }) => ({
  flexDirection: "row",
  padding: 16,
  borderRadius: 12,
  marginBottom: 12,
  backgroundColor: pressed ? "#f1f5f9" : "#fff",
  borderWidth: 1,
  borderColor: "#e5e7eb",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 6,
  elevation: 3,
}));

const AnimalImage = styled(Image)({
  width: 60,
  height: 60,
  borderRadius: 10,
  backgroundColor: "#e5e7eb",
});

const AnimalInfo = styled(View)({
  flex: 1,
  marginLeft: 12,
  justifyContent: "center",
});

const ListItemText = styled(Text)({
  fontSize: 18,
  fontWeight: "600",
  color: "#1e293b",
});

const AnimalSubText = styled(Text)({
  fontSize: 14,
  color: "#64748b",
  marginTop: 4,
});

const AnimalStatus = styled(Text)({
  fontSize: 20,
  color: Colors.primary,
  marginTop: 4,
  fontWeight: "bold",
  textAlign: "right",
});

const PaginationWrapper = styled(View)(({ isRTL }) => ({
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  paddingVertical: 12,
  gap: 16,
}));

const PaginationButton = styled(TouchableOpacity)(({ disabled }) => ({
  paddingHorizontal: 14,
  paddingVertical: 10,
  borderRadius: 8,
  backgroundColor: disabled ? "#d1d5db" : Colors.primary,
  justifyContent: "center",
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: disabled ? 0 : 0.1,
  shadowRadius: 4,
  elevation: disabled ? 0 : 2,
}));

const CurrentPageText = styled(Text)({
  fontSize: 16,
  fontWeight: "600",
  color: Colors.primary,
});

const NoAnimalsWrapper = styled(View)({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  padding: 20,
});

const NoAnimalsText = styled(Text)({
  fontSize: 16,
  fontWeight: "500",
  color: "#b0b0b0",
  marginTop: 12,
});

const AddAnimalPrompt = styled(TouchableOpacity)({
  marginTop: 16,
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 8,
  backgroundColor: "#e6f0fa",
});

const PromptText = styled(Text)({
  fontSize: 14,
  color: "#4A90E2",
  fontWeight: "600",
});

const ErrorText = styled(Text)({
  fontSize: 16,
  color: "#dc3545",
  textAlign: "center",
  padding: 20,
});

const LoadingOverlay = styled(View)({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
});

export default AnimalsList;
