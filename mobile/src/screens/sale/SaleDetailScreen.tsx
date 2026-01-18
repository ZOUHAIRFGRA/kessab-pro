import React from "react";
import { View, ActivityIndicator } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";
import { Info, User, ShoppingCart, Receipt } from "lucide-react-native";
import SaleInfoView from "../../components/sale/SaleInfoView";
import BuyerInfoView from "../../components/buyer/BuyerInfoView";
import TransactionsListCardView from "../../components/transaction/TransactionsListCardView";
import AnimalsListCardView from "../../components/Animal/AnimalsListCardView";
import FallBack from "../../components/global/Fallback";
import { useGetSaleByIdQuery } from "../../services";
import "../../../global.css";

const Tab = createBottomTabNavigator();

type SaleDetailScreenProps = {
  route: {
    params: {
      saleId: string; // UUID string
    };
  };
};

export default function SaleDetailScreen({ route }: SaleDetailScreenProps) {
  const { t } = useTranslation();
  const isRTL = t("dir") === "rtl";
  const saleId = route.params?.saleId;

  const { data: sale, isLoading, isError } = useGetSaleByIdQuery(saleId, {
    skip: !saleId,
  });

  if (isLoading) {
    return (
      <View className="flex-1 bg-surface-50 items-center justify-center">
        <ActivityIndicator size="large" color="#334e68" />
      </View>
    );
  }

  if (isError || !saleId || !sale) {
    return <FallBack />;
  }

  return (
    <View className="flex-1 bg-surface-50">
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 80,
            paddingTop: 8,
            paddingBottom: 20,
            backgroundColor: "#ffffff",
            borderTopWidth: 1,
            borderTopColor: "#e4e4e7",
            flexDirection: isRTL ? "row-reverse" : "row",
          },
          tabBarActiveTintColor: "#f59e0b",
          tabBarInactiveTintColor: "#627d98",
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "600",
            marginTop: 4,
          },
        }}
      >
        <Tab.Screen
          name="saleInfo"
          options={{
            tabBarLabel: t("common.Info"),
            tabBarIcon: ({ color, size }) => <Info size={size} color={color} />,
          }}
        >
          {() => <SaleInfoView id={sale.id} />}
        </Tab.Screen>

        <Tab.Screen
          name="buyerInfo"
          options={{
            tabBarLabel: t("common.Buyer"),
            tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
          }}
        >
          {() => sale.buyer?.id ? <BuyerInfoView id={sale.buyer.id} /> : <FallBack />}
        </Tab.Screen>

        <Tab.Screen
          name="animalList"
          options={{
            tabBarLabel: t("common.Purchases"),
            tabBarIcon: ({ color, size }) => (
              <ShoppingCart size={size} color={color} />
            ),
          }}
        >
          {() => (
            <View style={{ flex: 1, gap: 16 }}>
              <AnimalsListCardView id={sale.id} type="sale" />
            </View>
          )}
        </Tab.Screen>

        <Tab.Screen
          name="transactions"
          options={{
            tabBarLabel: t("common.Transactions"),
            tabBarIcon: ({ color, size }) => (
              <Receipt size={size} color={color} />
            ),
          }}
        >
          {() => <TransactionsListCardView id={sale.id} type="sale" />}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
}
