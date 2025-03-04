import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "dripsy";
import { format } from "date-fns";
import { useImagePicker } from "../hooks/useImagePicker";
import { useCategorySelector } from "../hooks/useCategorySelector";
import { useAnimalForm } from "../hooks/useAnimalForm";
import IconButton from "./AnimalDetailsComponents/IconButton";
import Input from "./Input";
import AddCategory from "./AddCategory";
import ImagePickerButton from "./ImagePickerButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTranslation } from "react-i18next";
import { fetchCategoriesIcons } from "../features/iconsSlice";
import { AddButton, CnclButton } from './AnimalDetailsComponents/sharedStyles';
import { Button } from "@rneui/themed";

const AddAnimalModal = ({ visible, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { icons } = useSelector((state) => state.icons);

  useEffect(() => {
    dispatch(fetchCategoriesIcons());
  }, [dispatch]);

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

  const { pickImages, takeImage, removeImage } = useImagePicker(images, setImages);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedImage, setSelectedImage] = useState(null);

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
    handleSubmit,    
    t                
  );

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      setBirthDate(format(selectedDate, "yyyy-MM-dd"));
    }
  };

  const handleImageClick = (imageUri) => setSelectedImage(imageUri);

  const closeModal = () => {
    setSelectedImage(null);
    onClose();
  };

  const isRTL = t("dir") === "rtl";

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <Container isRTL={isRTL}>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginBottom: 10,
                  textAlign: isRTL ? "right" : "left",
                }}
              >
                {t("common.addAnimal")}
              </Text>

              <Input placeholder={t("common.tag")} value={tag} onChangeText={setTag} />

              <View
                style={{
                  flexDirection: isRTL ? "row-reverse" : "row",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <IconButton
                  label={t("common.male")}
                  value="Male"
                  selected={sex}
                  onPress={() => setSex("Male")}
                />
                <IconButton
                  label={t("common.female")}
                  value="Female"
                  selected={sex}
                  onPress={() => setSex("Female")}
                />
              </View>

              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={{
                  marginBottom: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Input
                  placeholder={t("common.birthDate")}
                  value={birthDate}
                  editable={false}
                  placeholderTextColor="black"
                  style={{ flex: 1, width: "250" }}
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

              <Input
                placeholder={t("common.price")}
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
              />
              <Input
                placeholder={t("common.weight")}
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
              />

              {categoryPicker}

              {showAddCategory ? (
                <AddCategory
                  newCategory={newCategory}
                  setNewCategory={setNewCategory}
                  selectedIcon={selectedIcon}
                  setSelectedIcon={setSelectedIcon}
                  icons={icons}
                  handleAddCategory={handleAddCategory}
                  t={t}
                />
              ) : (
                <Button
                  title={t("common.cant_find_category_add_one?")}
                  onPress={() => setShowAddCategory(true)}
                  color="green"
                />
              )}

              <ImagePickerButton onPress={pickImages}>{t("common.select_imgs_from_gallery")}</ImagePickerButton>
              <ImagePickerButton onPress={takeImage}>{t("common.take_photo")}</ImagePickerButton>

              <ScrollView horizontal style={{ marginVertical: 10 }}>
                {images.map((img, index) => (
                  <View key={index} style={{ position: "relative" }}>
                    <TouchableOpacity onPress={() => handleImageClick(img)}>
                      <Image source={{ uri: img }} style={{ width: 80, height: 80, margin: 5 }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => removeImage(index)}
                      style={{
                        position: "absolute",
                        top: -5,
                        right: -5,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        borderRadius: 15,
                        padding: 5,
                      }}
                    >
                      <Text style={{ color: "white", fontSize: 16 }}>❌</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>

              <AddButton title={t("common.addAnimal")} onPress={handleSubmit}>
                <Text style={{ color: "white" }}>{t("common.addAnimal")}</Text>
              </AddButton>
              <CnclButton title={t("common.close")} onPress={onClose}>
                <Text style={{ color: "white" }}>{t("common.close")}</Text>
              </CnclButton>
            </ScrollView>
          </Container>
        </KeyboardAvoidingView>
      </View>
      {selectedImage && (
        <Modal visible={true} transparent={true} animationType="fade">
          <TouchableOpacity style={{ flex: 1 }} onPress={closeModal}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,0.8)",
              }}
            >
              <Image
                source={{ uri: selectedImage }}
                style={{ width: "90%", height: "80%", resizeMode: "contain" }}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </Modal>
  );
};

const Container = styled(View)(({ isRTL }) => ({
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
  alignItems: isRTL ? "flex-end" : "flex-start",
}));

export default AddAnimalModal;