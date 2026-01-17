import React from "react";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight } from "lucide-react-native";

// Auth Screens
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";

// Main Navigator
import AppNavigator from "./AppNavigator";

// Screens
import AnimalDetailsScreen from "../screens/AnimalDetailsScreen";
import AnimalsList from "../components/AnimalsList";
import HomeScreen from "../screens/HomeScreen";

// Sale Screens
import SalesScreen from "../screens/sale/SalesScreen";
import SaleDetailScreen from "../screens/sale/SaleDetailScreen";
import AddSaleScreen from "../screens/sale/AddSaleScreen";

// Buyer Screens
import BuyersScreen from "../screens/buyer/BuyersScreen";
import BuyerDetailScreen from "../screens/buyer/BuyerDetailScreen";
import AddBuyerScreen from "../screens/buyer/AddBuyerScreen";
import UpdateBuyerScreen from "../screens/buyer/UpdateBuyerScreen";

// Components
import AddTransaction from "../components/AddTransaction";

import type { RootState } from "../store/store";

const Stack = createStackNavigator();

export default function RootNavigator() {
  const { t } = useTranslation();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const isRTL = t("dir") === "rtl";

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: "#334e68",
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "600",
            fontSize: 18,
          },
          headerTitleAlign: "center",
          headerLeft: () =>
            isRTL ? null : (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  marginLeft: 16,
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ArrowLeft size={20} color="#fff" />
              </TouchableOpacity>
            ),
          headerRight: () =>
            isRTL ? (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  marginRight: 16,
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ArrowRight size={20} color="#fff" />
              </TouchableOpacity>
            ) : null,
        })}
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
              options={{ title: t("common.BuyerInfo") }}
              component={BuyersScreen}
            />
            <Stack.Screen
              name="AddTransaction"
              options={{ title: t("common.AddTransaction") }}
              component={AddTransaction}
            />
            <Stack.Screen
              name="AnimalDetails"
              options={{ headerShown: false }}
              component={AnimalDetailsScreen}
            />
            <Stack.Screen
              name="AnimalsList"
              options={{ title: t("common.AnimalsList") }}
              component={AnimalsList}
            />
            <Stack.Screen
              name="HomeScreen"
              options={{ headerShown: false }}
              component={HomeScreen}
            />
            <Stack.Screen
              name="SellDetail"
              options={{ headerShown: false }}
              component={SaleDetailScreen}
            />
            <Stack.Screen
              name="buyerDetail"
              options={{ headerShown: false }}
              component={BuyerDetailScreen}
            />
            <Stack.Screen
              name="Sales"
              options={{ headerShown: false }}
              component={SalesScreen}
            />
            <Stack.Screen
              name="addBuyerScreen"
              options={{ headerShown: false }}
              component={AddBuyerScreen}
            />
            <Stack.Screen
              name="updateBuyerScreen"
              options={{ headerShown: false }}
              component={UpdateBuyerScreen}
            />
            <Stack.Screen
              name="AddSale"
              options={{ title: t("common.AddSale") }}
              component={AddSaleScreen}
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
