import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from "react-native";
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
  ArrowLeft,
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
            height: 80,
            paddingTop: 8,
            paddingBottom: 20,
            backgroundColor: "#ffffff",
            borderTopWidth: 0,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 10,
            flexDirection: isRTL ? "row-reverse" : "row",
          },
          tabBarActiveTintColor: "#f59e0b",
          tabBarInactiveTintColor: "#9ca3af",
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "600",
            marginTop: 4,
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
            <View className="flex-1 bg-surface-50">
              <LinearGradient
                colors={["#334e68", "#243b53"]}
                style={styles.header}
              >
                <View className="flex-row items-center justify-between">
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="w-10 h-10 bg-white/10 rounded-full items-center justify-center"
                  >
                    <ArrowLeft size={22} color="white" />
                  </TouchableOpacity>
                  <Text className="text-white text-xl font-bold">
                    {t("common.Info")}
                  </Text>
                  <View className="w-10" />
                </View>
              </LinearGradient>
              
              <ScrollView className="flex-1">
                <BuyerInfoView id={buyerId} hideLinkButton />
                <View className="px-5 pb-6 pt-4">
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("updateBuyerScreen", { buyerId })
                    }
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={["#f59e0b", "#d97706"]}
                      style={styles.updateButton}
                    >
                      <Edit2 size={20} color="white" />
                      <Text className="text-white font-semibold text-base ml-2">
                        {t("common.Update")}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </ScrollView>
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
          {() => (
            <View className="flex-1 bg-surface-50">
              <LinearGradient
                colors={["#334e68", "#243b53"]}
                style={styles.header}
              >
                <View className="flex-row items-center justify-between">
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="w-10 h-10 bg-white/10 rounded-full items-center justify-center"
                  >
                    <ArrowLeft size={22} color="white" />
                  </TouchableOpacity>
                  <Text className="text-white text-xl font-bold">
                    {t("common.stats")}
                  </Text>
                  <View className="w-10" />
                </View>
              </LinearGradient>
              <BuyerOverviewView id={buyerId} />
            </View>
          )}
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
            <View className="flex-1 bg-surface-50">
              <LinearGradient
                colors={["#334e68", "#243b53"]}
                style={styles.header}
              >
                <View className="flex-row items-center justify-between">
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="w-10 h-10 bg-white/10 rounded-full items-center justify-center"
                  >
                    <ArrowLeft size={22} color="white" />
                  </TouchableOpacity>
                  <Text className="text-white text-xl font-bold">
                    {t("common.Purchases")}
                  </Text>
                  <View className="w-10" />
                </View>
              </LinearGradient>
              <Container sx={{ flex: 1, gap: 16 }}>
                <AnimalsListCardView id={buyerId} type="buyer" />
              </Container>
            </View>
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
            <View className="flex-1 bg-surface-50">
              <LinearGradient
                colors={["#334e68", "#243b53"]}
                style={styles.header}
              >
                <View className="flex-row items-center justify-between">
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="w-10 h-10 bg-white/10 rounded-full items-center justify-center"
                  >
                    <ArrowLeft size={22} color="white" />
                  </TouchableOpacity>
                  <Text className="text-white text-xl font-bold">
                    {t("common.sales")}
                  </Text>
                  <View className="w-10" />
                </View>
              </LinearGradient>
              <Container sx={{ flex: 1, gap: 16, padding: 16 }}>
                <SalesListCardView id={buyerId} type="buyer" />
              </Container>
            </View>
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
            <View className="flex-1 bg-surface-50">
              <LinearGradient
                colors={["#334e68", "#243b53"]}
                style={styles.header}
              >
                <View className="flex-row items-center justify-between">
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="w-10 h-10 bg-white/10 rounded-full items-center justify-center"
                  >
                    <ArrowLeft size={22} color="white" />
                  </TouchableOpacity>
                  <Text className="text-white text-xl font-bold">
                    {t("common.Transactions")}
                  </Text>
                  <View className="w-10" />
                </View>
              </LinearGradient>
              <Container sx={{ flex: 1, gap: 16, padding: 16 }}>
                <TransactionsListCardView id={buyerId} type="buyer" />
              </Container>
            </View>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 48,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  updateButton: {
    borderRadius: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
});
