import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import AppNavigator from "./AppNavigator";
import BuyerScreen from "../screens/BuyerScreen";
import AddTransaction from "../components/AddTransaction";
import AnimalDetailsScreen from "../screens/AnimalDetailsScreen";
import AnimalsList from "../components/AnimalsList";
import Colors from "../utils/Colors";
import SaleDetailScreen from "../screens/sale/SaleDetailScreen";
import SalesScreen from "../screens/SalesScreen";

const Stack = createStackNavigator();

export default function RootNavigator() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        {isAuthenticated ? (
          <>
            <Stack.Screen
              name="MainApp"
              component={AppNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Buyer"
              options={{ title: "Buyer Info" }}
              component={BuyerScreen}
            />
            <Stack.Screen name="AddTransaction" component={AddTransaction} />
            <Stack.Screen
              name="AnimalDetails"
              component={AnimalDetailsScreen}
            />
            <Stack.Screen name="AnimalsList" component={AnimalsList} />
            <Stack.Screen
              options={{ title: "Sale Info" }}
              name="SellDetail"
              component={SaleDetailScreen}
            />
            <Stack.Screen
              options={{ title: "Sale Info" }}
              name="Sales"
              component={SalesScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
