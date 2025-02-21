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
export default function SalesScreen() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(null);
  };

  const { t } = useTranslation();

  return (
    <>
      <Container sx={{ paddingX: 12, paddingY: 8 }}>
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
              placeholder="search by buyer name"
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
              label={"category"}
              focusLabel={"..."}
              notFocusLabel={"category"}
              searchLabel={"category name..."}
              iconName="appstore-o"
            />
          </Container>
          <Container sx={{ flex: 1 }}>
            <DropdownComponent
              values={[
                { label: "FULLY_PAID", value: "FULLY_PAID" },
                { label: "PARTIALLY_PAID", value: "PARTIALLY_PAID" },
                { label: "NOT_PAID", value: "NOT_PAID" },
              ]}
              label={"Payment"}
              focusLabel={"..."}
              notFocusLabel={"Payment"}
              searchLabel={"Payment type..."}
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
      >
        {t("common.AddNewSale")}
      </Button>
    </>
  );
}
