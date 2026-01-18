import "../../../global.css";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTranslation } from "react-i18next";
import { Calendar, DollarSign, CreditCard } from "lucide-react-native";
import { formatDate } from "../../utils/Global";
import { isEmpty, isValidDDMMYYYY } from "../../helpers/gloablHelpers";
import {
  useGetPaymentMethodsQuery,
  useCreateTransactionMutation,
  useConsumeTransactionMutation,
  useGetTransactionsQuery,
} from "../../services";
import { useToast } from "../../hooks/useToast";
import Dialogs from "../global/Dialog";
import BaseDropdown from "../global/BaseDropdown";

interface FormData {
  transactionDate: string;
  amount: string;
  method: string;
}

interface FormError {
  transactionDate: string;
  amount: string;
  method: string;
}

interface AddTransactionModalProps {
  id?: string; // UUID
  buyerId?: string; // UUID
  saleId?: string; // UUID
  type?: "sale" | "buyer";
  visible: boolean;
  toggleDialog?: (value: boolean) => void;
  onClose?: () => void;
  agreedAmount?: string; // Format: "8166.55DH"
  paidAmount?: string; // Format: "500.0DH"
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  id,
  buyerId,
  saleId,
  type = "sale",
  visible,
  toggleDialog,
  onClose,
  agreedAmount,
  paidAmount,
}) => {
  const { t } = useTranslation();
  const { showSuccessToast, showErrorToast } = useToast();

  // Helper function to parse amount strings like "8166.55DH" -> 8166.55
  const parseAmount = (amountStr?: string): number => {
    if (!amountStr) return 0;
    return parseFloat(amountStr.replace(/[^0-9.]/g, ''));
  };

  // Calculate remaining amount for sales
  const agreedAmountNum = parseAmount(agreedAmount);
  const paidAmountNum = parseAmount(paidAmount);
  const remainingAmount = agreedAmountNum - paidAmountNum;

  // RTK Query hooks
  const { data: paymentMethods = [], isLoading: loadingPaymentMethods } = useGetPaymentMethodsQuery();
  const [createTransaction] = useCreateTransactionMutation();
  const [consumeTransaction] = useConsumeTransactionMutation();
  const refetchTransactions = useGetTransactionsQuery(
    type === "sale"
      ? { saleId: saleId || id || 0, page: 0 }
      : { buyerId: buyerId || id || 0, page: 0 },
    { skip: !visible }
  ).refetch;

  const [formData, setFormData] = useState<FormData>({
    transactionDate: formatDate(new Date()),
    amount: "",
    method: "",
  });

  const [formError, setFormError] = useState<FormError>({
    transactionDate: "",
    amount: "",
    method: "",
  });

  const [dateObj, setDateObj] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleClose = () => {
    if (toggleDialog) toggleDialog(false);
    if (onClose) onClose();
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateObj(selectedDate);
      const transactionDate = formatDate(selectedDate);
      setFormData({
        ...formData,
        transactionDate,
      });
    }
  };

  const onSubmit = async () => {
    const newErrors: Partial<FormError> = {};
    let isValid = true;

    if (!isValidDDMMYYYY(formData.transactionDate)) {
      newErrors.transactionDate = t("common.dateInvalid");
      isValid = false;
    }

    if (isEmpty(formData.amount)) {
      newErrors.amount = t("common.amountRequired");
      isValid = false;
    } else if (type === "sale" && agreedAmount) {
      const enteredAmount = parseFloat(formData.amount);
      if (isNaN(enteredAmount) || enteredAmount <= 0) {
        newErrors.amount = t("common.invalidAmount");
        isValid = false;
      } else if (enteredAmount > remainingAmount) {
        newErrors.amount = `${t("common.amountExceedsRemaining")} ${remainingAmount.toFixed(2)} DH`;
        isValid = false;
      }
    }

    const methodKeys = paymentMethods.map((pm: any) => pm.key || pm);
    if (!methodKeys.includes(formData.method)) {
      newErrors.method = t("common.paymentMethodInvalid");
      isValid = false;
    }

    setFormError((prevErrors) => ({
      ...prevErrors,
      ...newErrors,
    }));

    if (isValid) {
      try {
        const effectiveId = id || saleId || buyerId;

        if (type === "sale" && (saleId || id)) {
          await createTransaction({
            sale_id: saleId || id,
            amount: parseFloat(formData.amount),
            transactionDate: formData.transactionDate,
            method: formData.method,
            paymentStatus: "COMPLETED",
          }).unwrap();
        } else if (type === "buyer" && (buyerId || id)) {
          await consumeTransaction({
            buyerId: buyerId || id!,
            data: {
              amount: parseFloat(formData.amount),
              transactionDate: formData.transactionDate,
              method: formData.method,
            },
          }).unwrap();
        }

        showSuccessToast(t("common.transactionAdded"));
        handleClose();
        setFormError({ transactionDate: "", amount: "", method: "" });
        setFormData({ transactionDate: formatDate(new Date()), amount: "", method: "" });
        refetchTransactions();
      } catch (error: any) {
        // Handle backend error messages
        const errorMessage = error?.data?.errors || error?.data?.message || t("common.transactionFailed");
        showErrorToast(errorMessage);
        
        // If it's an amount validation error, show it in the form
        if (errorMessage.toLowerCase().includes('amount')) {
          setFormError(prev => ({ ...prev, amount: errorMessage }));
        }
      }
    }
  };

  return (
    <>
      {showDatePicker && (
        <DateTimePicker
          value={dateObj}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Dialogs
        title={t(`common.addTransaction`)}
        visible={visible}
        toggleDialog={handleClose}
      >
        <View className="flex-col gap-4 p-2">
          {/* Date Input */}
          <View className="bg-surface-50 rounded-2xl border border-surface-200 p-3">
            <View className="flex-row items-center gap-2 mb-2">
              <Calendar size={18} color="#334e68" strokeWidth={2} />
              <Text className="text-sm font-semibold text-primary-700">
                {t("common.date")}
              </Text>
            </View>
            {formError.transactionDate ? (
              <Text className="text-danger-600 text-xs mb-1">
                {formError.transactionDate}
              </Text>
            ) : null}
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              className="bg-white rounded-xl p-3 border border-surface-300"
            >
              <Text className="text-base text-primary-800">
                {formData.transactionDate}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Amount Input */}
          <View className="bg-surface-50 rounded-2xl border border-surface-200 p-3">
            <View className="flex-row items-center gap-2 mb-2">
              <DollarSign size={18} color="#334e68" strokeWidth={2} />
              <Text className="text-sm font-semibold text-primary-700">
                {t("common.paidAmount")}
              </Text>
            </View>
            {formError.amount ? (
              <Text className="text-danger-600 text-xs mb-1">
                {formError.amount}
              </Text>
            ) : null}
            {type === "sale" && agreedAmount && (
              <View className="bg-amber-50 border border-amber-200 rounded-lg p-2 mb-2">
                <Text className="text-amber-800 text-xs font-medium">
                  {t("common.agreedAmount")}: {agreedAmount}
                </Text>
                <Text className="text-amber-800 text-xs font-medium">
                  {t("common.paidSoFar")}: {paidAmount || "0.0 DH"}
                </Text>
                <Text className="text-amber-900 text-xs font-bold mt-1">
                  {t("common.remainingAmount")}: {remainingAmount.toFixed(2)} DH
                </Text>
              </View>
            )}
            <TextInput
              onChangeText={(value) =>
                setFormData({
                  ...formData,
                  amount: value,
                })
              }
              keyboardType="decimal-pad"
              placeholder={t(`common.paidAmount`)}
              value={formData.amount}
              className="bg-white rounded-xl p-3 border border-surface-300 text-base text-primary-800"
              placeholderTextColor="#94a3b8"
            />
          </View>

          {/* Payment Method */}
          <View className="bg-surface-50 rounded-2xl border border-surface-200 p-3">
            <View className="flex-row items-center gap-2 mb-2">
              <CreditCard size={18} color="#334e68" strokeWidth={2} />
              <Text className="text-sm font-semibold text-primary-700">
                {t("common.paymentMethod")}
              </Text>
            </View>
            {formError.method ? (
              <Text className="text-danger-600 text-xs mb-1">
                {formError.method}
              </Text>
            ) : null}
            <BaseDropdown
              label={t("common.paymentMethod")}
              search={false}
              focusLabel={t("common.paymentMethod")}
              notFocusLabel={t("common.paymentMethod")}
              disable={loadingPaymentMethods}
              values={paymentMethods.map((pm: any) => ({
                label: t(`common.${pm.key || pm}`),
                value: pm.key || pm,
              }))}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  method: String(value),
                })
              }
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            className="bg-accent-500 rounded-2xl p-4 flex-row items-center justify-center shadow-sm mt-2"
            onPress={onSubmit}
          >
            <Text className="text-white font-bold text-center text-base">
              {t("common.add")}
            </Text>
          </TouchableOpacity>
        </View>
      </Dialogs>
    </>
  );
};

export default AddTransactionModal;
