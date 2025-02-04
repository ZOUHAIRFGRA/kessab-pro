import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert, Modal, TextInput, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "dripsy";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getTransactions, removeTransaction, editTransaction } from "../features/transactionSlice";

const Container = styled(View)({
  marginVertical: 16,
});

const TransactionItem = styled(View)({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: 16,
  borderWidth: 1,
  borderColor: "border",
  borderRadius: 8,
  backgroundColor: "white",
  marginBottom: 8,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
});

const TransactionDetails = styled(View)({
  flex: 1,
  marginRight: 10,
});

const TransactionText = styled(Text)({
  fontSize: 16,
  fontWeight: "500",
  color: "text",
});

const ActionButton = styled(TouchableOpacity)({
  padding: 8,
  marginLeft: 5,
});

export default function TransactionList() {
  const dispatch = useDispatch();
  const { transactions, loading, error } = useSelector((state) => state.transactions);
  const [modalVisible, setModalVisible] = useState(false);
  const [editedTransaction, setEditedTransaction] = useState(null);
  const [newAmount, setNewAmount] = useState("");

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  const handleDelete = (id) => {
    Alert.alert("Confirm", "Are you sure you want to delete this transaction?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => dispatch(removeTransaction(id)) },
    ]);
  };

  const handleEdit = (transaction) => {
    setEditedTransaction(transaction);
    setNewAmount(transaction.amount.toString());
    setModalVisible(true);
  };

  const handleSave = () => {
    if (!newAmount.trim()) return Alert.alert("Error", "Amount cannot be empty.");
  
    dispatch(editTransaction({ 
      id: editedTransaction.id, 
      updatedTransaction: { ...editedTransaction, amount: parseFloat(newAmount) } 
    }));
  };
  
  useEffect(() => {
    if (!modalVisible) return; 
  
    const updatedTransaction = transactions.find(t => t.id === editedTransaction?.id);
    if (updatedTransaction && updatedTransaction.amount === parseFloat(newAmount)) {
      setModalVisible(false);
      setEditedTransaction(null);
    }
  }, [transactions]);
  

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <Container>
      <ScrollView>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <TransactionItem key={transaction.id}>
              <TransactionDetails>
                <TransactionText>Amount: {transaction.amount} MAD</TransactionText>
                <Text>Method: {transaction.method}</Text>
                <Text>Payment Status: {transaction.sale.paymentStatus}</Text>
                <Text>Transaction Date: {transaction.transactionDate}</Text>
              </TransactionDetails>
              <View style={{ flexDirection: "row" }}>
                <ActionButton onPress={() => handleEdit(transaction)}>
                  <Icon name="pencil" size={24} color="#4A90E2" />
                </ActionButton>
                <ActionButton onPress={() => handleDelete(transaction.id)}>
                  <Icon name="trash-can" size={24} color="red" />
                </ActionButton>
              </View>
            </TransactionItem>
          ))
        ) : (
          <Text>No transactions available.</Text>
        )}
      </ScrollView>

      {/* Edit Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              width: 300,
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
              Edit Transaction
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
                padding: 8,
                marginBottom: 10,
              }}
              keyboardType="numeric"
              value={newAmount}
              onChangeText={setNewAmount}
            />
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} color="gray" />
              <Button title="Save" onPress={handleSave} color="green" />
            </View>
          </View>
        </View>
      </Modal>
    </Container>
  );
}
