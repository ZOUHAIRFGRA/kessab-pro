import { Input } from "@rneui/base";
import Dialogs from "../global/Dialog";
import BaseDropdown from "../global/BaseDropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useCallback, useEffect, useState } from "react";
import { formatDate } from "../../utils/Global";
import { useDispatch, useSelector } from "react-redux";
import { fetchPaymentMethods } from "../../features/enumSlice";
import Button from "../global/Button";
import Container from "../global/Container";
import { useTranslation } from "react-i18next";
import { isEmpty, isValidDDMMYYYY } from "../../helpers/gloablHelpers";
import Text from "../global/Text";
import Colors from "../../utils/Colors";
import {
  addTransaction,
  getTransactions,
  getTransactionsByBuyer,
  getTransactionsBySale,
} from "../../features/transactionSlice";
import { useToast } from "../../hooks/useToast";
import transactionApi from "../../api/transactionApi";
import { getSale } from "../../features/saleSlice";

const AddTransactionModal = ({
  id,
  type,
  visible,
  toggleDialog,
  totalAmount = null,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { loading: loadingPaymentMethods, paymentMethods } = useSelector(
    (states) => states.enums
  );

  useEffect(() => {
    if (paymentMethods.length < 1) {
      dispatch(fetchPaymentMethods());
    }
  }, [dispatch]);

  const [formData, setFormData] = useState({
    transactionDate: formatDate(new Date()),
    amount: "",
    method: "",
  });
  const [formError, setFormError] = useState({
    transactionDate: "",
    amount: "",
    method: "",
  });

  const [dateObj, setDateObj] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleDateChange = (event, selectedDate) => {
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
  const { showSuccessToast, showErrorToast } = useToast();

  const onSubmit = async () => {
    const newErrors = {};
    let isValid = true;

    if (!isValidDDMMYYYY(formData.transactionDate)) {
      newErrors.transactionDate = t("common.dateInvalid");
      isValid = false;
    }

    if (isEmpty(formData.amount)) {
      newErrors.amount = t("common.amountRequired");
      isValid = false;
    } else if (totalAmount !== null && formData.amount > totalAmount) {
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
      const commonActions = async (dispatchFn) => {
        showSuccessToast(t("common.transactionAdded"));
        await dispatch(dispatchFn(id));
        dispatch(getSale(id));
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
        .finally(toggleDialog);

      setFormError({});
    }
  };

  useEffect(() => {
    return () => {
      setFormError({});
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
        <Container
          style={{
            flexDirection: "column",
          }}
        >
          {formError.transactionDate && (
            <Text
              style={{
                color: Colors.danger,
              }}
            >
              {formError.transactionDate}
            </Text>
          )}
          <Input
            placeholder="date"
            onPressIn={() => setShowDatePicker(true)}
            value={formData.transactionDate}
          />
          {formError.amount && (
            <Text
              style={{
                color: Colors.danger,
              }}
            >
              {formError.amount}
            </Text>
          )}

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
            style={{
              paddingBottom: 0,
              marginBottom: 0,
            }}
          />
          {formError.method && (
            <Text
              style={{
                color: Colors.danger,
              }}
            >
              {formError.method}
            </Text>
          )}

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

          <Button
            type={"primary"}
            style={{
              padding: 12,
              marginRight: 12,
              marginLeft: 12,
              marginTop: 8,
              marginBottom: 8,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            textStyle={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 16,
            }}
            onPress={onSubmit}
          >
            {t("common.add")}
          </Button>
        </Container>
      </Dialogs>
    </>
  );
};

export default AddTransactionModal;
