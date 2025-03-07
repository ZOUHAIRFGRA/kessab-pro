import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getSales } from "../features/saleSlice";
import { addTransaction } from "../features/transactionSlice";
import { styled } from "dripsy";
import { useTranslation } from "react-i18next";
//   flexDirection: "row",
//   justifyContent: "space-between",
//   marginTop: 12,
// });

// const PaymentMethods = ["CASH", "CARD", "BANK"];

export default function AddTransaction({ onClose }) {
  const dispatch = useDispatch();
  const { sales } = useSelector((state) => state.sales);
  const { t } = useTranslation();
  const [selectedSale, setSelectedSale] = useState(null);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("CASH");
  const [transactionDate, setTransactionDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [salesModalVisible, setSalesModalVisible] = useState(false);

  useEffect(() => {
    dispatch(getSales());
  }, [dispatch]);

  const handleSubmit = () => {
    if (!selectedSale || !amount.trim()) {
      alert("Please select a sale and enter an amount.");
      return;
    }

    const newTransaction = {
      sale: selectedSale,
      amount: parseFloat(amount),
      method,
      transactionDate,
    };

    dispatch(addTransaction(newTransaction));
    onClose();
  };

  return (
    <Modal visible={true} animationType="slide" transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <Container style={{ width: 350, borderRadius: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            {t("common.addTransaction")}
          </Text>

          <Dropdown onPress={() => setSalesModalVisible(true)}>
            <Text>
              {selectedSale
                ? `Sale: ${selectedSale.id} - ${selectedSale.agreedAmount} MAD`
                : "Select a Sale"}
            </Text>
          </Dropdown>

          <Input
            keyboardType="numeric"
            placeholder="Enter Amount"
            value={amount}
            onChangeText={setAmount}
          />

          <Dropdown
            onPress={() =>
              setMethod(
                method === "CASH" ? "CARD" : method === "CARD" ? "BANK" : "CASH"
              )
            }
          >
            <Text>
              {t("common.paymentMethod")}: {method}
            </Text>
          </Dropdown>

          <Input
            placeholder="YYYY-MM-DD"
            value={transactionDate}
            onChangeText={setTransactionDate}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Button title="Cancel" onPress={onClose} color="gray" />
            <Button
              title={t("common.add")}
              onPress={handleSubmit}
              color="green"
            />
          </View>
        </Container>
      </View>

      <Modal visible={salesModalVisible} animationType="slide">
        <View style={{ flex: 1, padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            Select a Sale
          </Text>
          <ScrollView>
            {sales.map((sale) => (
              <TouchableOpacity
                key={sale.id}
                onPress={() => {
                  setSelectedSale(sale);
                  setSalesModalVisible(false);
                }}
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  borderColor: "#ccc",
                }}
              >
                <Text>
                  ID: {sale.id} - Amount: {sale.agreedAmount} MAD
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Button title="Close" onPress={() => setSalesModalVisible(false)} />
        </View>
      </Modal>
    </Modal>
  );
}

const Container = styled(View)({
  width: "90%",
  padding: 20,
  backgroundColor: "white",
  borderRadius: 10,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 5,
});

const Input = styled(TextInput)({
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 8,
  padding: 12,
  marginBottom: 12,
  fontSize: 16,
  backgroundColor: "#f9f9f9",
});

const Dropdown = styled(TouchableOpacity)({
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 8,
  padding: 12,
  marginBottom: 12,
  backgroundColor: "#f9f9f9",
});

// const ButtonContainer = styled(View)({
