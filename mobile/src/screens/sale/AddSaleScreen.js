import { CheckBox, Icon, Input } from "@rneui/base";
import { useCallback, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import Collapsible from "react-native-collapsible";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../features/categorySlice";
import { getBuyers } from "../../features/buyerSlice";
import { getUnsoldAnimals } from "../../features/animalSlice";
import { formatDate, generateIndexArray } from "../../utils/Global";
import Colors from "../../utils/Colors";
import Container from "../../components/global/Container";
import Card from "../../components/global/Card";
import Text from "../../components/global/Text";
import Button from "../../components/global/Button";
import BaseDropdown from "../../components/global/BaseDropdown";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import saleApi from "../../api/saleApi";
import { useToast } from "../../hooks/useToast";
import { fetchPaymentMethods } from "../../features/enumSlice";

const AddSaleScreen = ({ route, navigation }) => {
  const navigator = useNavigation();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { loading: loadingPaymentMethods, paymentMethods } = useSelector(
    (states) => states.enums
  );

  useEffect(() => {
    if (paymentMethods.length < 1) {
      dispatch(fetchPaymentMethods());
    }
  }, [dispatch]);

  const qte = route.params?.qte || (route.params?.animalId ? 1 : 1);
  const initialAnimalId = route.params?.animalId;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitData, setSubmitData] = useState({
    animals: [],
    buyer: {},
    saleDetail: {},
  });

  const { loading: categoriesLoading, categories } = useSelector(
    (states) => states.categories
  );

  const {
    buyers,
    loading: buyersLoading,
    error: buyersError,
  } = useSelector((states) => states.buyers);

  const {
    unsoldAnimals: animals,
    loading: animalsLoading,
    error: animalsError,
  } = useSelector((states) => states.animals);

  const [animalCollapsed, setAnimalCollapsed] = useState([]);
  const [buyerCollapsed, setBuyerCollapsed] = useState(true);
  const [summaryCollapsed, setSummaryCollapsed] = useState(true);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateObj, setDateObj] = useState(new Date());

  const [buyerExisting, setBuyerExisting] = useState(false);
  const [buyerFormData, setBuyerFormData] = useState({
    cin: "",
    fullName: "",
    phone: "",
    address: "",
    id: null,
  });

  const [animalFormData, setAnimalFormData] = useState([]);
  const [animalExisting, setAnimalExisting] = useState([]);

  const [summaryFormData, setSummaryFormData] = useState({
    saleDate: formatDate(new Date()),
    agreedAmount: "",
    paidAmount: "",
    method: "",
  });

  const [err, setErr] = useState("");

  useEffect(() => {
    if (initialAnimalId) {
      setAnimalExisting([true]);
      setAnimalFormData([
        {
          id: initialAnimalId,
          price: "",
          isPickedUp: false,
        },
      ]);
    } else if (qte) {
      const newCollapsed = Array(qte).fill(true);
      setAnimalCollapsed(newCollapsed);

      const newAnimalFormData = Array(qte)
        .fill(null)
        .map(() => ({
          tag: "",
          price: "",
          category: "",
          isPickedUp: false,
          id: null,
        }));
      setAnimalFormData(newAnimalFormData);

      setAnimalExisting(Array(qte).fill(false));
    }
  }, [qte, initialAnimalId]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (buyerExisting) {
      dispatch(getBuyers());
    }
  }, [buyerExisting, dispatch]);

  useEffect(() => {
    const shouldFetchAnimals = animalExisting.some((exists) => exists);
    if (shouldFetchAnimals || initialAnimalId) {
      dispatch(getUnsoldAnimals());
    }
  }, [animalExisting, dispatch, initialAnimalId]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setErr("");
        setSubmitData({
          animals: [],
          buyer: {},
          saleDetail: {},
        });

        setBuyerFormData({
          cin: "",
          fullName: "",
          phone: "",
          address: "",
          id: null,
        });
        setAnimalFormData([]);
        setSummaryFormData({
          saleDate: formatDate(new Date()),
          agreedAmount: "",
          paidAmount: "",
        });
      };
    }, [])
  );

  const { showErrorToast, showSuccessToast } = useToast();

  const onSubmit = () => {
    setIsSubmitting(true);

    const validateForm = () => {
      for (let i = 0; i < animalFormData.length; i++) {
        const animal = animalFormData[i] || {};
        if (animalExisting[i] && !animal.id) {
          return (
            t("common.Livestock") +
            " " +
            i +
            1 +
            " " +
            t("common.mustBeSelected")
          );
        }
        if (!animalExisting[i] && !animal.tag) {
          return (
            t("common.Livestock") + " " + i + 1 + " " + t("common.tagRequired")
          );
        }
        if (!animalExisting[i] && !animal.category) {
          return (
            t("common.Livestock") +
            " " +
            i +
            1 +
            " " +
            t("common.categoryRequired")
          );
        }
        if (!animal.price) {
          return (
            t("common.Livestock") +
            " " +
            i +
            1 +
            " " +
            t("common.priceRequired")
          );
        }
      }

      if (!buyerExisting && !buyerFormData.fullName) {
        return t("common.buyerFullNameRequired");
      }
      if (buyerExisting && !buyerFormData.id) {
        return t("common.buyerRequired");
      }
      if (!summaryFormData.agreedAmount) {
        return t("common.agreedAmountRequired");
      }
      if (!summaryFormData.paidAmount) {
        return "Paid amount must be filled";
      }
      if (!summaryFormData.paidAmount > !summaryFormData.agreedAmount) {
        return "ahya";
      }
      if (!summaryFormData.method) {
        return t("common.methodRequired");
      }
      return null;
    };

    const error = validateForm();
    if (error) {
      setErr(error);
      setIsSubmitting(false);
      return;
    }

    const processedAnimals = animalFormData.map((animal, index) => {
      if (animalExisting[index]) {
        return {
          id: animal.id,
          price: animal.price ? parseFloat(animal.price) : 0,
          isPickedUp: animal.isPickedUp || false,
        };
      } else {
        return {
          ...animal,
          price: animal.price ? parseFloat(animal.price) : 0,
          isPickedUp: animal.isPickedUp || false,
        };
      }
    });

    const finalData = {
      animals: processedAnimals,
      buyer: buyerExisting ? { id: buyerFormData.id } : buyerFormData,
      ...summaryFormData,
      agreedAmount: parseFloat(summaryFormData.agreedAmount),
      paidAmount: parseFloat(summaryFormData.paidAmount),
    };

    setErr("");
    setSubmitData(finalData);

    saleApi
      .createSale(finalData)
      .then(() => {
        setIsSubmitting(false);
        showSuccessToast();
        navigator.goBack();
      })
      .catch((e) => {
        showErrorToast();
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const toggleBuyerExisting = () => {
    const newValue = !buyerExisting;
    setBuyerExisting(newValue);
    if (newValue) {
      dispatch(getBuyers());
    }
  };

  const toggleAnimalExisting = (index) => {
    setAnimalExisting((prev) => {
      const newExisting = [...prev];
      newExisting[index] = !newExisting[index];

      if (newExisting[index]) {
        dispatch(getUnsoldAnimals());
      }

      setAnimalFormData((prev) => {
        const newData = [...prev];
        const currentIsPickedUp = newData[index]?.isPickedUp || false;
        const currentPrice = newData[index]?.price || "";

        newData[index] = {
          ...newData[index],
          tag: "",
          category: "",
          id: null,
          isPickedUp: currentIsPickedUp,
          price: currentPrice,
        };
        return newData;
      });

      return newExisting;
    });
  };

  const handleBuyerChange = (field, value) => {
    setBuyerFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAnimalChange = (index, field, value) => {
    setAnimalFormData((prev) => {
      const newData = [...prev];
      if (!newData[index]) {
        newData[index] = {};
      }
      newData[index] = {
        ...newData[index],
        [field]: value,
      };
      return newData;
    });
  };

  const handleExistingAnimalSelect = (index, animalId) => {
    if (animals && animals.length > 0) {
      const selectedAnimal = animals.find((animal) => animal.id === animalId);
      if (selectedAnimal) {
        setAnimalFormData((prev) => {
          const newData = [...prev];
          const currentPrice =
            newData[index]?.price || selectedAnimal.price?.toString() || "";
          const currentIsPickedUp =
            newData[index]?.isPickedUp !== undefined
              ? newData[index].isPickedUp
              : selectedAnimal.isPickedUp || false;

          newData[index] = {
            ...newData[index],
            id: animalId,
            tag: selectedAnimal.tag || "",
            category: selectedAnimal.category?.id || "",
            price: currentPrice,
            isPickedUp: currentIsPickedUp,
          };
          return newData;
        });
      }
    }
  };

  const toggleAnimalPickedUp = (index) => {
    setAnimalFormData((prev) => {
      const newData = [...prev];
      if (!newData[index]) {
        newData[index] = { isPickedUp: true, price: "" };
      } else {
        newData[index] = {
          ...newData[index],
          isPickedUp: !newData[index].isPickedUp,
        };
      }
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

  const toggleAnimalCollapsed = (index) => {
    setAnimalCollapsed((prev) => {
      const newCollapsed = [...prev];
      newCollapsed[index] = !newCollapsed[index];
      return newCollapsed;
    });
  };

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

  const inputStyles = {
    inputStyle: {
      backgroundColor: Colors.secondaryLight,
      borderRadius: 8,
      paddingHorizontal: 10,
    },
  };

  return (
    <ScrollView style={{ padding: 12 }}>
      {err ? (
        <Text
          style={{
            color: Colors.danger,
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          {err}
        </Text>
      ) : null}
      <Container sx={{ flexDirection: "column", gap: 12 }}>
        {/* Buyer Section */}
        <Card sx={{ flexDirection: "column", padding: 0 }}>
          <Container sx={{ padding: 16 }}>
            <Text onPress={toggleBuyerCollapsed}>{t("common.buyer")}</Text>
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
                  title={t("common.alreadyRegistered")}
                />
              </Container>
              {!buyerExisting && (
                <Container sx={{ marginHorizontal: 10 }}>
                  <Input
                    leftIcon={
                      t('dir') === 'rtl' ? null
                       : <Icon
                       name="id-card"
                       size={24}
                       color={Colors.secondary}
                       type="ionicon"
                     />
                    }
                    rightIcon={
                      t('dir') === 'rtl' ?  <Icon
                      name="id-card"
                      size={24}
                      color={Colors.secondary}
                      type="ionicon"
                    /> : null
                      
                    }
                    placeholder={t("common.CIN")}
                    value={buyerFormData.cin}
                    onChangeText={(value) => handleBuyerChange("cin", value)}
                    {...inputStyles}
                  />
                  <Input
                     leftIcon={
                      t('dir') === 'rtl' ? null
                       : <Icon
                       name="location"
                       size={24}
                       color={Colors.secondary}
                       type="ionicon"
                     />
                    }
                    rightIcon={
                      t('dir') === 'rtl' ?  <Icon
                      name="person"
                      size={24}
                      color={Colors.secondary}
                      type="ionicon"
                    /> : null
                      
                    }
                    placeholder={t("common.FullName")}
                    value={buyerFormData.fullName}
                    onChangeText={(value) =>
                      handleBuyerChange("fullName", value)
                    }
                    {...inputStyles}
                  />
                  <Input
                     leftIcon={
                      t('dir') === 'rtl' ? null
                       : <Icon
                       name="call"
                       size={24}
                       color={Colors.secondary}
                       type="ionicon"
                     />
                    }
                    rightIcon={
                      t('dir') === 'rtl' ? <Icon
                      name="call"
                      size={24}
                      color={Colors.secondary}
                      type="ionicon"/> : null
                      
                    }
                    placeholder={t("common.Phone")}
                    keyboardType="phone-pad"
                    style={{
                      textAlign: t('dir') === 'rtl' ? 'right' : 'left',
                    }}
                    value={buyerFormData.phone}
                    onChangeText={(value) => handleBuyerChange("phone", value)}
                    {...inputStyles}
                  />
                  <Input
                    leftIcon={
                      t('dir') === 'rtl' ? null
                       : <Icon
                       name="phone"
                       size={24}
                       color={Colors.secondary}
                       type="ionicon"
                     />
                    }
                    rightIcon={
                      t('dir') === 'rtl' ? <Icon
                      name="location"
                      size={24}
                      color={Colors.secondary}
                      type="ionicon"/> : null
                      
                    }
                    placeholder={t("common.Address")}
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
                      label={t("common.selectBuyer")}
                      focusLabel="..."
                      notFocusLabel={t("common.selectBuyer")}
                      searchLabel={t("common.buyer_placeholder")}
                      containerStyle={inputStyles}
                      selectedValue={buyerFormData.id}
                      onValueChange={(value) => handleBuyerChange("id", value)}
                      disable={buyersLoading}
                    />
                  ) : (
                    <Text>
                      {buyersLoading
                        ? t("common.loadingBuyers")
                        : t("common.noBuyersAvailable")}
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
                  {t(`common.Livestock`)} {index + 1}
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
                      checked={animalExisting[index] || false}
                      onPress={() => toggleAnimalExisting(index)}
                      iconType="material-community"
                      checkedIcon="checkbox-marked"
                      uncheckedIcon="checkbox-blank-outline"
                      checkedColor={Colors.secondary}
                      title={t("common.alreadyRegistered")}
                    />

                    <CheckBox
                      checked={animalFormData[index]?.isPickedUp || false}
                      onPress={() => toggleAnimalPickedUp(index)}
                      iconType="material-community"
                      checkedIcon="checkbox-marked"
                      uncheckedIcon="checkbox-blank-outline"
                      checkedColor={Colors.secondary}
                      title={t("common.PickedUp") + "?"}
                    />
                  </Container>

                  {animalExisting[index] ? (
                    <Container sx={{ padding: 10, gap: 12 }}>
                      {animals && animals.length > 0 ? (
                        <BaseDropdown
                          values={animals.map((animal) => ({
                            label: `${animal.tag} `,
                            value: animal.id,
                          }))}
                          label={t("common.select_animal")}
                          focusLabel="..."
                          notFocusLabel={t("common.select_animal")}
                          searchLabel={t("common.animal_placeholder")}
                          containerStyle={inputStyles}
                          selectedValue={animalFormData[index]?.id || ""}
                          onValueChange={(value) =>
                            handleExistingAnimalSelect(index, value)
                          }
                          disable={animalsLoading}
                        />
                      ) : (
                        <Text>
                          {animalsLoading
                            ? t("common.loadingAnimals")
                            : t("common.noAnimalsAvailable")}
                        </Text>
                      )}

                      <Input
                        leftIcon={
                          t('dir') === 'rtl' ? null
                           : <Icon
                          name="cash-outline"
                          type="ionicon"
                          size={24}
                          color={Colors.secondary}/>
                        }
                        rightIcon={
                          <Icon
                            name="cash-outline"
                            type="ionicon"
                            size={24}
                            color={Colors.secondary}
                          />
                        }
                        placeholder={t("common.price")}
                        keyboardType="numeric"
                        value={animalFormData[index]?.price || ""}
                        onChangeText={(value) =>
                          handleAnimalChange(index, "price", value)
                        }
                        {...inputStyles}
                      />
                    </Container>
                  ) : (
                    <Container>
                      <Input
                        leftIcon={
                          t('dir') === 'rtl' ? null
                           : <Icon
                           name="pricetag"
                           size={24}
                           color={Colors.secondary}
                           type="ionicon"
                         />
                        }
                        rightIcon={
                          <Icon
                            name="pricetag"
                            size={24}
                            color={Colors.secondary}
                            type="ionicon"
                          />
                        }
                        placeholder={t("common.tag")}
                        value={animalFormData[index]?.tag || ""}
                        onChangeText={(value) =>
                          handleAnimalChange(index, "tag", value)
                        }
                        {...inputStyles}
                      />
                      <Input
                        leftIcon={
                          t('dir') === 'rtl' ? null
                           : <Icon
                          name="cash-outline"
                          type="ionicon"
                          size={24}
                          color={Colors.secondary}/>
                        }
                        rightIcon={
                          <Icon
                            name="cash-outline"
                            type="ionicon"
                            size={24}
                            color={Colors.secondary}
                          />
                        }
                        placeholder={t("common.price")}
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
                            label: t(
                              `common.${category.typeName}`,
                              category.typeName
                            ),
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
                  )}
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
            <Text onPress={toggleSummaryCollapsed}>{t("common.payment")}</Text>
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
                  color={Colors.secondary}/>
                }
                
                placeholder={t("common.agreedAmount")}
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
                placeholder={t("common.paidAmount")}
                keyboardType="numeric"
                value={summaryFormData.paidAmount}
                onChangeText={(value) =>
                  handleSummaryChange("paidAmount", value)
                }
                {...inputStyles}
              />
              <BaseDropdown
                search={false}
                notFocusLabel={t("common.paymentMethod")}
                disable={loadingPaymentMethods}
                values={paymentMethods.map((pm) => ({
                  label: t(`common.${pm}`),
                  value: pm,
                }))}
                onValueChange={(value) => handleSummaryChange("method", value)}
                focusLabel={"a"}
                containerStyle={{ marginBottom: 15 }}
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
          title={isSubmitting ? t("common.submitting") : t("common.submitSale")}
          onPress={onSubmit}
          disabled={isSubmitting}
        >
          {t(`common.continue`)}
        </Button>
      </Container>
    </ScrollView>
  );
};

export default AddSaleScreen;
