import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { styled } from "dripsy";


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
        <Title sx={{ variant: "text.heading" }}>Sales</Title>
      </Header>

      <SubTitle sx={{ variant: "text.subheading" }}>
        Add New Sale
      </SubTitle>
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

      <Modal visible={quantityModalVisible} transparent>
        <ModalWrapper>
          <ModalContent>
            <CloseButton onPress={() => setQuantityModalVisible(false)}>
              <CloseText>X</CloseText>
            </CloseButton>
            <Text style={{ fontSize: 16, marginBottom: 16 }}>
              Set Quantity for {selectedAnimal}
            </Text>
            <QuantityControl>
              <TouchableOpacity
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <QuantityButton>-</QuantityButton>
              </TouchableOpacity>
              <QuantityText>{quantity}</QuantityText>
              <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                <QuantityButton>+</QuantityButton>
              </TouchableOpacity>
            </QuantityControl>
            <BottomButton onPress={handleProceed}>
              <Text style={{ color: "#fff" }}>Proceed</Text>
            </BottomButton>
          </ModalContent>
        </ModalWrapper>
      </Modal>

      {chosenAnimals.length > 0 && (
        <>
          <Text style={{ fontSize: 16, fontWeight: "bold", marginVertical: 16 }}>
            Chosen Animals:
          </Text>
          {chosenAnimals.map((animal) => (
            <View key={animal.id}>
              <Text>{selectedAnimal} #{animal.id}</Text>
            </View>
          ))}
          <BottomButton onPress={() => setAddBuyerModalVisible(true)}>
            <Text style={{ color: "#fff" }}>
              {selectedBuyer ? "Change Buyer" : "Add Buyer"}
            </Text>
          </BottomButton>
        </>
      )}

       <Modal visible={addBuyerModalVisible} transparent>
        <ModalWrapper>
          <ModalContent>
            <CloseButton onPress={() => setAddBuyerModalVisible(false)}>
              <CloseText>X</CloseText>
            </CloseButton>
            <Text style={{ fontSize: 16, marginBottom: 16 }}>Add Buyer</Text>
            <Input
              placeholder="Name"
              placeholderTextColor="gray"
              value={buyerForm.name}
              onChangeText={(text) =>
                setBuyerForm({ ...buyerForm, name: text })
              }
            />
            <Input
              placeholder="Tel"
               placeholderTextColor="gray"
              value={buyerForm.tel}
              onChangeText={(text) => setBuyerForm({ ...buyerForm, tel: text })}
            />
            <Input
              placeholder="CIN"
               placeholderTextColor="gray"
              value={buyerForm.cin}
              onChangeText={(text) => setBuyerForm({ ...buyerForm, cin: text })}
            />
            <BottomButton onPress={handleAddBuyer}>
              <Text style={{ color: "#fff" }}>Add</Text>
            </BottomButton>
          </ModalContent>
        </ModalWrapper>
      </Modal>
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

       <Modal visible={successModalVisible} transparent>
        <ModalWrapper>
          <ModalContent>
            <CloseButton onPress={() => setSuccessModalVisible(false)}>
              <CloseText>X</CloseText>
            </CloseButton>
            <Text style={{ fontSize: 48, marginBottom: 16 }}>✅</Text>
            <Text style={{ fontSize: 16, marginBottom: 16 }}>
              Sale Added Successfully!
            </Text>

            <BottomButton
              onPress={() => {
                setSuccessModalVisible(false);
                navigation.navigate("Buyer", { cin: selectedBuyer.cin });
              }}
            >
              <Text style={{ color: "#fff" }}>View Buyer Details</Text>
            </BottomButton>

            <BottomButton onPress={() => {}}>
              <Text style={{ color: "#fff" }}>Download PDF</Text>
            </BottomButton>

            <BottomButton onPress={() => setSuccessModalVisible(false)}>
              <Text style={{ color: "#fff" }}>Close</Text>
            </BottomButton>
          </ModalContent>
        </ModalWrapper>
      </Modal>

      <BottomTextButton onPress={() => navigation.navigate("SalesHistory")}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>View My Sales</Text>
      </BottomTextButton>
    </Container>
  );
}


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

const Title = styled(Text)();
const SubTitle = styled(Text)();

const OptionGrid = styled(View)({
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  marginVertical: 16,
});

const Option = styled(TouchableOpacity)({
  width: "48%",
  height: 150,
  backgroundColor: "background",
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 1,
  borderRadius: 8,
  borderColor: "border",
  marginBottom: 16,
  padding: 10,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 3.84,
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

const BottomTextButton = styled(TouchableOpacity)({
  marginTop: 20,
  padding: 12,
  backgroundColor: "#03dac6",
  borderRadius: 8,
  alignItems: "center",
});

const QuantityControl = styled(View)({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 16,
});

const QuantityButton = styled(Text)({
  fontSize: 32,
  fontWeight: "bold",
  paddingHorizontal: 16,
});

const QuantityText = styled(Text)({
  fontSize: 24,
});

const Input = styled(TextInput)({
  borderWidth: 1,
  borderColor: "#ddd",
  borderRadius: 5,
  width: 200,
  padding: 8,
  marginBottom: 12,
});

const ModalWrapper = styled(View)({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,0.5)",
});
const CloseButton = styled(TouchableOpacity)({
  position: "absolute",
  top: 10,
  right: 10,
  padding: 8,
});
const CloseText = styled(Text)({
  fontSize: 24,
  fontWeight: "bold",
  color: "#333",
});