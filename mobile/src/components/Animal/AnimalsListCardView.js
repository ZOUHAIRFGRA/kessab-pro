import React, { useCallback, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { styled } from "dripsy";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../global/Loading";
import FallBack, { FALLBACK_TYPE } from "../global/Fallback";
import Container from "../global/Container";
import AnimalCardView from "./AnimalCardView";
import {
  getAnimalsByBuyer,
  getAnimalsBySale,
  resetAnimals,
} from "../../features/animalSlice";
import { useFocusEffect } from "@react-navigation/native";

export default function AnimalsListCardView({ id, type = "sale" }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "sale") {
      dispatch(getAnimalsBySale(id));
    }

    if (type === "buyer") {
      dispatch(getAnimalsByBuyer(id));
    }
  }, [dispatch, id]);

  const { animals, loading, error } = useSelector(({ animals }) => animals);


  if (loading || !animals) return <Loading />;
  if (error) return <FallBack type={FALLBACK_TYPE.ERROR} />;

  return (
    <Container style={{ flex: 1, padding: 18 }}>
      {animals.length === 0 ? (
        <FallBack type={FALLBACK_TYPE.NOT_FOUND} message="No Animals found ." />
      ) : (
        <FlatList
          data={animals}
          keyExtractor={(animal) => animal.id.toString()}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          renderItem={({ item }) => <AnimalCardView animal={item} />}
        />
      )}
    </Container>
  );
}
