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
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTranslation } from "react-i18next";
import { fetchCategoriesIcons } from "../features/iconsSlice";
import Colors from "../utils/Colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

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
    handleSubmit,
  } = useAnimalForm(onClose, dispatch);

  const { pickImages, takeImage, removeImage } = useImagePicker(images, setImages);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedImage, setSelectedImage] = useState(null);

  const { categoryPicker } = useCategorySelector(
    categories,
    selectedCategory,
    setSelectedCategory,
    false,
    () => {},
    "",
    () => {},
    null,
    () => {},
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

  const exitViewer = () => setSelectedImage(null);

  const isRTL = t("dir") === "rtl";

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <ModalOverlay>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, width: "100%" }}>
          <Container isRTL={isRTL}>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
              <ModalTitle isRTL={isRTL}>{t("common.addAnimal")}</ModalTitle>

              <Input
                placeholder={t("common.tag")}
                value={tag}
                onChangeText={setTag}
                style={{ marginBottom: 12, width: "100%" }}
              />

              <SexSelector isRTL={isRTL}>
                <IconButton
                  label={t("common.male")}
                  value="Male"
                  selected={sex}
                  onPress={() => setSex("Male")}
                  color={Colors.primary}
                  style={{ flex: 1, marginRight: isRTL ? 0 : 8 }}
                />
                <IconButton
                  label={t("common.female")}
                  value="Female"
                  selected={sex}
                  onPress={() => setSex("Female")}
                  color={Colors.secondary}
                  style={{ flex: 1, marginLeft: isRTL ? 8 : 0 }}
                />
              </SexSelector>

              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={{
                  marginBottom: 12, 
                  flexDirection: isRTL ? "row-reverse" : "row", 
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Input
                  placeholder={t("common.birthDate")}
                  value={birthDate}
                  editable={false}
                  placeholderTextColor="black"
                  style={{ flex: 1 , width:250}} 
                />
                <DateIcon>
                  <Icon name="calendar" size={30} color={Colors.primary} />
                </DateIcon>
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
                style={{ marginBottom: 12, width: "100%" }}
              />
              <Input
                placeholder={t("common.weight")}
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                style={{ marginBottom: 12, width: "100%" }}
              />

              {categoryPicker}

              <ImagePickerContainer isRTL={isRTL}>
                <ImagePickerIcon onPress={pickImages}>
                  <Icon name="image" size={40} color={Colors.info} />
                </ImagePickerIcon>
                <ImagePickerIcon onPress={takeImage}>
                  <Icon name="camera" size={40} color={Colors.info} />
                </ImagePickerIcon>
              </ImagePickerContainer>

              <ImagePreviewContainer horizontal>
                {images.map((img, index) => (
                  <ImageWrapper key={index}>
                    <TouchableOpacity onPress={() => handleImageClick(img)}>
                      <Thumbnail source={{ uri: img }} />
                    </TouchableOpacity>
                    <RemoveButton onPress={() => removeImage(index)}>
                      <Icon name="close" size={16} color={Colors.white} />
                    </RemoveButton>
                  </ImageWrapper>
                ))}
              </ImagePreviewContainer>

              <ButtonContainer isRTL={isRTL}>
                <SubmitButton onPress={handleSubmit}>
                  <ButtonText>{t("common.add")}</ButtonText>
                </SubmitButton>
                <CancelButton onPress={closeModal}>
                  <ButtonText>{t("common.cancel")}</ButtonText>
                </CancelButton>
              </ButtonContainer>
            </ScrollView>
          </Container>
        </KeyboardAvoidingView>
      </ModalOverlay>

      {selectedImage && (
        <Modal visible={true} transparent={true} animationType="fade">
          <TouchableOpacity style={{ flex: 1 }} onPress={exitViewer}>
            <ImageViewer>
              <FullImage source={{ uri: selectedImage }} />
            </ImageViewer>
          </TouchableOpacity>
        </Modal>
      )}
    </Modal>
  );
};


const ModalOverlay = styled(View)({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,0.5)",
});

const Container = styled(View)(({ isRTL }) => ({
  width: "90%",
  backgroundColor: Colors.white,
  padding: 40,
  borderRadius: 10,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 5,
  marginTop: 45,
  marginBottom: 45,
  flex: 1,
  alignSelf: "center",
  alignItems: "stretch",
}));

const ModalTitle = styled(Text)(({ isRTL }) => ({
  fontSize: 20,
  fontWeight: "700",
  color: Colors.primary,
  marginBottom: 16,
  textAlign: isRTL ? "right" : "left",
}));

const SexSelector = styled(View)(({ isRTL }) => ({
  flexDirection: isRTL ? "row-reverse" : "row",
  alignItems: "center",
  justifyContent: "space-evenly",
  marginBottom: 12,
  width: "100%",
}));

const DateIcon = styled(View)({ 
  padding: 8,
  top: 6,
});

const ImagePickerContainer = styled(View)(({ isRTL }) => ({
  flexDirection: isRTL ? "row-reverse" : "row",
  justifyContent: "center",
  gap: 16,
  marginBottom: 12,
  width: "100%",
}));

const ImagePickerIcon = styled(TouchableOpacity)({
  padding: 8,
});

const ImagePreviewContainer = styled(ScrollView)({
  marginBottom: 12,
  width: "100%",
});

const ImageWrapper = styled(View)({
  position: "relative",
  marginRight: 8,
});

const Thumbnail = styled(Image)({
  width: 60,
  height: 60,
  borderRadius: 8,
});

const RemoveButton = styled(TouchableOpacity)({
  position: "absolute",
  top: -4,
  right: -4,
  backgroundColor: Colors.danger,
  borderRadius: 12,
  padding: 2,
});

const ButtonContainer = styled(View)(({ isRTL }) => ({
  flexDirection: isRTL ? "row-reverse" : "row",
  justifyContent: "space-between",
  gap: 12,
  width: "100%",
}));

const SubmitButton = styled(TouchableOpacity)({
  flex: 1,
  backgroundColor: Colors.success,
  paddingVertical: 12,
  borderRadius: 8,
  alignItems: "center",
});

const CancelButton = styled(TouchableOpacity)({
  flex: 1,
  backgroundColor: Colors.danger,
  paddingVertical: 12,
  borderRadius: 8,
  alignItems: "center",
});

const ButtonText = styled(Text)({
  color: Colors.white,
  fontSize: 16,
  fontWeight: "600",
});

const ImageViewer = styled(View)({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,0.8)",
});

const FullImage = styled(Image)({
  width: "90%",
  height: "80%",
  resizeMode: "contain",
});

export default AddAnimalModal;