import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Search,
  Plus,
  Calendar,
  Filter,
  X,
  ArrowLeft,
  ChevronRight,
} from "lucide-react-native";
import SalesListCardView from "../../components/sale/SalesListCardView";
import { getSales } from "../../features/saleSlice";
import { fetchPaymentStatus } from "../../features/enumSlice";
import { fetchCategories } from "../../features/categorySlice";
import { Pagination } from "../../components/global/Pagination";
import { formatDateToLocalDate } from "../../utils/Global";
import type { RootState, AppDispatch } from "../../store/store";
import "../../../global.css";

export default function SalesScreen() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<any>();
  const isRTL = t("dir") === "rtl";

  const [fullNameFilter, setFullNameFilter] = useState("");
  const [categoryIdFilter, setCategoryIdFilter] = useState("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("");
  const [saleDate, setSaleDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isQuantityModalVisible, setQuantityModalVisible] = useState(false);
  const [quantity, setQuantity] = useState("1");

  const { totalPages } = useSelector((state: RootState) => state.sales);
  const { paymentStatus } = useSelector((state: RootState) => state.enums);
  const { categories } = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    if (categories.length < 1) dispatch(fetchCategories());
    if (paymentStatus.length < 1) dispatch(fetchPaymentStatus());
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setPaymentStatusFilter("");
        setCategoryIdFilter("");
        setFullNameFilter("");
        setSaleDate("");
      };
    }, [])
  );

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (event.type === "dismissed") {
      setSaleDate("");
    } else if (selectedDate) {
      setSaleDate(formatDateToLocalDate(selectedDate));
      setDate(selectedDate);
    }
  };

  const getNextPage = (page: number) => {
    dispatch(getSales({ page }));
  };

  const handleAddSale = () => {
    const qte = parseInt(quantity) || 1;
    if (qte <= 0) {
      alert(t("common.quantity_positive"));
      return;
    }
    setQuantityModalVisible(false);
    navigation.navigate("AddSale", { qte });
    setQuantity("1");
  };

  return (
    <View className="flex-1 bg-surface-50">
      {/* Header */}
      <LinearGradient colors={["#334e68", "#243b53"]} className="pt-12 pb-6 px-5">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="w-10 h-10 bg-white/10 rounded-full items-center justify-center"
          >
            <ArrowLeft size={22} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold">{t("common.sales")}</Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            className="w-10 h-10 bg-white/10 rounded-full items-center justify-center"
          >
            <Calendar size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="bg-white/10 rounded-2xl flex-row items-center px-4">
          <Search size={20} color="rgba(255,255,255,0.7)" />
          <TextInput
            placeholder={t("common.SearchByBuyerNameOrCIN")}
            value={fullNameFilter}
            onChangeText={setFullNameFilter}
            placeholderTextColor="rgba(255,255,255,0.5)"
            className={`flex-1 py-3 px-3 text-white text-base ${
              isRTL ? "text-right" : "text-left"
            }`}
          />
          {fullNameFilter.length > 0 && (
            <TouchableOpacity onPress={() => setFullNameFilter("")}>
              <X size={18} color="rgba(255,255,255,0.7)" />
            </TouchableOpacity>
          )}
        </View>

        {/* Active Date Filter */}
        {saleDate && (
          <View className="mt-3 bg-accent-500/20 rounded-xl px-4 py-2 flex-row items-center justify-between">
            <Text className="text-white text-sm">
              {t("common.filtered_by_date")}: {saleDate}
            </Text>
            <TouchableOpacity onPress={() => setSaleDate("")}>
              <X size={16} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </LinearGradient>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* Sales List */}
      <View className="flex-1 px-5 pt-4">
        <SalesListCardView
          fullNameFilter={fullNameFilter}
          categoryIdFilter={categoryIdFilter}
          paymentStatusFilter={paymentStatusFilter}
          saleDate={saleDate}
        />
      </View>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination pages={totalPages} onPageChange={getNextPage} />
      )}

      {/* Add Sale FAB */}
      <TouchableOpacity
        onPress={() => setQuantityModalVisible(true)}
        className="absolute bottom-24 right-5"
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={["#f59e0b", "#d97706"]}
          className="w-14 h-14 rounded-full items-center justify-center shadow-lg"
        >
          <Plus size={28} color="white" />
        </LinearGradient>
      </TouchableOpacity>

      {/* Quantity Modal */}
      <Modal
        visible={isQuantityModalVisible}
        animationType="slide"
        transparent
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl p-6">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-primary-800 text-xl font-bold">
                {t("common.AddNewSale")}
              </Text>
              <TouchableOpacity onPress={() => setQuantityModalVisible(false)}>
                <X size={24} color="#52525b" />
              </TouchableOpacity>
            </View>

            <Text className="text-surface-600 mb-2">
              {t("common.quantity")}
            </Text>
            <TextInput
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="number-pad"
              className="bg-surface-50 rounded-xl p-4 text-lg text-primary-900 mb-6"
              placeholder="1"
            />

            <TouchableOpacity onPress={handleAddSale} activeOpacity={0.8}>
              <LinearGradient
                colors={["#f59e0b", "#d97706"]}
                className="rounded-xl py-4 flex-row items-center justify-center"
              >
                <Text className="text-white font-semibold text-lg">
                  {t("common.continue")}
                </Text>
                <ChevronRight size={20} color="white" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
