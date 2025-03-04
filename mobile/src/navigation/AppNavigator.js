import React, { useCallback, useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import ManagementScreen from "../screens/ManagementScreen";
import FoodScreen from "../screens/FoodScreen";
import MarketplaceScreen from "../screens/MarketplaceScreen";
import DashboardScreen from "../screens/DashboardScreen";
import QRScannerScreen from "../screens/QRScannerScreen";
import BuyersListScreen from "../screens/buyer/BuyersScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CustomHeader from "../components/CustomHeader";
import SalesScreen from "../screens/sale/SalesScreen";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "dripsy";

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  const { t, i18n } = useTranslation();
  const [rtl, setRtl] = useState(t("dir") === "rtl");

  useEffect(() => {
    setRtl(t("dir") === "rtl");
  }, [t("dir")]);


  return rtl ? <RightDrawer /> : <LeftDrawer />;
}

const DrawerItemLabel = ({ label, icon }) => (
  <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
    {icon}
    <Text style={{ marginLeft: 10 }}>{label}</Text>
  </View>
);

function LeftDrawer() {
  return <DrawerNavigator drawerPosition="left" />;
}

function RightDrawer() {
  return <DrawerNavigator drawerPosition="right" />;
}

function DrawerNavigator({ drawerPosition }) {
  const { t } = useTranslation();
  return (
    <Drawer.Navigator
      screenOptions={{
        header: (props) => <CustomHeader {...props} />,
        drawerPosition,
        drawerType: "slide",
        drawerStyle: {
          backgroundColor: "#ffffff",
          width: 260,

          elevation: 10,
        },
        drawerLabelStyle: {
          fontSize: 18,
          fontWeight: "500",
        },
        drawerActiveBackgroundColor: "#007AFF",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#333",
        drawerItemStyle: { marginVertical: 8, borderRadius: 10, padding: 5 },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerLabel: () => (
            <DrawerItemLabel
              label={t("common.HomePage")}
              icon={<Ionicons name="home-outline" size={20} />}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Management"
        component={ManagementScreen}
        options={{
          drawerLabel: () => (
            <DrawerItemLabel
              label={t("common.management")}
              icon={<Ionicons name="settings-outline" size={20} />}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Sales"
        component={SalesScreen}
        options={{
          drawerLabel: () => (
            <DrawerItemLabel
              label={t("common.sales")}
              icon={<Ionicons name="cash-outline" size={20} />}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Food"
        component={FoodScreen}
        options={{
          drawerLabel: () => (
            <DrawerItemLabel
              label={t("common.food")}
              icon={<Ionicons name="fast-food-outline" size={20} />}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Marketplace"
        component={MarketplaceScreen}
        options={{
          drawerLabel: () => (
            <DrawerItemLabel
              label={t("common.marketplace")}
              icon={<Ionicons name="cart-outline" size={20} />}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          drawerLabel: () => (
            <DrawerItemLabel
              label={t("common.dashboard")}
              icon={<Ionicons name="grid-outline" size={20} />}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="QRScanner"
        component={QRScannerScreen}
        options={{
          drawerLabel: () => (
            <DrawerItemLabel
              label={t("common.QRscanner")}
              icon={<Ionicons name="scan-outline" size={20} />}
            />
          ),
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerLabel: () => (
            <DrawerItemLabel
              label={t("common.Profile")}
              icon={<Ionicons name="person-outline" size={20} />}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="BuyersList"
        component={BuyersListScreen}
        options={{
          drawerLabel: () => (
            <DrawerItemLabel
              label={t("common.buyersList")}
              icon={<Ionicons name="people-outline" size={20} />}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
