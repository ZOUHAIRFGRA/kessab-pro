import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useDebounce } from "use-debounce";
import { getAnimals, resetAnimals } from "../features/animalSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";
import { Search, X, Plus, Menu } from "lucide-react-native";
import AnimalsList from "../components/AnimalsList";
import AddAnimalModal from "../components/AddAnimalModal";
import { useToast } from "../hooks/useToast";
import FallBack, { FALLBACK_TYPE } from "../components/global/Fallback";
import type { RootState, AppDispatch } from "../store/store";
import "../../global.css";

export default function ManagementScreen() {
  const { t } = useTranslation();
  const { showErrorToast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<any>();
  const isRTL = t("dir") === "rtl";
  const { animals } = useSelector((state: RootState) => state.animals);

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

  const handleSearchChange = (text: string) => setSearchText(text);

  const handleSearchSubmit = () => {
    if (debouncedSearchText.length > 0 && debouncedSearchText.length < 3) {
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
    <View className="flex-1 bg-surface-50">
      {/* Header */}
      <LinearGradient
        colors={["#334e68", "#243b53"]}
        className="pt-12 pb-6 px-5"
      >
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            className="w-10 h-10 bg-white/10 rounded-full items-center justify-center"
          >
            <Menu size={22} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold">
            {t("common.management")}
          </Text>
          <View className="w-10" />
        </View>

        {/* Search Bar */}
        <View className="bg-white/10 rounded-2xl flex-row items-center px-4">
          <Search size={20} color="rgba(255,255,255,0.7)" />
          <TextInput
            placeholder={t("common.search_by_tag")}
            value={searchText}
            onChangeText={handleSearchChange}
            onSubmitEditing={handleSearchSubmit}
            placeholderTextColor="rgba(255,255,255,0.5)"
            className={`flex-1 py-3 px-3 text-white text-base ${
              isRTL ? "text-right" : "text-left"
            }`}
            editable={!isLoading}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={resetSearchText}>
              <X size={18} color="rgba(255,255,255,0.7)" />
            </TouchableOpacity>
          )}
          {isLoading && <ActivityIndicator color="white" size="small" />}
        </View>
      </LinearGradient>

      {/* Quick Actions */}
      <View className="px-5 py-4">
        <Text className="text-primary-800 text-lg font-bold mb-3">
          {t("common.quick_actions")}
        </Text>
        <TouchableOpacity
          onPress={() => setAddAnimalModalVisible(true)}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={["#f59e0b", "#d97706"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="rounded-2xl p-4 flex-row items-center"
          >
            <View className="w-12 h-12 bg-white/20 rounded-xl items-center justify-center">
              <Plus size={24} color="white" />
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-white text-base font-semibold">
                {t("common.add_animal")}
              </Text>
              <Text className="text-white/70 text-sm">
                Add a new animal to your inventory
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Animals List */}
      <View className="flex-1 px-5">
        <Text className="text-primary-800 text-lg font-bold mb-3">
          {t("common.Your Animals")}
        </Text>
        <View className="flex-1 bg-white rounded-2xl overflow-hidden shadow-sm">
          {animals.length === 0 && !isLoading ? (
            <FallBack
              type={FALLBACK_TYPE.NOT_FOUND}
              message={t("common.no_animals_found")}
            />
          ) : (
            <AnimalsList searchText={debouncedSearchText} isLoading={isLoading} />
          )}
        </View>
      </View>

      {/* Add Animal Modal */}
      {addAnimalModalVisible && (
        <AddAnimalModal
          visible={addAnimalModalVisible}
          onClose={() => {
            setAddAnimalModalVisible(false);
            resetSearchText();
          }}
        />
      )}
    </View>
  );
}
