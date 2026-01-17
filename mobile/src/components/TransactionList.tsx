import "../../global.css";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getTransactions,
  removeTransaction,
  editTransaction,
} from "../features/transactionSlice";
import { Pencil, Trash2 } from "lucide-react-native";

interface Transaction {
  id: string;
  amount: number;
  method: string;
  transactionDate: string;
  sale: {
    paymentStatus: string;
  };
}

interface RootState {
  transactions: {
    transactions: Transaction[];
    loading: boolean;
    error: string | null;
  };
}

const TransactionList: React.FC = () => {
  const dispatch = useDispatch();
  const { transactions, loading, error } = useSelector(
    (state: RootState) => state.transactions
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [editedTransaction, setEditedTransaction] = useState<Transaction | null>(null);
  const [newAmount, setNewAmount] = useState("");

  useEffect(() => {
    dispatch(getTransactions() as any);
  }, [dispatch]);

  const handleDelete = (id: string) => {
    Alert.alert(
      "Confirm",
      "Are you sure you want to delete this transaction?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => dispatch(removeTransaction(id) as any),
        },
      ]
    );
  };

  const handleEdit = (transaction: Transaction) => {
    setEditedTransaction(transaction);
    setNewAmount(transaction.amount.toString());
    setModalVisible(true);
  };

  const handleSave = () => {
    if (!newAmount.trim())
      return Alert.alert("Error", "Amount cannot be empty.");

    if (editedTransaction) {
      dispatch(
        editTransaction({
          id: editedTransaction.id,
          updatedTransaction: {
            ...editedTransaction,
            amount: parseFloat(newAmount),
          },
        }) as any
      );
    }
  };

  useEffect(() => {
    if (!modalVisible) return;

    const updatedTransaction = transactions.find(
      (t) => t.id === editedTransaction?.id
    );
    if (
      updatedTransaction &&
      updatedTransaction.amount === parseFloat(newAmount)
    ) {
      setModalVisible(false);
      setEditedTransaction(null);
    }
  }, [transactions]);

  if (loading) return <Text className="text-[#1e3a5f]">Loading...</Text>;
  if (error) return <Text className="text-[#dc2626]">Error: {error}</Text>;

  return (
    <View className="my-4">
      <ScrollView>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <View
              key={transaction.id}
              className="flex-row items-center justify-between p-4 border border-[#d4a574] rounded-lg bg-white mb-2 shadow-sm"
            >
              <View className="flex-1 mr-2.5">
                <Text className="text-base font-medium text-[#1e3a5f]">
                  Amount: {transaction.amount} MAD
                </Text>
                <Text className="text-[#4b5563]">Method: {transaction.method}</Text>
                <Text className="text-[#4b5563]">
                  Payment Status: {transaction.sale.paymentStatus}
                </Text>
                <Text className="text-[#4b5563]">
                  Transaction Date: {transaction.transactionDate}
                </Text>
              </View>
              <View className="flex-row">
                <TouchableOpacity
                  onPress={() => handleEdit(transaction)}
                  className="p-2 ml-1.5"
                >
                  <Pencil size={24} color="#1e3a5f" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDelete(transaction.id)}
                  className="p-2 ml-1.5"
                >
                  <Trash2 size={24} color="#dc2626" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text className="text-[#6b7280]">No transactions available.</Text>
        )}
      </ScrollView>

      {/* Edit Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="w-[300px] bg-white p-5 rounded-xl shadow-2xl">
            <Text className="text-lg font-bold mb-2.5 text-[#1e3a5f]">
              Edit Transaction
            </Text>
            <TextInput
              className="border border-[#d4a574] rounded-lg p-2 mb-2.5 text-[#1e3a5f]"
              keyboardType="numeric"
              value={newAmount}
              onChangeText={setNewAmount}
            />
            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="bg-[#6b7280] px-4 py-2 rounded-lg flex-1 mr-2"
              >
                <Text className="text-white text-center font-semibold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSave}
                className="bg-[#1e3a5f] px-4 py-2 rounded-lg flex-1 ml-2"
              >
                <Text className="text-white text-center font-semibold">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TransactionList;
