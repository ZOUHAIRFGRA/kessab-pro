import React, { useCallback, useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Colors from "../../utils/Colors";
import SaleInfoView from "../../components/sale/SaleInfoView";
import BuyerInfoView from "../../components/buyer/BuyerInfoView";
import TransactionsListCardView from "../../components/transaction/TransactionsListCardView";
import AnimalsListCardView from "../../components/Animal/AnimalsListCardView";
import Container from "../../components/global/Container";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import SalesListCardView from "../../components/sale/SalesListCardView";
import Button from "../../components/global/Button";
import { useNavigation } from "@react-navigation/native";

const BuyerDetailScreen = ({ route }) => {
  const { t } = useTranslation();
  const Tab = createBottomTabNavigator();
  const navigator = useNavigation();
  const buyerId = route.params?.buyerId;

  return (
    <Container sx={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,

          tabBarStyle: {
            height: 65,
            backgroundColor: Colors.secondaryLight,
          },
          tabBarActiveTintColor: Colors.secondary,
          tabBarInactiveTintColor: Colors.primary,
          tabBarLabelStyle: { fontSize: 13, fontWeight: "bold" },
          tabBarPosition: "top",
          animation: "shift",
        }}
      >
        <Tab.Screen
          name="buyerInfo"
          options={{
            tabBarLabel: t("common.Info"),
            tabBarIcon: ({ color }) => (
              <Ionicons name="person-outline" size={22} color={color} />
            ),
          }}
        >
          {() => (
            <>
              <BuyerInfoView id={buyerId} hideLinkButton />
              <Container
                sx={{
                  padding: 8,
                }}
              >
                <Button
                  type="primary"
                  onPress={() => {
                    navigator.navigate("updateBuyerScreen", { buyerId });
                  }}
                  style={{
                    padding: 12,
                    marginTop: 20,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  textStyle={{
                    color: Colors.white,
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: 16,
                  }}
                  icon={{
                    name: "edit",
                    color: Colors.white,
                  }}
                >
                  {t("common.Update")}
                </Button>
              </Container>
            </>
          )}
        </Tab.Screen>

        <Tab.Screen
          name="animalList"
          options={{
            tabBarLabel: t("common.Purchases"),
            tabBarIcon: ({ color }) => (
              <Ionicons name="cart-outline" size={22} color={color} />
            ),
          }}
        >
          {() => (
            <Container sx={{ flex: 1, gap: 16 }}>
              <AnimalsListCardView id={buyerId} type={"buyer"} />
            </Container>
          )}
        </Tab.Screen>

        <Tab.Screen
          name="sales"
          options={{
            tabBarLabel: t("common.sales"),
            tabBarIcon: ({ color }) => (
              <Ionicons name="pricetags-outline" size={22} color={color} />
            ),
          }}
        >
          {() => (
            <Container sx={{ flex: 1, gap: 16, padding: 16 }}>
              <SalesListCardView id={buyerId} type={"buyer"} />
            </Container>
          )}
        </Tab.Screen>
        <Tab.Screen
          name="transactions"
          options={{
            tabBarLabel: t("common.Transactions"),
            tabBarIcon: ({ color }) => (
              <Ionicons name="pricetags-outline" size={22} color={color} />
            ),
          }}
        >
          {() => (
            <Container sx={{ flex: 1, gap: 16, padding: 16 }}>
              <TransactionsListCardView id={buyerId} type={"buyer"} />
            </Container>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </Container>
  );
};

export default BuyerDetailScreen;
