import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useDebounce } from "use-debounce";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";
import { Search, X, Plus, Menu } from "lucide-react-native";
import AnimalsList from "../components/AnimalsList";
import AddAnimalModal from "../components/AddAnimalModal";
import { useToast } from "../hooks/useToast";
import FallBack, { FALLBACK_TYPE } from "../components/global/Fallback";
import { useGetAnimalsQuery } from "../services";
import "../../global.css";

export default function ManagementScreen() {
  const { t } = useTranslation();
  const { showErrorToast } = useToast();
  const navigation = useNavigation<any>();
  const isRTL = t("dir") === "rtl";

  const [addAnimalModalVisible, setAddAnimalModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText] = useDebounce(searchText, 300);
  const [submittedSearch, setSubmittedSearch] = useState("");

  // RTK Query hook
  const { data, isLoading, isFetching, refetch } = useGetAnimalsQuery(
    { page: 0, search: submittedSearch, filterType: "tag" },
    { refetchOnFocus: true }
  );

  const animals = data?.content || [];
  
  // console.log("Animals data:", animals);

  const handleSearchChange = (text: string) => setSearchText(text);

  const handleSearchSubmit = () => {
    if (debouncedSearchText.length > 0 && debouncedSearchText.length < 3) {
      showErrorToast(t("common.search_too_short"));
      return;
    }
    setSubmittedSearch(debouncedSearchText);
  };

  const resetSearchText = () => {
    setSearchText("");
    setSubmittedSearch("");
  };

  return (
    <View className="flex-1 bg-surface-50">
      {/* Header */}
      <LinearGradient
        colors={["#334e68", "#243b53"]}
        style={styles.header}
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
          {isFetching && <ActivityIndicator color="white" size="small" />}
        </View>
      </LinearGradient>

      {/* Quick Actions */}
      <View className="px-5 py-4">
        <Text className="text-primary-800 text-lg font-bold mb-3">
          {t("common.Quick Actions")}
        </Text>
        <TouchableOpacity
          onPress={() => setAddAnimalModalVisible(true)}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={["#f59e0b", "#d97706"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.addButton}
          >
            <View className="w-12 h-12 bg-white/20 rounded-xl items-center justify-center">
              <Plus size={24} color="white" />
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-white text-base font-semibold">
                {t("common.add_animal")}
              </Text>
              <Text className="text-white/70 text-sm">
                {t("common.Add a new animal to your inventory")}
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
            <AnimalsList 
              searchText={submittedSearch} 
              isLoading={isLoading} 
              animals={animals}
            />
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

const styles = StyleSheet.create({
  header: {
    paddingTop: 48,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  addButton: {
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
