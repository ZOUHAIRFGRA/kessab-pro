import React, { useCallback, useEffect, useState } from "react";
import "../../global.css";
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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, FrownIcon, Plus } from "lucide-react-native";
import type { RootState } from "../store/store";

interface AnimalsListProps {
  searchText?: string;
  route?: {
    params?: {
      searchText?: string;
    };
  };
  isLoading?: boolean;
}

interface Animal {
  id: string;
  tag: string;
  imagePaths: string[];
  category: string | { id: string };
  sex?: string;
  saleId?: string;
}

interface Category {
  id: string;
  typeName: string;
}

const AnimalsList: React.FC<AnimalsListProps> = ({
  searchText: propSearchText,
  route,
  isLoading = false,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  
  const {
    animals,
    error: animalsError,
    totalPages,
  } = useSelector((state: RootState) => state.animals);
  
  const { categories } = useSelector((state: RootState) => state.categories);
  
  const [currentPage, setCurrentPage] = useState(0);
  const [fetchedCategoryIds, setFetchedCategoryIds] = useState(new Set<string>());
  const fadeAnim = new Animated.Value(1);

  const searchText = route?.params?.searchText ?? propSearchText ?? "";
  const isRTL = t("dir") === "rtl";

  const fetchAnimals = useCallback(
    (page: number) => {
      dispatch(getAnimals({ page, search: searchText, filterType: "tag" }) as any);
    },
    [dispatch, searchText]
  );

  useFocusEffect(
    useCallback(() => {
      setCurrentPage(0);
      dispatch(resetAnimals() as any);
      fetchAnimals(0);
    }, [dispatch, fetchAnimals])
  );

  useEffect(() => {
    const newCategoryIds = animals
      .map((animal: Animal) =>
        typeof animal.category === "string"
          ? animal.category
          : animal.category?.id
      )
      .filter((id) => id && !fetchedCategoryIds.has(id) && !categories[id]);

    newCategoryIds.forEach((categoryId: string) => {
      dispatch(fetchCategoryById(categoryId) as any);
      setFetchedCategoryIds((prev) => new Set(prev).add(categoryId));
    });
  }, [animals, dispatch, categories, fetchedCategoryIds]);

  const handlePagination = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages && !isLoading) {
      setCurrentPage(newPage);
      fetchAnimals(newPage);
    }
  };

  const handleAnimalClick = (id: string) => {
    navigation.navigate("AnimalDetails" as never, { animalId: id } as never);
  };

  useEffect(() => {
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
    ({ item }: { item: Animal }) => {
      const categoryId =
        typeof item.category === "string" ? item.category : item.category?.id;
      const category = categories.find(
        (cat: Category) => cat.id === categoryId
      );
      const categoryName = category
        ? category.typeName
        : t("common.uncategorized");
      const statusText = item.saleId ? t("common.sold") : t("common.unsold");
      const statusColor = item.saleId ? "#1e293b" : "#dc2626";

      return (
        <TouchableOpacity
          onPress={() => handleAnimalClick(item.id)}
          className="flex-row p-4 rounded-xl mb-3 bg-white border border-[#e5e7eb] shadow-sm active:bg-[#f1f5f9]"
        >
          <Image
            source={{ uri: `${getBaseURL()}${item.imagePaths[0]}` }}
            defaultSource={{ uri: "https://placehold.co/50x50" }}
            className="w-[60px] h-[60px] rounded-lg bg-[#e5e7eb]"
          />
          <View className="flex-1 ml-3 justify-center">
            <Text className="text-lg font-semibold text-[#1e293b]">
              {item.tag}
            </Text>
            <Text className="text-sm text-[#64748b] mt-1">{categoryName}</Text>
            <Text className="text-sm text-[#64748b] mt-1">
              {item.sex || t("common.unknown_sex")}
            </Text>
            <Text
              className="text-xl font-bold mt-1 text-right"
              style={{ color: statusColor }}
            >
              {statusText}
            </Text>
          </View>
        </TouchableOpacity>
      );
    },
    [categories, handleAnimalClick, t]
  );

  const renderHeader = () => (
    <Text
      className={`text-2xl font-bold text-[#1e293b] mb-3 tracking-wide ${
        isRTL ? "text-right" : "text-left"
      }`}
    >
      {t("common.animals")}
    </Text>
  );

  const renderFooter = () => (
    <View
      className={`flex-row justify-center items-center py-3 gap-4 ${
        isRTL ? "flex-row-reverse" : ""
      }`}
    >
      <TouchableOpacity
        onPress={() => handlePagination(currentPage - 1)}
        disabled={currentPage <= 0 || isLoading}
        className={`px-3.5 py-2.5 rounded-lg justify-center items-center ${
          currentPage <= 0 || isLoading ? "bg-[#d1d5db]" : "bg-[#1e293b]"
        }`}
      >
        <ChevronLeft size={20} color="#fff" />
      </TouchableOpacity>
      <Text className="text-base font-semibold text-[#1e293b]">
        {`${currentPage + 1} / ${totalPages}`}
      </Text>
      <TouchableOpacity
        onPress={() => handlePagination(currentPage + 1)}
        disabled={currentPage >= totalPages - 1 || isLoading}
        className={`px-3.5 py-2.5 rounded-lg justify-center items-center ${
          currentPage >= totalPages - 1 || isLoading
            ? "bg-[#d1d5db]"
            : "bg-[#1e293b]"
        }`}
      >
        <ChevronRight size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1">
      {isLoading ? (
        <View className="flex-1 justify-center items-center bg-white/80">
          <Animated.View style={{ opacity: fadeAnim }}>
            <ActivityIndicator size="large" color="#1e293b" />
          </Animated.View>
        </View>
      ) : animalsError ? (
        <Text className="text-base text-[#dc2626] text-center p-5">
          {t("common.error")}: {animalsError}
        </Text>
      ) : animals.length === 0 ? (
        <View className="flex-1 justify-center items-center p-5">
          <FrownIcon size={40} color="#f59e0b" />
          <Text className="text-base font-medium text-[#b0b0b0] mt-3">
            {t("common.no_animals_found")}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("ManagementScreen" as never)}
            className="mt-4 py-2 px-4 rounded-lg bg-[#fef3c7] flex-row items-center gap-2"
          >
            <Plus size={16} color="#f59e0b" />
            <Text className="text-sm text-[#f59e0b] font-semibold">
              {t("common.add_animal_prompt")}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={animals}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 8, paddingBottom: 16 }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
        />
      )}
    </View>
  );
};

export default AnimalsList;
