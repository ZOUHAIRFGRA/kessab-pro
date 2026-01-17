import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";
import { Search, Plus, X, ArrowLeft } from "lucide-react-native";
import BuyersListCardView from "../../components/buyer/BuyersListCardView";
import { useGetBuyersQuery } from "../../services";
import { Pagination } from "../../components/global/Pagination";
import "../../../global.css";

export default function BuyersScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const isRTL = t("dir") === "rtl";

  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  // RTK Query hook for pagination tracking
  const { data } = useGetBuyersQuery({ page: currentPage, search: searchText });
  const totalPages = data?.totalPages || 0;

  const getNextPage = (page: number) => {
    setCurrentPage(page);
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
            onPress={() => navigation.goBack()}
            className="w-10 h-10 bg-white/10 rounded-full items-center justify-center"
          >
            <ArrowLeft size={22} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold">
            {t("common.view_buyers")}
          </Text>
          <View className="w-10" />
        </View>

        {/* Search Bar */}
        <View className="bg-white/10 rounded-2xl flex-row items-center px-4">
          <Search size={20} color="rgba(255,255,255,0.7)" />
          <TextInput
            placeholder={t("common.SearchByBuyerNameOrCIN")}
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="rgba(255,255,255,0.5)"
            className={`flex-1 py-3 px-3 text-white text-base ${
              isRTL ? "text-right" : "text-left"
            }`}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText("")}>
              <X size={18} color="rgba(255,255,255,0.7)" />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>

      {/* Buyers List */}
      <View className="flex-1 px-5 pt-4">
        <BuyersListCardView searchText={searchText} />
      </View>

      {/* Pagination */}
      {totalPages > 0 && (
        <Pagination pages={totalPages} onPageChange={getNextPage} />
      )}

      {/* Add Buyer FAB */}
      <TouchableOpacity
        onPress={() => navigation.navigate("addBuyerScreen")}
        style={styles.fabContainer}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={["#f59e0b", "#d97706"]}
          style={styles.fab}
        >
          <Plus size={28} color="white" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 48,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 96,
    right: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
