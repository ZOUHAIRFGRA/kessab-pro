import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Utensils, Construction } from "lucide-react-native";
import "../../global.css";

export default function FoodScreen() {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();

  return (
    <View className="flex-1 bg-surface-50">
      {/* Header */}
      <LinearGradient
        colors={["#334e68", "#243b53"]}
        className="pt-12 pb-6 px-5"
      >
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="w-10 h-10 bg-white/10 rounded-full items-center justify-center"
          >
            <ArrowLeft size={22} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold">
            {t("common.Food Management")}
          </Text>
          <View className="w-10" />
        </View>
      </LinearGradient>

      {/* Content */}
      <View className="flex-1 items-center justify-center px-8">
        <View className="w-32 h-32 bg-accent-100 rounded-full items-center justify-center mb-6">
          <Utensils size={60} color="#f59e0b" />
        </View>

        <Text className="text-primary-800 text-2xl font-bold text-center mb-3">
          {t("common.Coming Soon")}
        </Text>

        <View className="flex-row items-center bg-surface-100 rounded-xl px-4 py-2 mb-4">
          <Construction size={18} color="#627d98" />
          <Text className="text-surface-600 text-sm ml-2">
            Under Development
          </Text>
        </View>

        <Text className="text-surface-500 text-base text-center leading-6">
          Food and nutrition management features will be available in a future
          update.
        </Text>
      </View>
    </View>
  );
}
