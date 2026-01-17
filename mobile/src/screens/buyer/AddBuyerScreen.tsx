import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";
import {
  User,
  CreditCard,
  Phone,
  MapPin,
  ArrowLeft,
  UserPlus,
  Check,
} from "lucide-react-native";
import { useCreateBuyerMutation } from "../../services";
import { useToast } from "../../hooks/useToast";
import "../../../global.css";

export default function AddBuyerScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const { showSuccessToast, showErrorToast } = useToast();
  const isRTL = t("dir") === "rtl";

  // RTK Query mutation
  const [createBuyer, { isLoading }] = useCreateBuyerMutation();

  const [buyerData, setBuyerData] = useState({
    fullName: "",
    CIN: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    CIN: "",
    phone: "",
    address: "",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validateField = (field: string, value: string) => {
    switch (field) {
      case "fullName":
        if (!value) return t("common.buyerFullNameRequired");
        if (value.length < 4) return t("common.fullNameMinLength");
        if (value.length > 50) return t("common.fullNameMaxLength");
        return "";
      case "phone":
        return value && !/^\d{10}$/.test(value) ? t("common.phoneFormat") : "";
      default:
        return "";
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setBuyerData((prev) => ({ ...prev, [field]: value }));
    const errorMessage = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: errorMessage }));
  };

  const validateForm = () => {
    const formErrors = {
      fullName: validateField("fullName", buyerData.fullName),
      phone: validateField("phone", buyerData.phone),
      CIN: "",
      address: "",
    };
    setErrors(formErrors);
    return !Object.values(formErrors).some((error) => error !== "");
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await createBuyer({
          name: buyerData.fullName,
          phone: buyerData.phone,
          address: buyerData.address,
        }).unwrap();
        showSuccessToast();
        navigation.goBack();
      } catch (error) {
        showErrorToast();
      }
    }
  };

  const InputField = ({
    icon: Icon,
    label,
    field,
    value,
    keyboardType = "default",
    multiline = false,
  }: {
    icon: any;
    label: string;
    field: string;
    value: string;
    keyboardType?: any;
    multiline?: boolean;
  }) => (
    <View className="mb-4">
      <Text
        className={`text-surface-600 text-sm font-medium mb-2 ${
          isRTL ? "text-right" : "text-left"
        }`}
      >
        {label}
      </Text>
      <View
        className={`flex-row items-center bg-surface-50 rounded-2xl border-2 px-4 ${
          focusedField === field
            ? errors[field as keyof typeof errors]
              ? "border-danger-400"
              : "border-primary-500"
            : errors[field as keyof typeof errors]
            ? "border-danger-300"
            : "border-surface-200"
        } ${isRTL ? "flex-row-reverse" : "flex-row"}`}
      >
        <Icon
          size={20}
          color={
            errors[field as keyof typeof errors]
              ? "#f43f5e"
              : focusedField === field
              ? "#334e68"
              : "#a1a1aa"
          }
        />
        <TextInput
          value={value}
          onChangeText={(text) => handleInputChange(field, text)}
          placeholder={label}
          placeholderTextColor="#a1a1aa"
          keyboardType={keyboardType}
          multiline={multiline}
          className={`flex-1 py-4 px-3 text-base text-primary-900 ${
            isRTL ? "text-right" : "text-left"
          } ${multiline ? "min-h-[100px]" : ""}`}
          style={multiline ? { textAlignVertical: "top" } : {}}
          onFocus={() => setFocusedField(field)}
          onBlur={() => setFocusedField(null)}
        />
      </View>
      {errors[field as keyof typeof errors] && (
        <Text className="text-danger-500 text-xs mt-1.5 ml-1">
          {errors[field as keyof typeof errors]}
        </Text>
      )}
    </View>
  );

  return (
    <View className="flex-1 bg-surface-50">
      {/* Header */}
      <LinearGradient
        colors={["#334e68", "#243b53"]}
        style={styles.header}
      >
        <View className="flex-row items-center justify-between w-full mb-4">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="w-10 h-10 bg-white/10 rounded-full items-center justify-center"
          >
            <ArrowLeft size={22} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold">
            {t("common.addNewBuyer")}
          </Text>
          <View className="w-10" />
        </View>

        <View className="w-20 h-20 bg-white/10 rounded-full items-center justify-center mt-2">
          <UserPlus size={40} color="white" />
        </View>
      </LinearGradient>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="flex-1 -mt-6"
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <View className="px-5">
            {/* Form Card */}
            <View className="bg-white rounded-3xl p-6 shadow-sm">
              <Text className="text-primary-800 text-lg font-bold mb-4">
                {t("common.Buyer Information")}
              </Text>

              <InputField
                icon={User}
                label={t("common.FullName")}
                field="fullName"
                value={buyerData.fullName}
              />

              <InputField
                icon={CreditCard}
                label={t("common.CIN")}
                field="CIN"
                value={buyerData.CIN}
              />

              <InputField
                icon={Phone}
                label={t("common.Phone")}
                field="phone"
                value={buyerData.phone}
                keyboardType="phone-pad"
              />

              <InputField
                icon={MapPin}
                label={t("common.Address")}
                field="address"
                value={buyerData.address}
                multiline
              />

              {/* Submit Button */}
              <TouchableOpacity
                onPress={handleSubmit}
                activeOpacity={0.8}
                className="mt-4"
                disabled={isLoading}
              >
                <LinearGradient
                  colors={isLoading ? ["#a1a1aa", "#71717a"] : ["#f59e0b", "#d97706"]}
                  style={styles.saveButton}
                >
                  <Check size={20} color="white" />
                  <Text className="text-white font-semibold text-lg ml-2">
                    {t("common.save")}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 48,
    paddingBottom: 32,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  saveButton: {
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
