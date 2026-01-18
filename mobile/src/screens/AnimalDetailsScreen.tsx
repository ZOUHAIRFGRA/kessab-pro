import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import { Info, Stethoscope, Activity, ArrowLeft } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { AnimalDetailsTab } from "../components/AnimalDetailsComponents/AnimalDetailsTab";
import { MedicalLogsTab } from "../components/AnimalDetailsComponents/MedicalLogsTab";
import { ActivityLogsTab } from "../components/AnimalDetailsComponents/ActivityLogsTab";
import "../../global.css";

const Tab = createBottomTabNavigator();

type AnimalDetailsScreenProps = {
  route: {
    params: {
      animalId: string; // UUID string, not number
    };
  };
};

export default function AnimalDetailsScreen({ route }: AnimalDetailsScreenProps) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { animalId } = route.params;
  const isRTL = t("dir") === "rtl";

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
        {/* Header */}
        <LinearGradient
          colors={["#334e68", "#243b53"]}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <ArrowLeft size={22} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              {t("common.Animal Details")}
            </Text>
            <View style={{ width: 40 }} />
          </View>
        </LinearGradient>

        {/* Tabs */}
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
              elevation: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: "600",
              marginTop: 4,
            },
            tabBarItemStyle: {
              paddingVertical: 10,
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
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
