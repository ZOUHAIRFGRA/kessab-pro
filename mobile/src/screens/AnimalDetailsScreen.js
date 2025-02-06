import React, { useEffect } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAnimalMedicalLogs } from "../features/animalMedicalLogSlice";
import { getAnimalActivitiesLogs } from "../features/animalActivitiesLogSlice";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { getBaseURL } from "../api/axiosInstance";

const Tab = createMaterialTopTabNavigator();

const AnimalDetailsScreen = ({ route }) => {
  const { animal } = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAnimalMedicalLogs(animal.id));
    dispatch(getAnimalActivitiesLogs(animal.id));
  }, [dispatch, animal.id]);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Details">
        {() => (
          <ScrollView style={{ padding: 16 }}>
            <Image
              source={{ uri: `${getBaseURL()}${animal.imagePaths}` }}
              style={{ width: "100%", height: 200, borderRadius: 8 }}
            />
            <Text>Tag: {animal.tag}</Text>
            <Text>Sex: {animal.sex}</Text>
            <Text>Birth Date: {animal.birthDate}</Text>
            <Text>Price: {animal.price}</Text>
            <Text>Weight: {animal.weight}</Text>
            <Text>Category: {animal.category.typeName}</Text>
          </ScrollView>
        )}
      </Tab.Screen>
      <Tab.Screen name="Medical Logs" component={MedicalLogsScreen} />
      <Tab.Screen name="Activity Logs" component={ActivityLogsScreen} />
    </Tab.Navigator>
  );
};

const MedicalLogsScreen = () => {
  const { medicalLogs, loading } = useSelector(
    (state) => state.animalMedicalLogs
  );
  if (loading) return <Text>Loading medical logs...</Text>;

  console.log('medical logs',medicalLogs)

  return (
    <ScrollView>
      {medicalLogs.length > 0 ? (
        medicalLogs.map((log) => (
          <View key={log.id} style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>
              {log.logDate} - {log.description} (Vet: {log.vetName})
            </Text>
          </View>
        ))
      ) : (
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <MaterialIcons name="error-outline" size={50} color="gray" />
          <Text>No medical logs found.</Text>
        </View>
      )}
    </ScrollView>
  );
};

const ActivityLogsScreen = () => {
  const { activitiesLogs, loading } = useSelector(
    (state) => state.animalActivitiesLogs
  );
  if (loading) return <Text>Loading activity logs...</Text>;

  return (
    <ScrollView>
      {activitiesLogs.length > 0 ? (
        activitiesLogs.map((log) => (
          <View key={log.id} style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>
              {log.logDate} - {log.activity}
            </Text>
          </View>
        ))
      ) : (
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <MaterialIcons name="error-outline" size={50} color="gray" />
          <Text>No activity logs found.</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default AnimalDetailsScreen;
