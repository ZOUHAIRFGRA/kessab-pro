import { Input } from "@rneui/base";
import Dialogs from "../global/Dialog";
import BaseDropdown from "../global/BaseDropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/Global";
import { useDispatch, useSelector } from "react-redux";
import { fetchPaymentMethods } from "../../features/enumSlice";
import Button from "../global/Button";
import Container from "../global/Container";
import { isEmpty, isValidDDMMYYYY } from "../../helpers/gloablHelpers";
import { VisibilitySensor } from "@futurejj/react-native-visibility-sensor";

const AddTransactionModal = ({
  id,
  type,
  visible,
  toggleDialog,
  totalAmount = null,
}) => {
  const dispatch = useDispatch();

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

  const onSubmit = () => {
    const newErrors = {};
    let isValid = true;

    if (!isValidDDMMYYYY(formData.transactionDate)) {
      newErrors.transactionDate = "Date is not valid";
      isValid = false;
    }

    if (isEmpty(formData.amount)) {
      newErrors.amount = "Amount is required";
      isValid = false;
    } else if (totalAmount !== null && formData.amount > totalAmount) {
      newErrors.amount = "Amount should not exceed total";
      isValid = false;
    }

    if (!paymentMethods.includes(formData.method)) {
      newErrors.method = "Payment method is not valid";
      isValid = false;
    }

    setFormError((prevErrors) => ({
      ...prevErrors,
      ...newErrors,
    }));

    if (isValid) {
      console.log({ formData });
      // Submit form logic here
      setFormError({});
    }
  };

  function checkVisible(isVisible) {
    if (isVisible) {
      // setIsInView(isVisible);
      console.log("visible");
    } else {
      // setIsInView(isVisible);
      console.log("notVisible");
    }
  }

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
        title={"add new sale"}
        visible={visible}
        toggleDialog={toggleDialog}
      >
        <Container
          style={{
            flexDirection: "column",
            gap: 8,
          }}
        >
          <Input
            placeholder="date"
            onPressIn={() => setShowDatePicker(true)}
            value={formData.transactionDate}
            errorMessage={formError.transactionDate}
          />
          <Input
            onChangeText={(value) =>
              setFormData({
                ...formData,
                amount: value,
              })
            }
            keyboardType="numeric"
            errorMessage={formError.amount}
            placeholder="paid amount"
            value={formData.amount}
          />
          <BaseDropdown
            search={false}
            notFocusLabel={
              formError.method ? formError.method : "payment method"
            }
            disable={loadingPaymentMethods}
            values={paymentMethods.map((pm) => ({ label: pm, value: pm }))}
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
            Add
          </Button>
        </Container>
      </Dialogs>
    </>
  );
};

export default AddTransactionModal;
