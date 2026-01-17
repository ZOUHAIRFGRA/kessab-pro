import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { getBaseURL } from "../../api/axiosInstance";
import { getPickedUpDate } from "../../helpers/AnimalHelpers";
import { getValue } from "../../helpers/gloablHelpers";
import Text from "../global/Text";
import { Truck, DollarSign } from "lucide-react-native";
import type { NativeStackNavigationProp } from "@react-navigation/stack";
import "../../../global.css";

interface Animal {
  id: number;
  tag: string;
  sex: string;
  price: number;
  imagePaths: string[];
}

interface AnimalCardViewProps {
  animal: Animal;
}

export default function AnimalCardView({ animal }: AnimalCardViewProps) {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleAnimalClick = () => {
    navigation.navigate("AnimalDetails", { animalId: animal.id });
  };

  return (
    <TouchableOpacity
      onPress={handleAnimalClick}
      className="bg-white rounded-2xl shadow-sm shadow-black/5 border border-surface-200 active:scale-[0.98]"
      activeOpacity={0.9}
    >
      <View className="flex-row p-4">
        {/* Animal Image */}
        <View className="relative w-20 h-20 mr-3">
          <Image
            source={{
              uri:
                getBaseURL() +
                (animal?.imagePaths?.length > 0
                  ? animal.imagePaths[0]
                  : "/icons/live_stock.png"),
            }}
            className="w-full h-full rounded-xl border border-primary-200"
          />
        </View>

        {/* Animal Info */}
        <View className="flex-1 justify-between">
          {/* Tag Number */}
          <Text className="text-primary-800 text-base font-bold mb-2">
            {animal.tag}
          </Text>

          {/* Gender and Price Row */}
          <View className="flex-row gap-2 mb-2">
            {/* Gender Tag */}
            <View className="flex-1 flex-row items-center bg-surface-100 rounded-lg px-2 py-1.5">
              <Text className="text-surface-600 text-xs ml-1">
                {t(`common.Gender.${getValue(animal.sex)}`)}
              </Text>
            </View>

            {/* Price Tag */}
            <View className="flex-1 flex-row items-center bg-accent-50 rounded-lg px-2 py-1.5">
              <DollarSign size={14} color="#d97706" />
              <Text className="text-accent-700 text-xs font-semibold ml-0.5">
                {animal.price} DH
              </Text>
            </View>
          </View>

          {/* Pickup Date */}
          <View className="flex-row items-center bg-surface-50 rounded-lg px-2 py-1.5">
            <Truck size={14} color="#64748b" />
            <Text className="text-surface-600 text-xs ml-1">
              {getPickedUpDate(animal)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
