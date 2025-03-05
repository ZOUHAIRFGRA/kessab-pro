import { Text } from "react-native";
import Container from "../../components/global/Container";
import Button from "../../components/global/Button";
import Colors from "../../utils/Colors";
import DropdownComponent from "../../components/global/BaseDropdown";
import React, { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SearchBar } from "@rneui/themed";
import { FontAwesome } from "@expo/vector-icons";
import SalesListCardView from "../../components/sale/SalesListCardView";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import Dialogs from "../../components/global/Dialog";
import { Input } from "@rneui/base";
import { useDispatch } from "react-redux";
import { getSales } from "../../features/saleSlice";

export default function SalesScreen() {
  const [typeFilter, setTypeFilter] = useState("");
  const [paimentFilter, setPaimentFilter] = useState("");
  const [buyerFullNameFilter, setBuyerFullNameFilter] = useState("");
  const [page, setPage] = useState(10);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getSales({
        page,
        paymentStatus: paimentFilter,
        categoryId: typeFilter,
        fullName: buyerFullNameFilter,
      })
    );
  }, [page, buyerFullNameFilter, typeFilter, paimentFilter]);

  const navigator = useNavigation();
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [qte, setQte] = useState("1");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(null);
  };

  const onAddSaleClick = () => {
    console.log({ qte: parseInt(qte) });

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

  const { t } = useTranslation();
  return (
    <>
      <Container sx={{ paddingX: 12, paddingY: 8 }}>
        <Dialogs
          title={"How many to sold?"}
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
            Continue
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
              onChangeText={(v) => setBuyerFullNameFilter(v)}
              placeholder={t("common.SearchByBuyerNameOrCIN")}
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
              values={[{ label: "Item 1", value: "1" }]}
              label={t("common.category")}
              focusLabel={"..."}
              notFocusLabel={t("common.category")}
              searchLabel={t("common.category_placeholder")}
              iconName="appstore-o"
            />
          </Container>
          <Container sx={{ flex: 1 }}>
            <DropdownComponent
              values={[
                { label: t(`payment_type.FULLY_PAID`), value: "FULLY_PAID" },
                {
                  label: t(`payment_type.PARTIALLY_PAID`),
                  value: "PARTIALLY_PAID",
                },
                { label: t(`payment_type.NOT_PAID`), value: "NOT_PAID" },
              ]}
              label={t("common.payment")}
              focusLabel={"..."}
              notFocusLabel={t("common.payment")}
              searchLabel={t("common.payment_placeholder")}
              iconName="wallet"
            />
          </Container>
        </Container>
      </Container>
      <Container sx={{ padding: 12, flex: 1 }}>
        <SalesListCardView />
      </Container>
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
