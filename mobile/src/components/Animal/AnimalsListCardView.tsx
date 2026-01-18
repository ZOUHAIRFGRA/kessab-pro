import React, { useEffect } from "react";
import { View, FlatList, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ShoppingCart } from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import AnimalCardView from "./AnimalCardView";
import Loading from "../global/Loading";
import FallBack, { FALLBACK_TYPE } from "../global/Fallback";
import {
  getAnimalsByBuyer,
  getAnimalsBySale,
} from "../../features/animalSlice";
import type { RootState, AppDispatch } from "../../store/store";
import "../../../global.css";

interface AnimalsListCardViewProps {
  id: string; // UUID
  type?: "sale" | "buyer";
}

export default function AnimalsListCardView({
  id,
  type = "sale",
}: AnimalsListCardViewProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (type === "sale") {
      dispatch(getAnimalsBySale(id));
    }

    if (type === "buyer") {
      dispatch(getAnimalsByBuyer(id));
    }
  }, [dispatch, id, type]);

  const { animals, loading, error } = useSelector(
    (state: RootState) => state.animals
  );

  if (loading || !animals) return <Loading />;
  if (error) return <FallBack type={FALLBACK_TYPE.ERROR} />;

  return (
    <View className="flex-1 bg-surface-50">
      {/* Header */}
      <LinearGradient
        colors={["#334e68", "#243b53"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingHorizontal: 24, paddingTop: 48, paddingBottom: 24 }}
      >
        <View className="flex-row items-center gap-3">
          <View className="bg-white/20 rounded-full p-3">
            <ShoppingCart size={24} color="#ffffff" strokeWidth={2} />
          </View>
          <View className="flex-1">
            <Text className="text-white text-2xl font-bold">
              {t("common.Purchases")}
            </Text>
            <Text className="text-white/80 text-sm mt-1">
              {animals.length} {t("common.animals")}
            </Text>
          </View>
        </View>
      </LinearGradient>

      <View className="flex-1 px-4 py-4">
      {animals.length === 0 ? (
        <FallBack
          type={FALLBACK_TYPE.NOT_FOUND}
          message={t("common.noAnimalsFound")}
        />
      ) : (
        <FlatList
          data={animals}
          keyExtractor={(animal: any) => animal.id.toString()}
          ItemSeparatorComponent={() => <View className="h-3" />}
          renderItem={({ item }) => <AnimalCardView animal={item} />}
          showsVerticalScrollIndicator={false}
        />
      )}
      </View>
    </View>
  );
}
