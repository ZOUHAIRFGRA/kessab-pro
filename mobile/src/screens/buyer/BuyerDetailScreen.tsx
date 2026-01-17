import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";
import {
  User,
  BarChart3,
  ShoppingCart,
  Tag,
  Receipt,
  Edit2,
} from "lucide-react-native";
import BuyerInfoView from "../../components/buyer/BuyerInfoView";
import BuyerOverviewView from "../../components/buyer/BuyerOverviewView";
import AnimalsListCardView from "../../components/Animal/AnimalsListCardView";
import SalesListCardView from "../../components/sale/SalesListCardView";
import TransactionsListCardView from "../../components/transaction/TransactionsListCardView";
import Container from "../../components/global/Container";
import "../../../global.css";

const Tab = createBottomTabNavigator();

type BuyerDetailScreenProps = {
  route: {
    params: {
      buyerId: number;
    };
  };
};

export default function BuyerDetailScreen({ route }: BuyerDetailScreenProps) {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const isRTL = t("dir") === "rtl";
  const buyerId = route.params?.buyerId;

  return (
    <View className="flex-1 bg-surface-50">
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 75,
            paddingTop: 6,
            paddingBottom: 16,
            backgroundColor: "#ffffff",
            borderTopWidth: 1,
            borderTopColor: "#e4e4e7",
            flexDirection: isRTL ? "row-reverse" : "row",
          },
          tabBarActiveTintColor: "#f59e0b",
          tabBarInactiveTintColor: "#627d98",
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "600",
            marginTop: 2,
          },
          animation: "shift",
        }}
      >
        <Tab.Screen
          name="buyerInfo"
          options={{
            tabBarLabel: t("common.Info"),
            tabBarIcon: ({ color, size }) => <User size={size - 2} color={color} />,
          }}
        >
          {() => (
            <View className="flex-1">
              <BuyerInfoView id={buyerId} hideLinkButton />
              <View className="px-4 pb-4">
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("updateBuyerScreen", { buyerId })
                  }
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={["#f59e0b", "#d97706"]}
                    className="rounded-xl py-3 flex-row items-center justify-center"
                  >
                    <Edit2 size={18} color="white" />
                    <Text className="text-white font-semibold ml-2">
                      {t("common.Update")}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Tab.Screen>

        <Tab.Screen
          name="buyerOverview"
          options={{
            tabBarLabel: t("common.stats"),
            tabBarIcon: ({ color, size }) => (
              <BarChart3 size={size - 2} color={color} />
            ),
          }}
        >
          {() => <BuyerOverviewView id={buyerId} />}
        </Tab.Screen>

        <Tab.Screen
          name="animalList"
          options={{
            tabBarLabel: t("common.Purchases"),
            tabBarIcon: ({ color, size }) => (
              <ShoppingCart size={size - 2} color={color} />
            ),
          }}
        >
          {() => (
            <Container sx={{ flex: 1, gap: 16 }}>
              <AnimalsListCardView id={buyerId} type="buyer" />
            </Container>
          )}
        </Tab.Screen>

        <Tab.Screen
          name="sales"
          options={{
            tabBarLabel: t("common.sales"),
            tabBarIcon: ({ color, size }) => <Tag size={size - 2} color={color} />,
          }}
        >
          {() => (
            <Container sx={{ flex: 1, gap: 16, padding: 16 }}>
              <SalesListCardView id={buyerId} type="buyer" />
            </Container>
          )}
        </Tab.Screen>

        <Tab.Screen
          name="transactions"
          options={{
            tabBarLabel: t("common.Transactions"),
            tabBarIcon: ({ color, size }) => (
              <Receipt size={size - 2} color={color} />
            ),
          }}
        >
          {() => (
            <Container sx={{ flex: 1, gap: 16, padding: 16 }}>
              <TransactionsListCardView id={buyerId} type="buyer" />
            </Container>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
}
