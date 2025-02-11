import React, { useState } from "react";
import { Modal, View, Text, Button, TouchableOpacity, ScrollView, Image, KeyboardAvoidingView, Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "dripsy";
import { format } from "date-fns";
import { useImagePicker } from "../hooks/useImagePicker";
import { useCategorySelector } from "../hooks/useCategorySelector";
import { useAnimalForm } from "../hooks/useAnimalForm";
import IconButton from "../components/IconButton";
import Input from "../components/Input";
import AddCategory from "../components/AddCategory";
import ImagePickerButton from "../components/ImagePickerButton";
import DateTimePicker from '@react-native-community/datetimepicker';

const AddAnimalModal = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { icons } = useSelector((state) => state.icons);

  const {
    tag,
    setTag,
    sex,
    setSex,
    birthDate,
    setBirthDate,
    price,
    setPrice,
    weight,
    setWeight,
    images,
    setImages,
    selectedCategory,
    setSelectedCategory,
    newCategory,
    setNewCategory,
    selectedIcon,
    setSelectedIcon,
    showAddCategory,
    setShowAddCategory,
    handleSubmit,
  } = useAnimalForm(onClose, dispatch);

  const { pickImages, takeImage } = useImagePicker(images, setImages);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date()); 

  const { categoryPicker, handleAddCategory } = useCategorySelector(
    categories,
    selectedCategory,
    setSelectedCategory,
    showAddCategory,
    setShowAddCategory,
    newCategory,
    setNewCategory,
    selectedIcon,
    setSelectedIcon,
    icons,
    handleSubmit
  );

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate); 
      setBirthDate(format(selectedDate, 'yyyy-MM-dd')); 
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
          <Container>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Add New Animal</Text>
  
              <Input placeholder="Tag" value={tag} onChangeText={setTag} />
  
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                <IconButton label="Male" selected={sex} onPress={() => setSex("Male")} />
                <IconButton label="Female" selected={sex} onPress={() => setSex("Female")} />
              </View>
  
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', width: '100%' }}
              >
                <Input 
                  placeholder="Birth Date" 
                  value={birthDate} 
                  editable={false} 
                  placeholderTextColor="black" 
                  style={{ flex: 1, width: '250'}} 
                />
                <Text style={{ marginLeft: 10, fontSize: 35 }}>📅</Text>
              </TouchableOpacity>
  
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
  
              <Input placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" />
              <Input placeholder="Weight" value={weight} onChangeText={setWeight} keyboardType="numeric" />
  
              {categoryPicker}
  
              {showAddCategory ? (
                <AddCategory
                  newCategory={newCategory}
                  setNewCategory={setNewCategory}
                  selectedIcon={selectedIcon}
                  setSelectedIcon={setSelectedIcon}
                  icons={icons}
                  handleAddCategory={handleAddCategory}
                />
              ) : (
                <Button title="Can't find your category? Add one" onPress={() => setShowAddCategory(true)} color="green" />
              )}
  
              <ImagePickerButton onPress={pickImages}>Select Images from Gallery</ImagePickerButton>
              <ImagePickerButton onPress={takeImage}>Take Image with Camera</ImagePickerButton>
  
              <ScrollView horizontal style={{ marginVertical: 10 }}>
                {images.map((img, index) => (
                  <Image key={index} source={{ uri: img }} style={{ width: 80, height: 80, margin: 5 }} />
                ))}
              </ScrollView>
  
              <Button title="Add Animal" onPress={handleSubmit} color="green" />
              <Button title="Close" onPress={onClose} color="red" />
            </ScrollView>
          </Container>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
  
};

const Container = styled(View)({
  width: "100%",  
  backgroundColor: "white",
  padding: 35,
  borderRadius: 10,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 5,
  marginTop: 45,
  marginBottom: 45,
  flex: 1,
});

export default AddAnimalModal;
