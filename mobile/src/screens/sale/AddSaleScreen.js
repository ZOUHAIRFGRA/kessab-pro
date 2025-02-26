import { CheckBox, Icon, Input } from "@rneui/base";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import Collapsible from "react-native-collapsible";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../features/categorySlice";
import { getBuyers } from "../../features/buyerSlice";
import { formatDate, generateIndexArray } from "../../utils/Global";
import Colors from "../../utils/Colors";
import Container from "../../components/global/Container";
import Card from "../../components/global/Card";
import Text from "../../components/global/Text";
import Button from "../../components/global/Button";
import BaseDropdown from "../../components/global/BaseDropdown";

const AddSaleScreen = ({ route }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const qte = route.params?.qte;

  // Global state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitData, setSubmitData] = useState({
    animals: [],
    buyer: {},
    saleDetail: {},
  });

  // Categories state
  const { loading: categoriesLoading, categories } = useSelector(
    (states) => states.categories
  );

  // Buyers state
  const {
    buyers,
    loading: buyersLoading,
    error: buyersError,
  } = useSelector((states) => states.buyers);

  // Collapsed states
  const [animalCollapsed, setAnimalCollapsed] = useState([]);
  const [buyerCollapsed, setBuyerCollapsed] = useState(true);
  const [summaryCollapsed, setSummaryCollapsed] = useState(true);

  // Date picker
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateObj, setDateObj] = useState(new Date());

  // Buyer form state
  const [buyerExisting, setBuyerExisting] = useState(false);
  const [buyerFormData, setBuyerFormData] = useState({
    cin: "",
    fullName: "",
    phone: "",
    address: "",
    id: null,
  });

  // Animal form states
  const [animalFormData, setAnimalFormData] = useState([]);

  // Sale summary form state
  const [summaryFormData, setSummaryFormData] = useState({
    saleDate: formatDate(new Date()),
    agreedAmount: "",
    paidAmount: "",
  });

  // Initialize collapsed state and form data for animals
  useEffect(() => {
    if (qte) {
      const newCollapsed = Array(qte).fill(true);
      setAnimalCollapsed(newCollapsed);

      const newAnimalFormData = Array(qte)
        .fill({})
        .map(() => ({
          tag: "",
          price: "",
          category: "",
          isPickedUp: false,
        }));
      setAnimalFormData(newAnimalFormData);
    }
  }, [qte]);

  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Fetch buyers when needed
  useEffect(() => {
    if (buyerExisting) {
      dispatch(getBuyers());
    }
  }, [buyerExisting, dispatch]);

  // Submission error state
  const [err, setErr] = useState("");

  // onSubmit function handles form validation and submission
  const onSubmit = () => {
    setIsSubmitting(true);

    const validateForm = () => {
      if (animalFormData.some((el) => el.tag === ""))
        return "tag must be filled";
      if (animalFormData.some((el) => el.category === ""))
        return "category must be filled";
      if (!buyerExisting && buyerFormData.fullName === "")
        return "buyer fullname must be filled";
      if (buyerExisting && !buyerFormData.id) return "buyer must be choosed";
      if (summaryFormData === "") return "saleDetail must be filled";
      if (summaryFormData.agreedAmount === "")
        return "agreedAmount must be filled";
      if (summaryFormData.paidAmount === "") return "paidAmount must be filled";
      return null;
    };

    const error = validateForm();
    if (error) {
      setErr(error);
      setIsSubmitting(false);
      return;
    }

    const finalData = {
      animals: animalFormData,
      buyer: buyerExisting ? { id: buyerFormData.id } : buyerFormData,
      saleDetail: summaryFormData,
    };

    setErr("");
    console.log({ submitData: finalData, animals: finalData.animals });
    setSubmitData(finalData);
    setIsSubmitting(false);
  };

  // Toggle buyer existing and fetch buyers immediately
  const toggleBuyerExisting = () => {
    const newValue = !buyerExisting;
    setBuyerExisting(newValue);
    if (newValue && !buyers) {
      dispatch(getBuyers());
    }
  };

  // Handle form changes
  const handleBuyerChange = (field, value) => {
    setBuyerFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAnimalChange = (index, field, value) => {
    setAnimalFormData((prev) => {
      const newData = [...prev];
      newData[index] = {
        ...newData[index],
        [field]: value,
      };
      return newData;
    });
  };

  const toggleAnimalPickedUp = (index) => {
    setAnimalFormData((prev) => {
      const newData = [...prev];
      newData[index] = {
        ...newData[index],
        isPickedUp: !newData[index].isPickedUp,
      };
      return newData;
    });
  };

  const handleSummaryChange = (field, value) => {
    setSummaryFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateObj(selectedDate);
      const formattedDate = formatDate(selectedDate);
      handleSummaryChange("saleDate", formattedDate);
    }
  };

  // Updated toggle functions to collapse other sections when one opens

  // For animals, only one open at a time.
  const toggleAnimalCollapsed = (index) => {
    setAnimalCollapsed((prev) => {
      const newCollapsed = prev.map((_, i) =>
        i === index ? !prev[index] : true
      );
      if (!newCollapsed[index]) {
        setBuyerCollapsed(true);
        setSummaryCollapsed(true);
      }
      return newCollapsed;
    });
  };

  // When opening Buyer, collapse animals and summary.
  const toggleBuyerCollapsed = () => {
    setBuyerCollapsed((prev) => {
      const newState = !prev;
      if (!newState) {
        setAnimalCollapsed((prev) => prev.map(() => true));
        setSummaryCollapsed(true);
      }
      return newState;
    });
  };

  // When opening Summary, collapse animals and buyer.
  const toggleSummaryCollapsed = () => {
    setSummaryCollapsed((prev) => {
      const newState = !prev;
      if (!newState) {
        setAnimalCollapsed((prev) => prev.map(() => true));
        setBuyerCollapsed(true);
      }
      return newState;
    });
  };

  // Common styles
  const inputStyles = {
    inputStyle: {
      backgroundColor: Colors.secondaryLight,
      borderRadius: 8,
      paddingHorizontal: 10,
    },
  };

  return (
    <ScrollView style={{ padding: 12 }}>
      <Text>{err}</Text>
      <Container sx={{ flexDirection: "column", gap: 12 }}>
        {/* Buyer Section */}
        <Card sx={{ flexDirection: "column", padding: 0 }}>
          <Container sx={{ padding: 16 }}>
            <Text onPress={toggleBuyerCollapsed}>Buyer</Text>
          </Container>
          <Collapsible collapsed={buyerCollapsed}>
            <Container>
              <Container
                sx={{
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <CheckBox
                  checked={buyerExisting}
                  onPress={toggleBuyerExisting}
                  iconType="material-community"
                  checkedIcon="checkbox-marked"
                  uncheckedIcon="checkbox-blank-outline"
                  checkedColor={Colors.secondary}
                  title="already exists?"
                />
              </Container>
              {!buyerExisting && (
                <Container sx={{ marginHorizontal: 10 }}>
                  <Input
                    leftIcon={
                      <Icon
                        name="id-card"
                        size={24}
                        color={Colors.secondary}
                        type="ionicon"
                      />
                    }
                    placeholder="CIN"
                    value={buyerFormData.cin}
                    onChangeText={(value) => handleBuyerChange("cin", value)}
                    {...inputStyles}
                  />
                  <Input
                    leftIcon={
                      <Icon
                        name="person"
                        size={24}
                        color={Colors.secondary}
                        type="ionicon"
                      />
                    }
                    placeholder="Full Name"
                    value={buyerFormData.fullName}
                    onChangeText={(value) =>
                      handleBuyerChange("fullName", value)
                    }
                    {...inputStyles}
                  />
                  <Input
                    leftIcon={
                      <Icon
                        name="call"
                        size={24}
                        color={Colors.secondary}
                        type="ionicon"
                      />
                    }
                    placeholder="Phone"
                    keyboardType="phone-pad"
                    value={buyerFormData.phone}
                    onChangeText={(value) => handleBuyerChange("phone", value)}
                    {...inputStyles}
                  />
                  <Input
                    leftIcon={
                      <Icon
                        name="location"
                        size={24}
                        color={Colors.secondary}
                        type="ionicon"
                      />
                    }
                    placeholder="Address"
                    value={buyerFormData.address}
                    onChangeText={(value) =>
                      handleBuyerChange("address", value)
                    }
                    {...inputStyles}
                  />
                </Container>
              )}
              {buyerExisting && (
                <Container sx={{ padding: 10 }}>
                  {buyers && buyers.length > 0 ? (
                    <BaseDropdown
                      values={buyers.map((buyer) => ({
                        label: buyer.fullName,
                        value: buyer.id,
                      }))}
                      label={t("common.category")}
                      focusLabel="..."
                      notFocusLabel={t("common.category")}
                      searchLabel={t("common.category_placeholder")}
                      containerStyle={inputStyles}
                      selectedValue={buyerFormData.id}
                      onValueChange={(value) => handleBuyerChange("id", value)}
                      disable={buyersLoading}
                    />
                  ) : (
                    <Text>
                      {buyersLoading
                        ? "Loading buyers..."
                        : "No buyers available"}
                    </Text>
                  )}
                </Container>
              )}
            </Container>
          </Collapsible>
        </Card>

        {/* Animals Section */}
        <Container sx={{ flexDirection: "column", gap: 12 }}>
          {generateIndexArray(qte).map((_, index) => (
            <Card key={index} sx={{ flexDirection: "column", padding: 0 }}>
              <Container sx={{ padding: 16 }}>
                <Text onPress={() => toggleAnimalCollapsed(index)}>
                  Animal {index + 1}
                </Text>
              </Container>
              <Collapsible collapsed={animalCollapsed[index]}>
                <Container sx={{ marginHorizontal: 10 }}>
                  <Container
                    sx={{
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <CheckBox
                      checked={animalFormData[index]?.isPickedUp || false}
                      onPress={() => toggleAnimalPickedUp(index)}
                      iconType="material-community"
                      checkedIcon="checkbox-marked"
                      uncheckedIcon="checkbox-blank-outline"
                      checkedColor={Colors.secondary}
                      title="already Exists"
                    />

                    <CheckBox
                      checked={animalFormData[index]?.isPickedUp || false}
                      onPress={() => toggleAnimalPickedUp(index)}
                      iconType="material-community"
                      checkedIcon="checkbox-marked"
                      uncheckedIcon="checkbox-blank-outline"
                      checkedColor={Colors.secondary}
                      title="pickedUp"
                    />
                  </Container>
                  <Input
                    leftIcon={
                      <Icon
                        name="pricetag"
                        size={24}
                        color={Colors.secondary}
                        type="ionicon"
                      />
                    }
                    placeholder="Tag..."
                    value={animalFormData[index]?.tag || ""}
                    onChangeText={(value) =>
                      handleAnimalChange(index, "tag", value)
                    }
                    {...inputStyles}
                  />
                  <Input
                    leftIcon={
                      <Icon
                        name="cash-outline"
                        type="ionicon"
                        size={24}
                        color={Colors.secondary}
                      />
                    }
                    placeholder="Price..."
                    keyboardType="numeric"
                    value={animalFormData[index]?.price || ""}
                    onChangeText={(value) =>
                      handleAnimalChange(index, "price", value)
                    }
                    {...inputStyles}
                  />
                  <Container sx={{ paddingX: 10, marginVertical: 15 }}>
                    <BaseDropdown
                      values={categories?.map((category) => ({
                        label: category.typeName,
                        value: category.id,
                      }))}
                      label={t("common.category")}
                      focusLabel="..."
                      notFocusLabel={t("common.category")}
                      searchLabel={t("common.category_placeholder")}
                      containerStyle={inputStyles}
                      selectedValue={animalFormData[index]?.category || ""}
                      onValueChange={(value) =>
                        handleAnimalChange(index, "category", value)
                      }
                      disable={categoriesLoading}
                    />
                  </Container>
                </Container>
              </Collapsible>
            </Card>
          ))}
        </Container>

        {/* Sale Summary Section */}
        <Card sx={{ flexDirection: "column", padding: 0 }}>
          {showDatePicker && (
            <DateTimePicker
              value={dateObj}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          <Container sx={{ padding: 16 }}>
            <Text onPress={toggleSummaryCollapsed}>Summary</Text>
          </Container>
          <Collapsible collapsed={summaryCollapsed}>
            <Container sx={{ marginHorizontal: 10 }}>
              <Input
                leftIcon={
                  <Icon
                    name="calendar"
                    size={24}
                    color={Colors.secondary}
                    type="ionicon"
                  />
                }
                placeholder="Sale Date (DD-MM-YYYY)"
                onPressIn={() => setShowDatePicker(true)}
                value={summaryFormData.saleDate}
                {...inputStyles}
              />
              <Input
                leftIcon={
                  <Icon
                    name="cash-outline"
                    type="ionicon"
                    size={24}
                    color={Colors.secondary}
                  />
                }
                placeholder="Agreed Amount"
                keyboardType="numeric"
                value={summaryFormData.agreedAmount}
                onChangeText={(value) =>
                  handleSummaryChange("agreedAmount", value)
                }
                {...inputStyles}
              />
              <Input
                leftIcon={
                  <Icon
                    name="wallet"
                    type="ionicon"
                    size={24}
                    color={Colors.secondary}
                  />
                }
                placeholder="Paid Amount"
                keyboardType="numeric"
                value={summaryFormData.paidAmount}
                onChangeText={(value) =>
                  handleSummaryChange("paidAmount", value)
                }
                {...inputStyles}
              />
            </Container>
          </Collapsible>
        </Card>

        {/* Submit Button */}
        <Button
          type={"secondary"}
          textStyle={{
            color: "white",
            padding: 8,
            fontWeight: "bold",
            fontSize: 16,
          }}
          icon={{
            name: "send",
            size: 25,
            type: "material",
            color: "white",
          }}
          title={isSubmitting ? "Submitting..." : "Submit Sale"}
          onPress={onSubmit}
        />
      </Container>
    </ScrollView>
  );
};

export default AddSaleScreen;
