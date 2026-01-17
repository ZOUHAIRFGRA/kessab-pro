import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { useDebounce } from "use-debounce";
import { useDispatch } from "react-redux";
import { resetAnimals } from "../features/animalSlice";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";
import {
  Search,
  X,
  ClipboardList,
  ShoppingCart,
  Users,
  Store,
  UserPlus,
  Layers,
  TrendingUp,
  LayoutDashboard,
  QrCode,
  UserCircle,
  Menu,
  Bell,
} from "lucide-react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import WeatherWidget from "../components/WeatherWidget";
import AddAnimalModal from "../components/AddAnimalModal";
import { useToast } from "../hooks/useToast";
import type { AppDispatch } from "../store/store";
import "../../global.css";

const { width } = Dimensions.get("window");

type GridItemType = {
  key: string;
  name: string;
  icon: React.ReactNode;
  gradient: [string, string];
};

type ActionItemType = {
  key: string;
  name: string;
  icon: React.ReactNode;
  onPress?: () => void;
};

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { showErrorToast } = useToast();
  const isRTL = t("dir") === "rtl";
  const searchInputRef = useRef<TextInput>(null);

  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText] = useDebounce(searchText, 300);
  const [isAddAnimalModalVisible, setAddAnimalModalVisible] = useState(false);

  const handleSearch = () => {
    if (debouncedSearchText.length < 3) {
      showErrorToast(t("common.search_too_short"));
      return;
    }
    dispatch(resetAnimals());
    setSearchText("");
    navigation.navigate("AnimalsList", { searchText: debouncedSearchText });
  };

  const handleSearchChange = (text: string) => setSearchText(text);
  const handleAddSheepPress = () => setAddAnimalModalVisible(true);
  const closeAddAnimalModal = () => setAddAnimalModalVisible(false);

  const gridItems: GridItemType[] = [
    {
      key: "Management",
      name: t("common.management"),
      icon: <ClipboardList size={28} color="white" />,
      gradient: ["#334e68", "#243b53"],
    },
    {
      key: "Sales",
      name: t("common.sales"),
      icon: <ShoppingCart size={28} color="white" />,
      gradient: ["#f59e0b", "#d97706"],
    },
    {
      key: "BuyersList",
      name: t("common.view_buyers"),
      icon: <Users size={28} color="white" />,
      gradient: ["#14b8a6", "#0d9488"],
    },
    {
      key: "Marketplace",
      name: t("common.marketplace"),
      icon: <Store size={28} color="white" />,
      gradient: ["#8b5cf6", "#7c3aed"],
    },
  ];

  const actions: ActionItemType[] = [
    {
      key: "addBuyerScreen",
      name: t("common.add_buyer"),
      icon: <UserPlus size={24} color="#334e68" />,
    },
    {
      key: "AddSheep",
      name: t("common.add_sheep"),
      icon: <Icon name="sheep" size={24} color="#334e68" />,
      onPress: handleAddSheepPress,
    },
    {
      key: "Category",
      name: t("common.categories"),
      icon: <Layers size={24} color="#334e68" />,
    },
    {
      key: "Sales",
      name: t("common.view_sales"),
      icon: <TrendingUp size={24} color="#334e68" />,
    },
  ];

  const bottomNavItems = [
    {
      label: t("common.dashboard"),
      route: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      label: t("common.QRscanner"),
      route: "QRScanner",
      icon: QrCode,
    },
    {
      label: t("common.profile"),
      route: "Profile",
      icon: UserCircle,
    },
  ];

  return (
    <View className="flex-1 bg-surface-50">
      {/* Header */}
      <LinearGradient
        colors={["#334e68", "#243b53"]}
        style={styles.header}
      >
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity
            onPress={() => (navigation as any).openDrawer()}
            className="w-10 h-10 bg-white/10 rounded-full items-center justify-center"
          >
            <Menu size={22} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold">Kessab Pro</Text>
          <TouchableOpacity className="w-10 h-10 bg-white/10 rounded-full items-center justify-center">
            <Bell size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="bg-white/10 rounded-2xl flex-row items-center px-4">
          <Search size={20} color="rgba(255,255,255,0.7)" />
          <TextInput
            ref={searchInputRef}
            placeholder={t("common.search_placeholder")}
            value={searchText}
            onChangeText={handleSearchChange}
            onSubmitEditing={handleSearch}
            placeholderTextColor="rgba(255,255,255,0.5)"
            className={`flex-1 py-3 px-3 text-white text-base ${
              isRTL ? "text-right" : "text-left"
            }`}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText("")}>
              <X size={18} color="rgba(255,255,255,0.7)" />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>

      <ScrollView
        className="flex-1 pt-4"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Weather Widget Area */}
        <View className="px-5 -mt-2">
          <WeatherWidget />
        </View>

        {/* Main Grid */}
        <View className="px-5 mt-6">
          <Text className="text-primary-800 text-lg font-bold mb-4">
            {t("common.Quick Access")}
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {gridItems.map((item) => (
              <TouchableOpacity
                key={item.key}
                onPress={() => navigation.navigate(item.key)}
                activeOpacity={0.85}
                className="mb-4"
                style={{ width: (width - 52) / 2 }}
              >
                <LinearGradient
                  colors={item.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.gridItem}
                >
                  <View className="w-12 h-12 bg-white/20 rounded-xl items-center justify-center">
                    {item.icon}
                  </View>
                  <Text className="text-white font-semibold text-base">
                    {item.name}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mt-4 px-5">
          <Text className="text-primary-800 text-lg font-bold mb-4">
            {t("common.Quick Actions")}
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
          >
            {actions.map((action, index) => (
              <TouchableOpacity
                key={index}
                onPress={action.onPress || (() => navigation.navigate(action.key))}
                activeOpacity={0.8}
                className="bg-white mr-3 rounded-2xl p-4 items-center shadow-sm shadow-black/5"
                style={{ width: 100 }}
              >
                <View className="w-14 h-14 bg-primary-50 rounded-xl items-center justify-center mb-3">
                  {action.icon}
                </View>
                <Text
                  className="text-primary-700 text-xs font-medium text-center"
                  numberOfLines={2}
                >
                  {action.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Stats Preview */}
        <View className="mt-6 px-5">
          <View className="bg-white rounded-2xl p-5 shadow-sm shadow-black/5">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-primary-800 text-lg font-bold">
                {t("common.Overview")}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
                <Text className="text-accent-600 text-sm font-medium">
                  {t("common.See All")}
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-between">
              <View className="items-center flex-1">
                <View className="w-12 h-12 bg-success-100 rounded-full items-center justify-center mb-2">
                  <Icon name="sheep" size={24} color="#14b8a6" />
                </View>
                <Text className="text-primary-900 text-xl font-bold">--</Text>
                <Text className="text-surface-500 text-xs">
                  {t("common.Total Animals")}
                </Text>
              </View>
              <View className="w-px bg-surface-200" />
              <View className="items-center flex-1">
                <View className="w-12 h-12 bg-accent-100 rounded-full items-center justify-center mb-2">
                  <ShoppingCart size={20} color="#f59e0b" />
                </View>
                <Text className="text-primary-900 text-xl font-bold">--</Text>
                <Text className="text-surface-500 text-xs">
                  {t("common.Sales")}
                </Text>
              </View>
              <View className="w-px bg-surface-200" />
              <View className="items-center flex-1">
                <View className="w-12 h-12 bg-info-100 rounded-full items-center justify-center mb-2">
                  <Users size={20} color="#0ea5e9" />
                </View>
                <Text className="text-primary-900 text-xl font-bold">--</Text>
                <Text className="text-surface-500 text-xs">
                  {t("common.Buyers")}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="absolute bottom-0 left-0 right-0 px-5 pb-6 pt-3 bg-surface-50">
        <View className="bg-white rounded-2xl flex-row shadow-lg shadow-black/10 p-2">
          {bottomNavItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = false; // You can implement active state logic

            return (
              <TouchableOpacity
                key={item.route}
                onPress={() => navigation.navigate(item.route)}
                className={`flex-1 items-center py-3 rounded-xl ${
                  isActive ? "bg-accent-100" : ""
                }`}
              >
                <IconComponent
                  size={24}
                  color={isActive ? "#f59e0b" : "#627d98"}
                />
                <Text
                  className={`text-xs mt-1 font-medium ${
                    isActive ? "text-accent-600" : "text-surface-500"
                  }`}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <AddAnimalModal
        visible={isAddAnimalModalVisible}
        onClose={closeAddAnimalModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 48,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  gridItem: {
    height: 112,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'space-between',
  },
});
