import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AnimalDetailsTab } from "../components/AnimalDetailsComponents/AnimalDetailsTab";
import { MedicalLogsTab } from "../components/AnimalDetailsComponents/MedicalLogsTab";
import { ActivityLogsTab } from "../components/AnimalDetailsComponents/ActivityLogsTab";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler"; 

const Tab = createBottomTabNavigator();

const AnimalDetailsScreen = ({ route }) => {
  const { animalId } = route.params;

  return (
    <GestureHandlerRootView style={{ flex: 1 }} >
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
              iconName = focused ? "barbell" : "barbell-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#4CAF50",
          tabBarInactiveTintColor: "#999",
          tabBarStyle: {
            height: 75, 
            borderTopWidth: 1,
            borderTopColor: "#ddd",
          },
          tabBarLabelStyle: { fontSize: 12, fontWeight: "bold" },
          tabBarPosition: "top",
          headerShown: false,
          animation: "shift",
        })}
      >
        <Tab.Screen name="Details">
          {() => <AnimalDetailsTab animalId={animalId} />}
        </Tab.Screen>
        <Tab.Screen name="Medical Logs">
          {() => <MedicalLogsTab animalId={animalId} />}
        </Tab.Screen>
        <Tab.Screen name="Activity Logs">
          {() => <ActivityLogsTab animalId={animalId} />}
        </Tab.Screen>
      </Tab.Navigator>
    </GestureHandlerRootView>
  );
};

export default AnimalDetailsScreen;
