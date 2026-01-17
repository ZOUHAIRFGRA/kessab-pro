import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import { Info, Stethoscope, Activity } from "lucide-react-native";
import { AnimalDetailsTab } from "../components/AnimalDetailsComponents/AnimalDetailsTab";
import { MedicalLogsTab } from "../components/AnimalDetailsComponents/MedicalLogsTab";
import { ActivityLogsTab } from "../components/AnimalDetailsComponents/ActivityLogsTab";
import "../../global.css";

const Tab = createBottomTabNavigator();

type AnimalDetailsScreenProps = {
  route: {
    params: {
      animalId: number;
    };
  };
};

export default function AnimalDetailsScreen({ route }: AnimalDetailsScreenProps) {
  const { t } = useTranslation();
  const { animalId } = route.params;
  const isRTL = t("dir") === "rtl";

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName="Details"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === "Details") {
              return <Info size={size} color={color} />;
            } else if (route.name === "Medical Logs") {
              return <Stethoscope size={size} color={color} />;
            } else if (route.name === "Activity Logs") {
              return <Activity size={size} color={color} />;
            }
            return null;
          },
          tabBarActiveTintColor: "#f59e0b",
          tabBarInactiveTintColor: "#627d98",
          tabBarStyle: {
            height: 80,
            paddingTop: 8,
            paddingBottom: 20,
            backgroundColor: "#ffffff",
            borderTopWidth: 1,
            borderTopColor: "#e4e4e7",
            flexDirection: isRTL ? "row-reverse" : "row",
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
            marginTop: 4,
          },
          tabBarItemStyle: {
            paddingVertical: 4,
          },
          headerShown: false,
          animation: "shift",
        })}
      >
        <Tab.Screen
          name="Details"
          options={{ title: t("common.details") }}
        >
          {() => <AnimalDetailsTab animalId={animalId} />}
        </Tab.Screen>
        <Tab.Screen
          name="Medical Logs"
          options={{ title: t("common.medical_logs") }}
        >
          {() => <MedicalLogsTab animalId={animalId} />}
        </Tab.Screen>
        <Tab.Screen
          name="Activity Logs"
          options={{ title: t("common.activity_logs") }}
        >
          {() => <ActivityLogsTab animalId={animalId} />}
        </Tab.Screen>
      </Tab.Navigator>
    </GestureHandlerRootView>
  );
}
