import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AnimalDetailsTab } from "../components/AnimalDetailsComponents/AnimalDetailsTab";
import { MedicalLogsTab } from "../components/AnimalDetailsComponents/MedicalLogsTab";
import { ActivityLogsTab } from "../components/AnimalDetailsComponents/ActivityLogsTab";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler"; 
import { useTranslation } from "react-i18next";

const Tab = createBottomTabNavigator();

const AnimalDetailsScreen = ({ route }) => {
  const { t } = useTranslation();
  const { animalId } = route.params;
  const isRTL = t("dir") === "rtl";

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName="Details"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Details") {
              iconName = focused ? "information-circle" : "information-circle-outline";
            } else if (route.name === "Medical Logs") {
              iconName = focused ? "medkit" : "medkit-outline";
            } else if (route.name === "Activity Logs") {
              iconName = focused ? "stats-chart" : "stats-chart-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#4CAF50",
          tabBarInactiveTintColor: "#999",
          tabBarStyle: {
            height: 75,
            borderTopWidth: 1,
            borderTopColor: "#ddd",
            flexDirection: isRTL ? "row-reverse" : "row", 
          },
          tabBarLabelStyle: { 
            fontSize: 12, 
            fontWeight: "bold", 
            textAlign: "center", 
            writingDirection: isRTL ? "rtl" : "ltr", 
          },
          tabBarPosition: "top",
          headerShown: false,
          animation: "shift",
        })}
      >
        <Tab.Screen 
          name="Details"
          options={{ title: t("common.details") }}
        >
          {() => <AnimalDetailsTab animalId={animalId}  />}
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
};

export default AnimalDetailsScreen;
