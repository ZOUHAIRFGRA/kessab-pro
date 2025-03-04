import React, { useCallback, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Colors from "../../utils/Colors";
import SaleInfoView from "../../components/sale/SaleInfoView";
import BuyerInfoView from "../../components/buyer/BuyerInfoView";
import TransactionsListCardView from "../../components/transaction/TransactionsListCardView";
import AnimalsListCardView from "../../components/Animal/AnimalsListCardView";
import Container from "../../components/global/Container";
import { Ionicons } from "@expo/vector-icons";
import FallBack from "../../components/global/Fallback";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getSale, resetSale } from "../../features/saleSlice";
import Loading from "../../components/global/Loading";
import { useFocusEffect } from "@react-navigation/native";

const SaleDetailScreen = ({ route }) => {
  const { t } = useTranslation();
  const Tab = createBottomTabNavigator();

  const saleId = route.params?.saleId;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSale(saleId));
  }, [dispatch]);

  const { sale, loading, error } = useSelector((states) => states.sales);

  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(resetSale());
      };
    }, [])
  );

  if (loading) return <Loading />;
  if (error || !saleId) return <FallBack />;

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
          tabBarInactiveTintColor: Colors.primaryLight,
          tabBarLabelStyle: { fontSize: 13, fontWeight: "bold" },
          tabBarPosition: "top",
          animation: "shift",
        }}
      >
        <Tab.Screen
          name="saleInfo"
          options={{
            tabBarLabel: t("common.Info"),
            tabBarIcon: ({ color }) => (
              <Ionicons name="information-outline" size={22} color={color} />
            ),
          }}
        >
          {() => <SaleInfoView id={sale?.id} />}
        </Tab.Screen>

        <Tab.Screen
          name="buyerInfo"
          options={{
            tabBarLabel: t("common.Buyer"),
            tabBarIcon: ({ color }) => (
              <Ionicons name="person-outline" size={22} color={color} />
            ),
          }}
        >
          {() => <BuyerInfoView id={sale?.buyer?.id} />}
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
              <AnimalsListCardView id={sale?.id} type={"sale"} />
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
              <TransactionsListCardView id={sale?.id} type={"sale"} />
            </Container>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </Container>
  );
};

export default SaleDetailScreen;
