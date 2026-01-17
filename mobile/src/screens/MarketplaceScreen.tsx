import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Bell, Store, Rocket } from "lucide-react-native";
import * as Progress from "react-native-progress";
import "../../global.css";

export default function MarketplaceScreen() {
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
            {t("common.marketplace")}
          </Text>
          <TouchableOpacity className="w-10 h-10 bg-white/10 rounded-full items-center justify-center">
            <Bell size={20} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Content */}
      <View className="flex-1 items-center justify-center px-8">
        {/* Illustration */}
        <View className="w-48 h-48 bg-accent-100 rounded-full items-center justify-center mb-8">
          <Store size={80} color="#f59e0b" />
        </View>

        {/* Coming Soon Text */}
        <Text className="text-primary-800 text-3xl font-bold text-center">
          {t("common.Coming Soon")}
        </Text>
        <Text className="text-surface-500 text-base text-center mt-3 leading-6">
          We're working hard to bring you an amazing marketplace experience.
          Stay tuned!
        </Text>

        {/* Progress Indicator */}
        <View className="mt-8 items-center">
          <Progress.Bar
            color="#f59e0b"
            unfilledColor="#e4e4e7"
            borderWidth={0}
            indeterminate={true}
            width={200}
            height={6}
            borderRadius={3}
          />
          <Text className="text-surface-400 text-sm mt-3">
            Building something great...
          </Text>
        </View>

        {/* Features Preview */}
        <View className="mt-10 w-full">
          <View className="bg-white rounded-2xl p-5 shadow-sm">
            <View className="flex-row items-center mb-4">
              <Rocket size={20} color="#334e68" />
              <Text className="text-primary-800 font-semibold ml-2">
                {t("common.Upcoming Features")}
              </Text>
            </View>
            <View className="space-y-3">
              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-accent-500 rounded-full mr-3" />
                <Text className="text-surface-600 text-sm">
                  Buy and sell livestock
                </Text>
              </View>
              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-accent-500 rounded-full mr-3" />
                <Text className="text-surface-600 text-sm">
                  Connect with local farmers
                </Text>
              </View>
              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-accent-500 rounded-full mr-3" />
                <Text className="text-surface-600 text-sm">
                  Secure transactions
                </Text>
              </View>
              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-accent-500 rounded-full mr-3" />
                <Text className="text-surface-600 text-sm">
                  Price comparisons
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Notify Me Button */}
        <TouchableOpacity className="mt-8" activeOpacity={0.8}>
          <LinearGradient
            colors={["#f59e0b", "#d97706"]}
            className="rounded-2xl py-4 px-8 flex-row items-center"
          >
            <Bell size={18} color="white" />
            <Text className="text-white font-semibold ml-2">
              {t("common.Notify Me")}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}
