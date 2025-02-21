import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Colors from "../../utils/Colors";
import SaleInfoView from "../../components/sale/SaleInfoView";
import BuyerInfoView from "../../components/buyer/BuyerInfoView";
import TransactionsListCardView from "../../components/transaction/TransactionsListCardView";
import AnimalsListCardView from "../../components/Animal/AnimalsListCardView";
import Container from "../../components/global/Container";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FallBack from "../../components/global/Fallback";

const SaleDetailScreen = ({ route }) => {
  const Tab = createBottomTabNavigator();
  const sale = route.params?.sale;

  if (!sale) return <FallBack />;

  return (
    <Container sx={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 60,
            backgroundColor: Colors.secondary,
          },
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.white,
          tabBarLabelStyle: { fontSize: 13, fontWeight: "bold" },
          tabBarPosition: "top",
          animation: "shift",
        }}
      >
        <Tab.Screen
          name="saleInfo"
          options={{
            tabBarLabel: "Info ",
            tabBarIcon: ({ color }) => (
              <Ionicons name="information-outline" size={22} color={color} />
            ),
          }}
        >
          {() => <SaleInfoView id={sale.id} />}
        </Tab.Screen>

        <Tab.Screen
          name="buyerInfo"
          options={{
            tabBarLabel: "Buyer ",
            tabBarIcon: ({ color }) => (
              <Ionicons name="person-outline" size={22} color={color} />
            ),
          }}
        >
          {() => <BuyerInfoView id={sale.buyer?.id} />}
        </Tab.Screen>

        <Tab.Screen
          name="animalList"
          options={{
            tabBarLabel: "Animals",
            tabBarIcon: ({ color }) => (
              <Ionicons name="cart-outline" size={22} color={color} />
            ),
          }}
        >
          {() => (
            <Container sx={{ flex: 1, gap: 16 }}>
              <AnimalsListCardView id={sale.id} type={"sale"} />
            </Container>
          )}
        </Tab.Screen>

        <Tab.Screen
          name="transactions"
          options={{
            tabBarLabel: "Transactions",
            tabBarIcon: ({ color }) => (
              <Ionicons name="pricetags-outline" size={22} color={color} />
            ),
          }}
        >
          {() => (
            <Container sx={{ flex: 1, gap: 16, padding: 16 }}>
              <TransactionsListCardView id={sale.id} type={"sale"} />
            </Container>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </Container>
  );
};

export default SaleDetailScreen;
