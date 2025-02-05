import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { styled } from "dripsy";
import { useDispatch } from "react-redux";
import { editAnimal } from "../features/animalSlice";

const SectionTitle = styled(Text)({ fontSize: 18, fontWeight: "bold", marginBottom: 12 });
const ItemList = styled(ScrollView)({ marginBottom: 16 });
const ListItem = styled(TouchableOpacity)({ flexDirection: "row", padding: 16, borderWidth: 1, borderRadius: 8, marginBottom: 8, backgroundColor: "white" });
const ListItemText = styled(Text)({ fontSize: 16, fontWeight: "500" });
const ModalContainer = styled(View)({ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" });
const ModalContent = styled(View)({ width: "90%", backgroundColor: "white", padding: 20, borderRadius: 10 });
const Input = styled(TextInput)({ height: 40, borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, marginBottom: 10 });

const AnimalsList = ({ animals }) => {
  const dispatch = useDispatch();
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  const openModal = (animal) => {
    setSelectedAnimal(animal);
    setForm(animal);
    setIsEditMode(false);  // Default is view mode
    setModalVisible(true);
  };

  const handleUpdate = () => {
    dispatch(editAnimal(form));
    setModalVisible(false);
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <View>
      <SectionTitle>Animals</SectionTitle>
      <ItemList>
        {animals.map((animal) => (
          <ListItem key={animal.id} onPress={() => openModal(animal)}>
            <Image source={{ uri: `http://10.0.2.2:8080${animal.imagePaths}` }} style={{ width: 50, height: 50, borderRadius: 8 }} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <ListItemText>{animal.tag}</ListItemText>
              <Text>{animal.category.typeName}</Text>
            </View>
          </ListItem>
        ))}
      </ItemList>

      {selectedAnimal && (
        <Modal visible={modalVisible} animationType="slide" transparent>
          <ModalContainer>
            <ModalContent>
              <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Animal Details</Text>
              <Image source={{ uri: `http://10.0.2.2:8080${selectedAnimal.imagePaths}` }} style={{ width: 100, height: 100, borderRadius: 8, marginBottom: 10 }} />
              
              {isEditMode ? (
                <>
                  <Input value={form.tag} onChangeText={(text) => handleChange("tag", text)} placeholder="Tag" />
                  <Input value={form.sex} onChangeText={(text) => handleChange("sex", text)} placeholder="Sex" />
                  <Input value={form.birthDate} onChangeText={(text) => handleChange("birthDate", text)} placeholder="Birth Date" />
                  <Input value={form.price.toString()} onChangeText={(text) => handleChange("price", text)} placeholder="Price" keyboardType="numeric" />
                  <Input value={form.weight.toString()} onChangeText={(text) => handleChange("weight", text)} placeholder="Weight" keyboardType="numeric" />
                </>
              ) : (
                <>
                  <Text>Tag: {form.tag}</Text>
                  <Text>Sex: {form.sex}</Text>
                  <Text>Birth Date: {form.birthDate}</Text>
                  <Text>Price: {form.price}</Text>
                  <Text>Weight: {form.weight}</Text>
                  <Text>Category: {form.category.typeName}</Text>
                  <Image source={{ uri: `http://10.0.2.2:8080${form.category.icon.iconPath}` }} style={{ width: 50, height: 50, borderRadius: 8, marginBottom: 10 }} />
                </>
              )}

              {isEditMode ? (
                <Button title="Save Changes" onPress={handleUpdate} />
              ) : (
                <Button title="Edit" onPress={toggleEditMode} />
              )}
              <Button title="Close" color="red" onPress={() => setModalVisible(false)} />
            </ModalContent>
          </ModalContainer>
        </Modal>
      )}
    </View>
  );
};

export default AnimalsList;
