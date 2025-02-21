import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import ManagementScreen from "../screens/ManagementScreen";
import SalesScreen from "../screens/SalesScreen";
import MySellsScreen from "../screens/sell/SalesScreen";
import FoodScreen from "../screens/FoodScreen";
import MarketplaceScreen from "../screens/MarketplaceScreen";
import DashboardScreen from "../screens/DashboardScreen";
import QRScannerScreen from "../screens/QRScannerScreen";
import BuyersListScreen from "../screens/BuyersListScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CustomHeader from "../components/CustomHeader";
import AnimalsList from "../components/AnimalsList";
import SellsScreen from "../screens/sell/SalesScreen";
import SellDetailScreen from "../screens/sell/SaleDetailScreen";

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        header: (props) => <CustomHeader {...props} />,
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Management" component={ManagementScreen} />
      {/* <Drawer.Screen name="Sales" component={MySellsScreen} /> */}
      <Drawer.Screen name="Sales" component={SellsScreen} />
      {/* <Drawer.Screen name="AnimalsList" component={AnimalsList} /> */}

      <Drawer.Screen name="Food" component={FoodScreen} />
      <Drawer.Screen name="Marketplace" component={MarketplaceScreen} />
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="QRScanner" component={QRScannerScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="BuyersList" component={BuyersListScreen} />
    </Drawer.Navigator>
  );
}
