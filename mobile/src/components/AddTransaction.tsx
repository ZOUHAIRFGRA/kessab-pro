import React, { useState, useEffect } from "react";
import "../../global.css";
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getSales } from "../features/saleSlice";
import { addTransaction } from "../features/transactionSlice";
import { useTranslation } from "react-i18next";
import { X, Check, ChevronDown } from "lucide-react-native";
import type { RootState } from "../store/store";

interface AddTransactionProps {
  onClose: () => void;
}

interface Sale {
  id: string;
  agreedAmount: number;
}

type PaymentMethod = "CASH" | "CARD" | "BANK";

const AddTransaction: React.FC<AddTransactionProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const { sales } = useSelector((state: RootState) => state.sales);
  const { t } = useTranslation();
  
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState<PaymentMethod>("CASH");
  const [transactionDate, setTransactionDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [salesModalVisible, setSalesModalVisible] = useState(false);

  useEffect(() => {
    dispatch(getSales() as any);
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

    dispatch(addTransaction(newTransaction) as any);
    onClose();
  };

  const cyclePaymentMethod = () => {
    setMethod((prev) =>
      prev === "CASH" ? "CARD" : prev === "CARD" ? "BANK" : "CASH"
    );
  };

  return (
    <Modal visible={true} animationType="slide" transparent={true}>
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="w-[350px] p-5 bg-white rounded-xl shadow-lg">
          <Text className="text-lg font-bold text-[#1e293b] mb-2.5">
            {t("common.addTransaction")}
          </Text>

          <TouchableOpacity
            onPress={() => setSalesModalVisible(true)}
            className="border border-[#cbd5e1] rounded-lg p-3 mb-3 bg-[#f8fafc] flex-row justify-between items-center"
          >
            <Text className="text-[#1e293b]">
              {selectedSale
                ? `Sale: ${selectedSale.id} - ${selectedSale.agreedAmount} MAD`
                : "Select a Sale"}
            </Text>
            <ChevronDown size={20} color="#64748b" />
          </TouchableOpacity>

          <TextInput
            keyboardType="numeric"
            placeholder="Enter Amount"
            placeholderTextColor="#94a3b8"
            value={amount}
            onChangeText={setAmount}
            className="border border-[#cbd5e1] rounded-lg p-3 mb-3 text-base bg-[#f8fafc] text-[#1e293b]"
          />

          <TouchableOpacity
            onPress={cyclePaymentMethod}
            className="border border-[#cbd5e1] rounded-lg p-3 mb-3 bg-[#f8fafc] flex-row justify-between items-center"
          >
            <Text className="text-[#1e293b]">
              {t("common.paymentMethod")}: {method}
            </Text>
            <ChevronDown size={20} color="#64748b" />
          </TouchableOpacity>

          <TextInput
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#94a3b8"
            value={transactionDate}
            onChangeText={setTransactionDate}
            className="border border-[#cbd5e1] rounded-lg p-3 mb-3 text-base bg-[#f8fafc] text-[#1e293b]"
          />

          <View className="flex-row justify-between mt-2.5 gap-3">
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 py-3 rounded-lg bg-[#94a3b8] items-center flex-row justify-center gap-2"
            >
              <X size={18} color="#fff" />
              <Text className="text-white font-semibold">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit}
              className="flex-1 py-3 rounded-lg bg-[#f59e0b] items-center flex-row justify-center gap-2"
            >
              <Check size={18} color="#fff" />
              <Text className="text-white font-semibold">
                {t("common.add")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal visible={salesModalVisible} animationType="slide">
        <View className="flex-1 p-4 bg-white">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-[#1e293b]">
              Select a Sale
            </Text>
            <TouchableOpacity
              onPress={() => setSalesModalVisible(false)}
              className="p-2 rounded-lg bg-[#f1f5f9]"
            >
              <X size={24} color="#1e293b" />
            </TouchableOpacity>
          </View>
          <ScrollView>
            {sales.map((sale: Sale) => (
              <TouchableOpacity
                key={sale.id}
                onPress={() => {
                  setSelectedSale(sale);
                  setSalesModalVisible(false);
                }}
                className="p-3 border-b border-[#e5e7eb] active:bg-[#f8fafc]"
              >
                <Text className="text-[#1e293b] text-base">
                  ID: {sale.id} - Amount: {sale.agreedAmount} MAD
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </Modal>
  );
};

export default AddTransaction;
