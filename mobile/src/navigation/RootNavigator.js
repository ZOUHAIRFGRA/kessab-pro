import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import AppNavigator from "./AppNavigator";
import AddTransaction from "../components/AddTransaction";
import AnimalDetailsScreen from "../screens/AnimalDetailsScreen";
import AnimalsList from "../components/AnimalsList";
import Colors from "../utils/Colors";
import SaleDetailScreen from "../screens/sale/SaleDetailScreen";
import { useTranslation } from "react-i18next";
import BuyersScreen from "../screens/buyer/BuyersScreen";
import BuyerDetailScreen from "../screens/buyer/BuyerDetailScreen";
import AddSaleScreen from "../screens/sale/AddSaleScreen";
import SalesScreen from "../screens/sale/SalesScreen";
import AddBuyersScreen from "../screens/buyer/AddBuyerScreen";
import UpdateBuyersScreen from "../screens/buyer/UpdateBuyerScreen";
import HomeScreen from "../screens/HomeScreen";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Stack = createStackNavigator();

export default function RootNavigator() {
  const { t } = useTranslation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isRTL = t("dir") === "rtl";

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          headerLeft: (props) =>
            isRTL ? null : (
              <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
                <Icon name="arrow-left" size={24} color="#fff" />
              </TouchableOpacity>
            ),
          headerRight: (props) =>
            isRTL ? (
              <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 10 }}>
                <Icon name="arrow-right" size={24} color="#fff" />
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
              options={{ title: t("common.AnimalDetails") }}
              component={AnimalDetailsScreen}
            />
            <Stack.Screen
              name="AnimalsList"
              options={{ title: t("common.AnimalsList") }}
              component={AnimalsList}
            />
            <Stack.Screen
              options={{ title: t("common.SaleDetail") }}
              name="HomeScreen"
              component={HomeScreen}
            />
            <Stack.Screen
              options={{ title: t("common.SaleDetail") }}
              name="SellDetail"
              component={SaleDetailScreen}
            />
            <Stack.Screen
              options={{ title: t("common.BuyerDetail") }}
              name="buyerDetail"
              component={BuyerDetailScreen}
            />
            <Stack.Screen
              name="Sales"
              options={{ title: t("common.Sales") }}
              component={SalesScreen}
            />
            <Stack.Screen
              name="addBuyerScreen"
              options={{ title: t("common.AddBuyer") }}
              component={AddBuyersScreen}
            />
            <Stack.Screen
              name="updateBuyerScreen"
              options={{ title: t("common.UpdateBuyer") }}
              component={UpdateBuyersScreen}
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