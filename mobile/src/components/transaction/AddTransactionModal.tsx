import "../../../global.css";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { Input } from "@rneui/base";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Calendar, DollarSign, CreditCard } from "lucide-react-native";
import { formatDate } from "../../utils/Global";
import { isEmpty, isValidDDMMYYYY } from "../../helpers/gloablHelpers";
import { fetchPaymentMethods } from "../../features/enumSlice";
import {
  getTransactionsByBuyer,
  getTransactionsBySale,
} from "../../features/transactionSlice";
import { getSale } from "../../features/saleSlice";
import { useToast } from "../../hooks/useToast";
import transactionApi from "../../api/transactionApi";
import Dialogs from "../global/Dialog";
import BaseDropdown from "../global/BaseDropdown";

interface EnumState {
  loading: boolean;
  paymentMethods: string[];
}

interface RootState {
  enums: EnumState;
}

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
  id: number;
  type: "sale" | "buyer";
  visible: boolean;
  toggleDialog: (value: boolean) => void;
  totalAmount?: number | null;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  id,
  type,
  visible,
  toggleDialog,
  totalAmount = null,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { showSuccessToast, showErrorToast } = useToast();

  const { loading: loadingPaymentMethods, paymentMethods } = useSelector(
    (state: RootState) => state.enums
  );

  useEffect(() => {
    if (paymentMethods.length < 1) {
      dispatch(fetchPaymentMethods() as any);
    }
  }, [dispatch, paymentMethods.length]);

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
    } else if (totalAmount !== null && Number(formData.amount) > totalAmount) {
      newErrors.amount = t("common.amountExceedsTotal");
      isValid = false;
    }

    if (!paymentMethods.includes(formData.method)) {
      newErrors.method = t("common.paymentMethodInvalid");
      isValid = false;
    }

    setFormError((prevErrors) => ({
      ...prevErrors,
      ...newErrors,
    }));

    if (isValid) {
      const commonActions = async (dispatchFn: any) => {
        showSuccessToast(t("common.transactionAdded"));
        await dispatch(dispatchFn(id));
        dispatch(getSale(id) as any);
      };

      const handleTransaction =
        type === "sale"
          ? () => transactionApi.createTransaction({ ...formData, sale_id: id })
          : () => transactionApi.consumeTransaction(id, formData);

      handleTransaction()
        .then(() =>
          commonActions(
            type === "sale" ? getTransactionsBySale : getTransactionsByBuyer
          )
        )
        .catch(showErrorToast)
        .finally(() => toggleDialog(false));

      setFormError({
        transactionDate: "",
        amount: "",
        method: "",
      });
    }
  };

  useEffect(() => {
    return () => {
      setFormError({
        transactionDate: "",
        amount: "",
        method: "",
      });
    };
  }, [visible]);

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
        toggleDialog={toggleDialog}
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
            <Input
              onChangeText={(value) =>
                setFormData({
                  ...formData,
                  amount: value,
                })
              }
              keyboardType="numeric"
              placeholder={t(`common.paidAmount`)}
              value={formData.amount}
              containerStyle={{ paddingHorizontal: 0 }}
              inputContainerStyle={{
                backgroundColor: "#ffffff",
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#e2e8f0",
                paddingHorizontal: 12,
              }}
              inputStyle={{
                fontSize: 16,
                color: "#243b53",
              }}
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
              search={false}
              focusLabel={t("common.paymentMethod")}
              notFocusLabel={t("common.paymentMethod")}
              disable={loadingPaymentMethods}
              values={paymentMethods.map((pm) => ({
                label: t(`common.${pm}`),
                value: pm,
              }))}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  method: value,
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
