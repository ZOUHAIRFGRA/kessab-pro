import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import AppNavigator from "./AppNavigator";
import AddTransaction from "../components/AddTransaction";
import AnimalDetailsScreen from "../screens/AnimalDetailsScreen";
import AnimalsList from "../components/AnimalsList";
import Colors from "../utils/Colors";
import SaleDetailScreen from "../screens/sale/SaleDetailScreen";
import { useTranslation } from "react-i18next";
import BuyersScreen from "../screens/buyer/BuyersScreen";
import BuyerDetailScreen from "../screens/buyer/BuyerDetailScreen";
import AddSaleScreen from "../screens/sale/AddSaleScreen";
import SalesScreen from "../screens/sale/SalesScreen";
import AddBuyersScreen from "../screens/buyer/AddBuyerScreen";
import UpdateBuyersScreen from "../screens/buyer/UpdateBuyerScreen";

const Stack = createStackNavigator();
export default function RootNavigator() {
  const { t } = useTranslation();
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
              component={BuyersScreen}
            />
            <Stack.Screen name="AddTransaction" component={AddTransaction} />
            <Stack.Screen
              name="AnimalDetails"
              component={AnimalDetailsScreen}
            />
            <Stack.Screen name="AnimalsList" component={AnimalsList} />
            <Stack.Screen
              options={{ title: t("common.SaleDetail") }}
              name="SellDetail"
              component={SaleDetailScreen}
            />
            <Stack.Screen
              options={{ title: t("common.BuyerDetail") }}
              name="buyerDetail"
              component={BuyerDetailScreen}
            />
            <Stack.Screen name="Sales" component={SalesScreen} />
            <Stack.Screen name="addBuyerScreen" component={AddBuyersScreen} />
            <Stack.Screen
              name="updateBuyerScreen"
              component={UpdateBuyersScreen}
            />
            <Stack.Screen name="AddSale" component={AddSaleScreen} />
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
