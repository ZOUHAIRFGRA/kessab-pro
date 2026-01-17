import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";
import { Search, Plus, X, ArrowLeft } from "lucide-react-native";
import BuyersListCardView from "../../components/buyer/BuyersListCardView";
import { getBuyers } from "../../features/buyerSlice";
import { Pagination } from "../../components/global/Pagination";
import type { RootState, AppDispatch } from "../../store/store";
import "../../../global.css";

export default function BuyersScreen() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<any>();
  const isRTL = t("dir") === "rtl";

  const [searchText, setSearchText] = useState("");
  const { totalPages } = useSelector((state: RootState) => state.buyers);

  const getNextPage = (page: number) => {
    dispatch(getBuyers({ page }));
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
        className="absolute bottom-24 right-5"
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={["#f59e0b", "#d97706"]}
          className="w-14 h-14 rounded-full items-center justify-center shadow-lg"
        >
          <Plus size={28} color="white" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
