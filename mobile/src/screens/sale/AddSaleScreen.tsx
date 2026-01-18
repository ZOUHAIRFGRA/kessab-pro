import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker from "@react-native-community/datetimepicker";
import Collapsible from "react-native-collapsible";
import {
  ArrowLeft,
  User,
  CreditCard,
  Phone,
  MapPin,
  Tag,
  DollarSign,
  Calendar,
  ChevronDown,
  ChevronUp,
  Check,
  Send,
} from "lucide-react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import {
  useGetCategoriesQuery,
  useGetBuyersQuery,
  useGetUnsoldAnimalsQuery,
  useGetPaymentMethodsQuery,
  useCreateSaleMutation,
} from "../../services";
import { formatDate, generateIndexArray } from "../../utils/Global";
import { useToast } from "../../hooks/useToast";
import "../../../global.css";

type AddSaleScreenProps = {
  route: {
    params?: {
      qte?: number;
      animalId?: number;
    };
  };
};

export default function AddSaleScreen({ route }: AddSaleScreenProps) {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const isRTL = t("dir") === "rtl";

  const { showErrorToast, showSuccessToast } = useToast();

  const qte = route.params?.qte || (route.params?.animalId ? 1 : 1);
  const initialAnimalId = route.params?.animalId;

  // RTK Query hooks
  const { data: paymentMethods = [], isLoading: loadingPaymentMethods } = useGetPaymentMethodsQuery();
  const { data: categories = [], isLoading: categoriesLoading } = useGetCategoriesQuery();
  const { data: buyersData, isLoading: buyersLoading } = useGetBuyersQuery({}, { skip: false });
  const { data: animals = [], isLoading: animalsLoading } = useGetUnsoldAnimalsQuery();
  const [createSale, { isLoading: isSubmitting }] = useCreateSaleMutation();

  const buyers = buyersData?.content || [];

  // Local state
  const [err, setErr] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateObj, setDateObj] = useState(new Date());

  // Section collapse state
  const [buyerCollapsed, setBuyerCollapsed] = useState(false);
  const [animalCollapsed, setAnimalCollapsed] = useState<boolean[]>([]);
  const [summaryCollapsed, setSummaryCollapsed] = useState(false);

  // Buyer state
  const [buyerExisting, setBuyerExisting] = useState(false);
  const [buyerFormData, setBuyerFormData] = useState({
    cin: "",
    fullName: "",
    phone: "",
    address: "",
    id: null as number | null,
  });

  // Animal state
  const [animalFormData, setAnimalFormData] = useState<any[]>([]);
  const [animalExisting, setAnimalExisting] = useState<boolean[]>([]);

  // Summary state
  const [summaryFormData, setSummaryFormData] = useState({
    saleDate: formatDate(new Date()),
    agreedAmount: "",
    paidAmount: "",
    method: "",
  });

  // Initialize
  useEffect(() => {
    if (initialAnimalId) {
      setAnimalExisting([true]);
      setAnimalFormData([{ id: initialAnimalId, price: "", isPickedUp: false }]);
      setAnimalCollapsed([false]);
    } else if (qte) {
      setAnimalCollapsed(Array(qte).fill(false));
      setAnimalFormData(
        Array(qte)
          .fill(null)
          .map(() => ({
            tag: "",
            price: "",
            category: "",
            isPickedUp: false,
            id: null,
          }))
      );
      setAnimalExisting(Array(qte).fill(false));
    }
  }, [qte, initialAnimalId]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setErr("");
        setBuyerFormData({ cin: "", fullName: "", phone: "", address: "", id: null });
        setAnimalFormData([]);
        setSummaryFormData({
          saleDate: formatDate(new Date()),
          agreedAmount: "",
          paidAmount: "",
          method: "",
        });
      };
    }, [])
  );

  // Handlers
  const handleBuyerChange = (field: string, value: any) => {
    setBuyerFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAnimalChange = (index: number, field: string, value: any) => {
    setAnimalFormData((prev) => {
      const newData = [...prev];
      if (!newData[index]) newData[index] = {};
      newData[index] = { ...newData[index], [field]: value };
      return newData;
    });
  };

  const handleExistingAnimalSelect = (index: number, animalId: number) => {
    const selectedAnimal = animals?.find((a: any) => a.id === animalId);
    if (selectedAnimal) {
      setAnimalFormData((prev) => {
        const newData = [...prev];
        newData[index] = {
          ...newData[index],
          id: animalId,
          tag: selectedAnimal.tag || "",
          category: (selectedAnimal as any).category?.id || "",
          price: newData[index]?.price || selectedAnimal.price?.toString() || "",
          isPickedUp: newData[index]?.isPickedUp ?? (selectedAnimal as any).isPickedUp ?? false,
        };
        return newData;
      });
    }
  };

  const handleSummaryChange = (field: string, value: any) => {
    setSummaryFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateObj(selectedDate);
      handleSummaryChange("saleDate", formatDate(selectedDate));
    }
  };

  const toggleAnimalExisting = (index: number) => {
    setAnimalExisting((prev) => {
      const newExisting = [...prev];
      newExisting[index] = !newExisting[index];
      return newExisting;
    });
    setAnimalFormData((prev) => {
      const newData = [...prev];
      newData[index] = {
        ...newData[index],
        tag: "",
        category: "",
        id: null,
      };
      return newData;
    });
  };

  const validateForm = () => {
    for (let i = 0; i < animalFormData.length; i++) {
      const animal = animalFormData[i] || {};
      if (animalExisting[i] && !animal.id)
        return `${t("common.Livestock")} ${i + 1} ${t("common.mustBeSelected")}`;
      if (!animalExisting[i] && !animal.tag)
        return `${t("common.Livestock")} ${i + 1} ${t("common.tagRequired")}`;
      if (!animalExisting[i] && !animal.category)
        return `${t("common.Livestock")} ${i + 1} ${t("common.categoryRequired")}`;
      if (!animal.price)
        return `${t("common.Livestock")} ${i + 1} ${t("common.priceRequired")}`;
    }
    if (!buyerExisting && !buyerFormData.fullName) return t("common.buyerFullNameRequired");
    if (buyerExisting && !buyerFormData.id) return t("common.buyerRequired");
    if (!summaryFormData.agreedAmount) return t("common.agreedAmountRequired");
    if (!summaryFormData.paidAmount) return t("common.paidAmountRequired") || "Paid amount required";
    if (!summaryFormData.method) return t("common.methodRequired");
    return null;
  };

  const onSubmit = async () => {
    const error = validateForm();
    if (error) {
      setErr(error);
      return;
    }

    const processedAnimals = animalFormData.map((animal, index) => ({
      ...(animalExisting[index] ? { id: animal.id } : animal),
      price: animal.price ? parseFloat(animal.price) : 0,
      isPickedUp: animal.isPickedUp || false,
    }));

    const finalData = {
      animals: processedAnimals,
      buyer: buyerExisting ? { id: buyerFormData.id } : buyerFormData,
      ...summaryFormData,
      agreedAmount: parseFloat(summaryFormData.agreedAmount),
      paidAmount: parseFloat(summaryFormData.paidAmount),
    };

    setErr("");
    try {
      await createSale(finalData as any).unwrap();
      showSuccessToast();
      navigation.goBack();
    } catch (error) {
      showErrorToast();
    }
  };

  const SectionHeader = ({
    title,
    collapsed,
    onToggle,
  }: {
    title: string;
    collapsed: boolean;
    onToggle: () => void;
  }) => (
    <TouchableOpacity
      onPress={onToggle}
      className="flex-row items-center justify-between p-4 bg-surface-50 rounded-t-2xl"
    >
      <Text className="text-primary-800 font-semibold text-base">{title}</Text>
      {collapsed ? (
        <ChevronDown size={20} color="#627d98" />
      ) : (
        <ChevronUp size={20} color="#627d98" />
      )}
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-surface-50">
     

      <ScrollView className="flex-1 px-5 pt-4" contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Error Message */}
        {err ? (
          <View className="bg-danger-50 border border-danger-200 rounded-xl p-3 mb-4">
            <Text className="text-danger-600 text-sm text-center">{err}</Text>
          </View>
        ) : null}

        {/* Buyer Section */}
        <View className="bg-white rounded-2xl mb-4 shadow-sm overflow-hidden">
          <SectionHeader
            title={t("common.buyer")}
            collapsed={buyerCollapsed}
            onToggle={() => setBuyerCollapsed(!buyerCollapsed)}
          />
          <Collapsible collapsed={buyerCollapsed}>
            <View className="p-4 border-t border-surface-100">
              {/* Toggle Existing Buyer */}
              <View className="flex-row items-center justify-between mb-4 bg-surface-50 rounded-xl p-3">
                <Text className="text-surface-600 text-sm">{t("common.alreadyRegistered")}</Text>
                <Switch
                  value={buyerExisting}
                  onValueChange={() => setBuyerExisting(!buyerExisting)}
                  trackColor={{ false: "#d4d4d8", true: "#fcd34d" }}
                  thumbColor={buyerExisting ? "#f59e0b" : "#fff"}
                />
              </View>

              {buyerExisting ? (
                <View>
                  {buyersLoading ? (
                    <ActivityIndicator color="#334e68" />
                  ) : buyers && buyers.length > 0 ? (
                    <View className="bg-surface-50 rounded-xl">
                      {buyers.map((buyer: any) => (
                        <TouchableOpacity
                          key={buyer.id}
                          onPress={() => handleBuyerChange("id", buyer.id)}
                          className={`p-4 border-b border-surface-200 flex-row items-center ${
                            buyerFormData.id === buyer.id ? "bg-accent-50" : ""
                          }`}
                        >
                          <View
                            className={`w-5 h-5 rounded-full border-2 mr-3 items-center justify-center ${
                              buyerFormData.id === buyer.id
                                ? "border-accent-500 bg-accent-500"
                                : "border-surface-300"
                            }`}
                          >
                            {buyerFormData.id === buyer.id && (
                              <Check size={12} color="white" />
                            )}
                          </View>
                          <Text className="text-primary-800 flex-1">{buyer.fullName || buyer.name}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ) : (
                    <Text className="text-surface-500 text-center py-4">
                      {t("common.noBuyersAvailable")}
                    </Text>
                  )}
                </View>
              ) : (
                <View>
                  <View className="flex-row items-center bg-surface-50 rounded-xl px-4 mb-3">
                    <User size={18} color="#627d98" />
                    <TextInput
                      value={buyerFormData.fullName}
                      onChangeText={(v) => handleBuyerChange("fullName", v)}
                      placeholder={t("common.FullName")}
                      placeholderTextColor="#a1a1aa"
                      className="flex-1 py-3 px-3 text-primary-900"
                    />
                  </View>
                  <View className="flex-row items-center bg-surface-50 rounded-xl px-4 mb-3">
                    <CreditCard size={18} color="#627d98" />
                    <TextInput
                      value={buyerFormData.cin}
                      onChangeText={(v) => handleBuyerChange("cin", v)}
                      placeholder={t("common.CIN")}
                      placeholderTextColor="#a1a1aa"
                      className="flex-1 py-3 px-3 text-primary-900"
                    />
                  </View>
                  <View className="flex-row items-center bg-surface-50 rounded-xl px-4 mb-3">
                    <Phone size={18} color="#627d98" />
                    <TextInput
                      value={buyerFormData.phone}
                      onChangeText={(v) => handleBuyerChange("phone", v)}
                      placeholder={t("common.Phone")}
                      placeholderTextColor="#a1a1aa"
                      keyboardType="phone-pad"
                      className="flex-1 py-3 px-3 text-primary-900"
                    />
                  </View>
                  <View className="flex-row items-center bg-surface-50 rounded-xl px-4">
                    <MapPin size={18} color="#627d98" />
                    <TextInput
                      value={buyerFormData.address}
                      onChangeText={(v) => handleBuyerChange("address", v)}
                      placeholder={t("common.Address")}
                      placeholderTextColor="#a1a1aa"
                      className="flex-1 py-3 px-3 text-primary-900"
                    />
                  </View>
                </View>
              )}
            </View>
          </Collapsible>
        </View>

        {/* Animals Section */}
        {generateIndexArray(qte).map((_, index) => (
          <View key={index} className="bg-white rounded-2xl mb-4 shadow-sm overflow-hidden">
            <SectionHeader
              title={`${t("common.Livestock")} ${index + 1}`}
              collapsed={animalCollapsed[index]}
              onToggle={() => {
                setAnimalCollapsed((prev) => {
                  const newCollapsed = [...prev];
                  newCollapsed[index] = !newCollapsed[index];
                  return newCollapsed;
                });
              }}
            />
            <Collapsible collapsed={animalCollapsed[index]}>
              <View className="p-4 border-t border-surface-100">
                {/* Toggle Existing Animal */}
                <View className="flex-row items-center justify-between mb-3 bg-surface-50 rounded-xl p-3">
                  <Text className="text-surface-600 text-sm">{t("common.alreadyRegistered")}</Text>
                  <Switch
                    value={animalExisting[index]}
                    onValueChange={() => toggleAnimalExisting(index)}
                    trackColor={{ false: "#d4d4d8", true: "#fcd34d" }}
                    thumbColor={animalExisting[index] ? "#f59e0b" : "#fff"}
                  />
                </View>

                {/* Picked Up Toggle */}
                <View className="flex-row items-center justify-between mb-4 bg-surface-50 rounded-xl p-3">
                  <Text className="text-surface-600 text-sm">{t("common.PickedUp")}?</Text>
                  <Switch
                    value={animalFormData[index]?.isPickedUp || false}
                    onValueChange={() =>
                      handleAnimalChange(index, "isPickedUp", !animalFormData[index]?.isPickedUp)
                    }
                    trackColor={{ false: "#d4d4d8", true: "#5eead4" }}
                    thumbColor={animalFormData[index]?.isPickedUp ? "#14b8a6" : "#fff"}
                  />
                </View>

                {animalExisting[index] ? (
                  <View>
                    {animalsLoading ? (
                      <ActivityIndicator color="#334e68" />
                    ) : animals && animals.length > 0 ? (
                      <View className="bg-surface-50 rounded-xl mb-3 max-h-48">
                        <ScrollView nestedScrollEnabled>
                          {animals.map((animal: any) => (
                            <TouchableOpacity
                              key={animal.id}
                              onPress={() => handleExistingAnimalSelect(index, animal.id)}
                              className={`p-3 border-b border-surface-200 flex-row items-center ${
                                animalFormData[index]?.id === animal.id ? "bg-accent-50" : ""
                              }`}
                            >
                              <View
                                className={`w-5 h-5 rounded-full border-2 mr-3 items-center justify-center ${
                                  animalFormData[index]?.id === animal.id
                                    ? "border-accent-500 bg-accent-500"
                                    : "border-surface-300"
                                }`}
                              >
                                {animalFormData[index]?.id === animal.id && (
                                  <Check size={12} color="white" />
                                )}
                              </View>
                              <Icon name="sheep" size={20} color="#627d98" />
                              <Text className="text-primary-800 ml-2">{animal.tag}</Text>
                            </TouchableOpacity>
                          ))}
                        </ScrollView>
                      </View>
                    ) : (
                      <Text className="text-surface-500 text-center py-4">
                        {t("common.noAnimalsAvailable")}
                      </Text>
                    )}
                  </View>
                ) : (
                  <View>
                    <View className="flex-row items-center bg-surface-50 rounded-xl px-4 mb-3">
                      <Tag size={18} color="#627d98" />
                      <TextInput
                        value={animalFormData[index]?.tag || ""}
                        onChangeText={(v) => handleAnimalChange(index, "tag", v)}
                        placeholder={t("common.tag")}
                        placeholderTextColor="#a1a1aa"
                        className="flex-1 py-3 px-3 text-primary-900"
                      />
                    </View>
                    {/* Category Selection */}
                    <View className="bg-surface-50 rounded-xl mb-3">
                      <Text className="text-surface-500 text-xs px-4 pt-3">
                        {t("common.category")}
                      </Text>
                      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="p-2">
                        {categories?.map((cat: any) => (
                          <TouchableOpacity
                            key={cat.id}
                            onPress={() => handleAnimalChange(index, "category", cat.id)}
                            className={`px-4 py-2 rounded-lg mr-2 ${
                              animalFormData[index]?.category === cat.id
                                ? "bg-accent-500"
                                : "bg-white border border-surface-200"
                            }`}
                          >
                            <Text
                              className={
                                animalFormData[index]?.category === cat.id
                                  ? "text-white font-medium"
                                  : "text-primary-700"
                              }
                            >
                              {t(`common.${cat.typeName}`, cat.typeName)}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  </View>
                )}

                {/* Price Input */}
                <View className="flex-row items-center bg-surface-50 rounded-xl px-4">
                  <DollarSign size={18} color="#627d98" />
                  <TextInput
                    value={animalFormData[index]?.price || ""}
                    onChangeText={(v) => handleAnimalChange(index, "price", v)}
                    placeholder={t("common.price")}
                    placeholderTextColor="#a1a1aa"
                    keyboardType="numeric"
                    className="flex-1 py-3 px-3 text-primary-900"
                  />
                  <Text className="text-surface-400 text-sm">MAD</Text>
                </View>
              </View>
            </Collapsible>
          </View>
        ))}

        {/* Payment Summary Section */}
        <View className="bg-white rounded-2xl mb-4 shadow-sm overflow-hidden">
          <SectionHeader
            title={t("common.payment")}
            collapsed={summaryCollapsed}
            onToggle={() => setSummaryCollapsed(!summaryCollapsed)}
          />
          <Collapsible collapsed={summaryCollapsed}>
            <View className="p-4 border-t border-surface-100">
              {/* Date */}
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                className="flex-row items-center bg-surface-50 rounded-xl px-4 mb-3"
              >
                <Calendar size={18} color="#627d98" />
                <Text className="flex-1 py-4 px-3 text-primary-900">
                  {summaryFormData.saleDate || t("common.selectDate")}
                </Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={dateObj}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}

              {/* Agreed Amount */}
              <View className="flex-row items-center bg-surface-50 rounded-xl px-4 mb-3">
                <DollarSign size={18} color="#627d98" />
                <TextInput
                  value={summaryFormData.agreedAmount}
                  onChangeText={(v) => handleSummaryChange("agreedAmount", v)}
                  placeholder={t("common.agreedAmount")}
                  placeholderTextColor="#a1a1aa"
                  keyboardType="numeric"
                  className="flex-1 py-3 px-3 text-primary-900"
                />
                <Text className="text-surface-400 text-sm">MAD</Text>
              </View>

              {/* Paid Amount */}
              <View className="flex-row items-center bg-surface-50 rounded-xl px-4 mb-3">
                <DollarSign size={18} color="#14b8a6" />
                <TextInput
                  value={summaryFormData.paidAmount}
                  onChangeText={(v) => handleSummaryChange("paidAmount", v)}
                  placeholder={t("common.paidAmount")}
                  placeholderTextColor="#a1a1aa"
                  keyboardType="numeric"
                  className="flex-1 py-3 px-3 text-primary-900"
                />
                <Text className="text-surface-400 text-sm">MAD</Text>
              </View>

              {/* Payment Method */}
              <Text className="text-surface-500 text-xs mb-2 ml-1">
                {t("common.paymentMethod")}
              </Text>
              <View className="flex-row flex-wrap">
                {paymentMethods?.map((method: any) => (
                  <TouchableOpacity
                    key={method.key || method}
                    onPress={() => handleSummaryChange("method", method.key || method)}
                    className={`px-4 py-3 rounded-xl mr-2 mb-2 ${
                      summaryFormData.method === (method.key || method)
                        ? "bg-accent-500"
                        : "bg-surface-50 border border-surface-200"
                    }`}
                  >
                    <Text
                      className={
                        summaryFormData.method === (method.key || method)
                          ? "text-white font-medium"
                          : "text-primary-700"
                      }
                    >
                      {t(`common.${method.key || method}`, method.value || method)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Collapsible>
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View className="absolute bottom-0 left-0 right-0 p-5 bg-surface-50">
        <TouchableOpacity onPress={onSubmit} disabled={isSubmitting} activeOpacity={0.8}>
          <LinearGradient
            colors={isSubmitting ? ["#a1a1aa", "#71717a"] : ["#f59e0b", "#d97706"]}
            style={styles.submitButton}
          >
            {isSubmitting ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Send size={20} color="white" />
                <Text className="text-white font-semibold text-lg ml-2">
                  {t("common.submitSale")}
                </Text>
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 48,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  submitButton: {
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
