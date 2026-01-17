import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useTranslation } from "react-i18next";
import {
  Home,
  Settings,
  DollarSign,
  LayoutDashboard,
  Layers,
  QrCode,
  Store,
  User,
  Users,
} from "lucide-react-native";

// Screens
import HomeScreen from "../screens/HomeScreen";
import ManagementScreen from "../screens/ManagementScreen";
import MarketplaceScreen from "../screens/MarketplaceScreen";
import DashboardScreen from "../screens/DashboardScreen";
import QRScannerScreen from "../screens/QRScannerScreen";
import BuyersScreen from "../screens/buyer/BuyersScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SalesScreen from "../screens/sale/SalesScreen";
import CategoryScreen from "../screens/CategoryScreen";

// Components
import CustomHeader from "../components/CustomHeader";

const Drawer = createDrawerNavigator();

type DrawerItemLabelProps = {
  label: string;
  icon: React.ReactNode;
};

const DrawerItemLabel = ({ label, icon }: DrawerItemLabelProps) => (
  <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
    {icon}
    <Text style={{ marginLeft: 12, fontSize: 15, fontWeight: "500", color: "#334e68" }}>
      {label}
    </Text>
  </View>
);

function DrawerNavigator({ drawerPosition }: { drawerPosition: "left" | "right" }) {
  const { t } = useTranslation();

  return (
    <Drawer.Navigator
      screenOptions={{
        header: (props) => <CustomHeader {...props} />,
        drawerPosition,
        drawerType: "slide",
        drawerStyle: {
          backgroundColor: "#ffffff",
          width: 280,
          elevation: 10,
        },
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: "500",
        },
        drawerActiveBackgroundColor: "#f59e0b20",
        drawerActiveTintColor: "#f59e0b",
        drawerInactiveTintColor: "#334e68",
        drawerItemStyle: {
          marginVertical: 4,
          marginHorizontal: 8,
          borderRadius: 12,
          paddingVertical: 2,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          drawerLabel: () => (
            <DrawerItemLabel
              label={t("common.HomePage")}
              icon={<Home size={20} color="#627d98" />}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Management"
        component={ManagementScreen}
        options={{
          headerShown: false,
          drawerLabel: () => (
            <DrawerItemLabel
              label={t("common.management")}
              icon={<Settings size={20} color="#627d98" />}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Sales"
        component={SalesScreen}
        options={{
          headerShown: false,
          drawerLabel: () => (
            <DrawerItemLabel
              label={t("common.sales")}
              icon={<DollarSign size={20} color="#627d98" />}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          headerShown: false,
          drawerLabel: () => (
            <DrawerItemLabel
              label={t("common.dashboard")}
              icon={<LayoutDashboard size={20} color="#627d98" />}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          headerShown: false,
          drawerLabel: () => (
            <DrawerItemLabel
              label={t("common.categories")}
              icon={<Layers size={20} color="#627d98" />}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="QRScanner"
        component={QRScannerScreen}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          drawerLabel: () => (
            <DrawerItemLabel
              label={t("common.QRscanner")}
              icon={<QrCode size={20} color="#627d98" />}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Marketplace"
        component={MarketplaceScreen}
        options={{
          headerShown: false,
          drawerLabel: () => (
            <DrawerItemLabel
              label={t("common.marketplace")}
              icon={<Store size={20} color="#627d98" />}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          drawerLabel: () => (
            <DrawerItemLabel
              label={t("common.Profile")}
              icon={<User size={20} color="#627d98" />}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="BuyersList"
        component={BuyersScreen}
        options={{
          headerShown: false,
          drawerLabel: () => (
            <DrawerItemLabel
              label={t("common.buyersList")}
              icon={<Users size={20} color="#627d98" />}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  const { t } = useTranslation();
  const [rtl, setRtl] = useState(t("dir") === "rtl");

  useEffect(() => {
    setRtl(t("dir") === "rtl");
  }, [t]);

  return rtl ? (
    <DrawerNavigator drawerPosition="right" />
  ) : (
    <DrawerNavigator drawerPosition="left" />
  );
}
