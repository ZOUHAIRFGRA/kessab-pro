import { Text } from "react-native";
import Container from "../../components/global/Container";
import Button from "../../components/global/Button";
import Colors from "../../utils/Colors";
import DropdownComponent from "../../components/global/BaseDropdown";
import React, { useCallback, useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SearchBar } from "@rneui/themed";
import { FontAwesome } from "@expo/vector-icons";
import SalesListCardView from "../../components/sale/SalesListCardView";
import { useTranslation } from "react-i18next";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Dialogs from "../../components/global/Dialog";
import { Input } from "@rneui/base";
import { useDispatch, useSelector } from "react-redux";
import { getSales } from "../../features/saleSlice";
import { Pagination } from "../../components/global/Pagination";
import { fetchPaymentStatus } from "../../features/enumSlice";
import { fetchCategories } from "../../features/categorySlice";
import { formatDateToLocalDate } from "../../utils/Global";

export default function SalesScreen() {
  const [fullNameFilter, setFullNameFilter] = useState("");
  const [categoryIdFilter, setCategoryIdFilter] = useState("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("");
  const [saleDate, setSaleDate] = useState("");
  const dispatch = useDispatch();
  const navigator = useNavigation();
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [qte, setQte] = useState("1");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleDateChange = (event, selectedDate) => {
    if (event.type === "dismissed") {
      setSaleDate("");
    } else {
      setSaleDate(formatDateToLocalDate(selectedDate));
      setDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  const { totalPages } = useSelector((states) => states.sales);

  const getNextPage = (page) => {
    dispatch(
      getSales({
        page: page,
      })
    );
  };
  const { loading: loadingPaymentStatus, paymentStatus } = useSelector(
    (states) => states.enums
  );
  const { loading: categoriesLoading, categories } = useSelector(
    (states) => states.categories
  );

  useEffect(() => {
    if (categories.length < 1) {
      dispatch(fetchCategories());
    }
    if (paymentStatus.length < 1) {
      dispatch(fetchPaymentStatus());
    }
  }, [dispatch]);

  const onAddSaleClick = () => {
    if (qte <= 0 || isNaN(qte)) {
      alert("quantity must be positive");
      return;
    }
    setDialogVisible(false);
    navigator.navigate("AddSale", { qte });
  };

  useEffect(() => {
    return () => {
      setQte("1");
    };
  }, [isDialogVisible]);

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

  const { t } = useTranslation();
  return (
    <>
      <Container sx={{ paddingX: 12, paddingY: 8 }}>
        <Dialogs
          title={t("common.quantity")}
          visible={isDialogVisible}
          toggleDialog={() => setDialogVisible(!isDialogVisible)}
        >
          <Input value={qte} onChangeText={setQte} keyboardType="number-pad" />

          <Button
            type={"primary"}
            style={{
              padding: 12,
              marginRight: 12,
              marginLeft: 12,
              marginBottom: 8,
              justifyContent: "center",
              alignItems: "center",
            }}
            textStyle={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 16,
            }}
            icon={{
              name: "forward",
              color: Colors.white,
            }}
            onPress={() => onAddSaleClick()}
          >
            {t("common.continue")}
          </Button>
        </Dialogs>
        <Container sx={{ display: "flex", flexDirection: "row" }}>
          <Container sx={{ flex: 6 }}>
            <SearchBar
              containerStyle={{
                backgroundColor: "hidden",
                padding: 0,
                marginBottom: 12,
              }}
              inputContainerStyle={{ padding: 0 }}
              round
              lightTheme
              onChangeText={(v) => setFullNameFilter(v)}
              placeholder={t("common.SearchByBuyerNameOrCIN")}
              value={fullNameFilter}
            />
          </Container>
          <Text
            style={{
              flex: 1,
              textAlign: "center",
              verticalAlign: "center",
              padding: 2,
              opacity: 0.75,
            }}
          >
            <FontAwesome
              color="black"
              name="calendar"
              size={42}
              onPress={() => setShowDatePicker(true)}
            />
          </Text>
        </Container>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 6,
          }}
        >
          <Container sx={{ flex: 1 }}>
            <DropdownComponent
              values={categories?.map((category) => ({
                label: t(`common.${category.typeName}`, category.typeName),
                value: category.id,
              }))}
              disable={categoriesLoading}
              label={t("common.category")}
              focusLabel={"..."}
              notFocusLabel={t("common.category")}
              searchLabel={t("common.category_placeholder")}
              iconName="appstore-o"
              onValueChange={(v) => setCategoryIdFilter(v)}
            />
          </Container>
          <Container sx={{ flex: 1 }}>
            <DropdownComponent
              values={paymentStatus.map((pm) => ({
                label: t(`payment_type.${pm}`),
                value: pm,
              }))}
              label={t("common.payment")}
              focusLabel={"..."}
              notFocusLabel={t("common.payment")}
              searchLabel={t("common.payment_placeholder")}
              iconName="wallet"
              disable={loadingPaymentStatus}
              onValueChange={(v) => {
                setPaymentStatusFilter(v);
              }}
            />
          </Container>
        </Container>
      </Container>
      <Container sx={{ padding: 12, flex: 1 }}>
        <SalesListCardView
          fullNameFilter={fullNameFilter}
          categoryIdFilter={categoryIdFilter}
          paymentStatusFilter={paymentStatusFilter}
          saleDate={saleDate}
        />
      </Container>
      <Pagination
        pages={totalPages}
        onPageChange={(page) => getNextPage(page)}
      />
      <Button
        type="primary"
        style={{
          padding: 12,
          marginRight: 12,
          marginLeft: 12,
          marginBottom: 8,
          justifyContent: "center",
          alignItems: "center",
        }}
        textStyle={{
          color: "white",
          fontWeight: "bold",
          textAlign: "center",
          fontSize: 16,
        }}
        icon={{
          name: "plus",
          color: Colors.white,
        }}
        onPress={() => setDialogVisible(true)}
      >
        {t("common.AddNewSale")}
      </Button>
    </>
  );
}
