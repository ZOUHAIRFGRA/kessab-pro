import { View, Text, ScrollView, TextInput } from "react-native";
import Container from "../../components/global/Container";
import Button from "../../components/global/Button";
import Colors from "../../utils/Colors";
import DropdownComponent from "../../components/global/BaseDropdown";
import React, { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SearchBar } from "@rneui/themed";
import { FontAwesome } from "@expo/vector-icons";
import SalesListCardView from "../../components/sale/SalesListCardView";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import Dialogs from "../../components/global/Dialog";
import { color } from "@rneui/base";
export default function SalesScreen() {
  const navigator = useNavigation();
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [counter, setCounter] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(null);
  };

  const onAddSaleClick = (counter) => {
    setDialogVisible(false);
    console.log(counter);
    setCounter(1);
    navigator.navigate("AddSale", { qte: counter });
  };

  const { t } = useTranslation();

  return (
    <>
      <Container sx={{ paddingX: 12, paddingY: 8 }}>
        <Dialogs
          title={"qte"}
          visible={isDialogVisible}
          toggleDialog={() => setDialogVisible(!isDialogVisible)}
        >
          <Text>{counter}</Text>
          <Container
            sx={{
              flexDirection: "row",
              gap: 5,
              justifyContent: "space-between",
            }}
          >
            <Button onPress={() => setCounter(counter + 1)}>+</Button>
            <Button onPress={() => setCounter(counter - 1)}>-</Button>
          </Container>

          <Button
            type={"primary"}
            textStyle={{ color: Colors.white }}
            onPress={() => onAddSaleClick(counter)}
          >
            salam
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
