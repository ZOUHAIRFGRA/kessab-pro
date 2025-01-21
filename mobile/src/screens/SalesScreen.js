import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { styled } from "dripsy";

const Container = styled(View)({
  flex: 1,
  padding: 16,
});

const Header = styled(View)({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 16,
});

const OptionGrid = styled(View)({
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  marginVertical: 16,
});

const Option = styled(TouchableOpacity)({
  width: "48%",
  height: 100,
  backgroundColor: "#f0f0f0",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 8,
  marginBottom: 16,
});

const ModalContent = styled(View)({
  backgroundColor: "#fff",
  padding: 16,
  borderRadius: 8,
  alignItems: "center",
});

const BottomButton = styled(TouchableOpacity)({
  marginTop: 16,
  padding: 16,
  backgroundColor: "#6200ee",
  borderRadius: 8,
  alignItems: "center",
});

export default function SalesScreen({ navigation }) {
  const [quantityModalVisible, setQuantityModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [addBuyerModalVisible, setAddBuyerModalVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedAnimal, setSelectedAnimal] = useState("");
  const [chosenAnimals, setChosenAnimals] = useState([]);
  const [buyerForm, setBuyerForm] = useState({ name: "", tel: "", cin: "" });
  const [selectedBuyer, setSelectedBuyer] = useState(null);

  const handleProceed = () => {
    const animals = Array.from({ length: quantity }, (_, i) => ({
      id: i + 1,
      type: selectedAnimal,
    }));
    setChosenAnimals(animals);
    setQuantityModalVisible(false);
  };

  const handleAddBuyer = () => {
    if (buyerForm.name && buyerForm.tel && buyerForm.cin) {
      setSelectedBuyer(buyerForm);
      setBuyerForm({ name: "", tel: "", cin: "" });
      setAddBuyerModalVisible(false);
    } else {
      Alert.alert("Error", "Please fill in all fields.");
    }
  };

  const handleFinish = () => {
    setSuccessModalVisible(true);
  };

  return (
    <Container>
      <Header>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Sales</Text>
      </Header>

      <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 16 }}>
        Add New Sale
      </Text>
      <OptionGrid>
        {["Sheep", "Cow", "Goat", "Other"].map((animal) => (
          <Option
            key={animal}
            onPress={() => {
              setSelectedAnimal(animal);
              setQuantity(1);
              setQuantityModalVisible(true);
            }}
          >
            <Text>{animal}</Text>
          </Option>
        ))}
      </OptionGrid>

      {/* Quantity Modal */}
      <Modal visible={quantityModalVisible} transparent>
        <View style={styles.modalWrapper}>
          <ModalContent>
            <Text style={{ fontSize: 16, marginBottom: 16 }}>
              Set Quantity for {selectedAnimal}
            </Text>
            <View style={styles.quantityControl}>
              <TouchableOpacity
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Text style={styles.quantityButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                <Text style={styles.quantityButton}>+</Text>
              </TouchableOpacity>
            </View>
            <BottomButton onPress={handleProceed}>
              <Text style={{ color: "#fff" }}>Proceed</Text>
            </BottomButton>
          </ModalContent>
        </View>
      </Modal>

      {/* Display Chosen Animals */}
      {chosenAnimals.length > 0 && (
        <>
          <Text
            style={{ fontSize: 16, fontWeight: "bold", marginVertical: 16 }}
          >
            Chosen Animals:
          </Text>
          {chosenAnimals.map((animal) => (
            <View key={animal.id} style={styles.animalCard}>
              <Text>
                {selectedAnimal} #{animal.id}
              </Text>
            </View>
          ))}
          <BottomButton onPress={() => setAddBuyerModalVisible(true)}>
            <Text style={{ color: "#fff" }}>
              {selectedBuyer ? "Change Buyer" : "Add Buyer"}
            </Text>
          </BottomButton>
        </>
      )}

      {/* Add Buyer Modal */}
      <Modal visible={addBuyerModalVisible} transparent>
        <View style={styles.modalWrapper}>
          <ModalContent>
            <Text style={{ fontSize: 16, marginBottom: 16 }}>Add Buyer</Text>
            <TextInput
              placeholder="Name"
              value={buyerForm.name}
              onChangeText={(text) =>
                setBuyerForm({ ...buyerForm, name: text })
              }
              style={styles.input}
            />
            <TextInput
              placeholder="Tel"
              value={buyerForm.tel}
              onChangeText={(text) => setBuyerForm({ ...buyerForm, tel: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="CIN"
              value={buyerForm.cin}
              onChangeText={(text) => setBuyerForm({ ...buyerForm, cin: text })}
              style={styles.input}
            />
            <BottomButton onPress={handleAddBuyer}>
              <Text style={{ color: "#fff" }}>Add</Text>
            </BottomButton>
          </ModalContent>
        </View>
      </Modal>

      {/* Display Selected Buyer */}
      {selectedBuyer && (
        <>
          <Text style={{ fontSize: 16, marginVertical: 16 }}>Buyer Info:</Text>
          <Text>Name: {selectedBuyer.name}</Text>
          <Text>Tel: {selectedBuyer.tel}</Text>
          <Text>CIN: {selectedBuyer.cin}</Text>
          <BottomButton onPress={handleFinish}>
            <Text style={{ color: "#fff" }}>Proceed</Text>
          </BottomButton>
        </>
      )}

      {/* Success Modal */}
      <Modal visible={successModalVisible} transparent>
        <View style={styles.modalWrapper}>
          <ModalContent>
            <Text style={{ fontSize: 48, marginBottom: 16 }}>✅</Text>
            <Text style={{ fontSize: 16, marginBottom: 16 }}>
              Sale Added Successfully!
            </Text>

            {/* View Buyer Details Button */}
            <BottomButton
              onPress={() => {
                setSuccessModalVisible(false);
                navigation.navigate("Buyer", { cin: selectedBuyer.cin });
              }}
            >
              <Text style={{ color: "#fff" }}>View Buyer Details</Text>
            </BottomButton>

            {/* Download PDF Button */}
            <BottomButton onPress={() => {}}>
              <Text style={{ color: "#fff" }}>Download PDF</Text>
            </BottomButton>

            <BottomButton onPress={() => setSuccessModalVisible(false)}>
              <Text style={{ color: "#fff" }}>Close</Text>
            </BottomButton>
          </ModalContent>
        </View>
      </Modal>
    </Container>
  );
}

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 40,
    width: "100%",
  },
  quantityControl: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButton: {
    fontSize: 24,
    marginHorizontal: 20,
    color: "#6200ee",
  },
  quantityText: {
    fontSize: 18,
  },
  animalCard: {
    padding: 10,
    marginVertical: 4,
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'gray',
  },
});
