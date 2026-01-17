import React, { useEffect } from "react";
import { View, FlatList } from "react-native";
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
  id: number;
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
  );
}
