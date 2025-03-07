import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useImagePicker } from "../../hooks/useImagePicker";
import { getBaseURL } from "../../api/axiosInstance";
import {
  EditContainer,
  FieldContainer,
  LabelText,
  InputField,
  SaveButton,
  CancelButton,
  ActionButtons,
} from "./sharedStyles";
import IconButton from "./IconButton";
import Colors from "../../utils/Colors";

export const EditForm = ({
  editedAnimal,
  setEditedAnimal,
  newImages,
  setNewImages,
  imagesToDelete,
  setImagesToDelete,
  setEditing,
  onSave,
  isRTL,
  t,
}) => {
  const [showBirthDatePicker, setShowBirthDatePicker] = useState(false);
  const [showPickUpDatePicker, setShowPickUpDatePicker] = useState(false);
  const { pickImages, takeImage, removeImage } = useImagePicker(newImages, setNewImages);
  const baseURL = getBaseURL();

  const handleRemoveExistingImage = (imagePath) => {
    const totalImages = editedAnimal.imagePaths.length + newImages.length;
    const totalImagesAfterDeletion = totalImages - (imagesToDelete.length + 1);


    if (totalImagesAfterDeletion < 1) {
      alert(t("Cannot delete all images. At least one image must remain."));
      return;
    }

    setImagesToDelete([...imagesToDelete, imagePath]);
  };

  const displayedImages = editedAnimal.imagePaths.filter(
    (path) => !imagesToDelete.includes(path)
  );

  return (
    <EditContainer style={{ direction: isRTL ? "rtl" : "ltr" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <FieldContainer>
          <LabelText>{t("common.images")}</LabelText>
          <View style={{ flexDirection: isRTL ? "row-reverse" : "row", flexWrap: "wrap" }}>
            {displayedImages.map((path, index) => {
              const imageUri = `${baseURL}${path}`;
              return (
                <View key={`${path}-${index}`} style={{ margin: 5 }}>
                  <Image
                    source={{ uri: imageUri }}
                    style={{ width: 100, height: 100, borderRadius: 5 }}
                    defaultSource={require("../../../assets/placeholder.png")}
                    onError={(e) => console.error("Preview image error:", e.nativeEvent.error)}
                  />
                  <TouchableOpacity
                    onPress={() => handleRemoveExistingImage(path)}
                    style={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                      backgroundColor: "rgba(255, 0, 0, 0.7)",
                      borderRadius: 10,
                      padding: 2,
                    }}
                  >
                    <MaterialIcons name="close" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              );
            })}
            {newImages.map((uri, index) => (
              <View key={`new-${index}`} style={{ margin: 5 }}>
                <Image
                  source={{ uri }}
                  style={{ width: 100, height: 100, borderRadius: 5 }}
                  defaultSource={require("../../../assets/placeholder.png")}
                  onError={(e) => console.error("Preview image error:", e.nativeEvent.error)}
                />
                <TouchableOpacity
                  onPress={() => removeImage(index)}
                  style={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    backgroundColor: "rgba(255, 0, 0, 0.7)",
                    borderRadius: 10,
                    padding: 2,
                  }}
                >
                  <MaterialIcons name="close" size={20} color="white" />
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity
              onPress={pickImages}
              style={{
                width: 100,
                height: 100,
                borderWidth: 1,
                borderColor: Colors.grey,
                justifyContent: "center",
                alignItems: "center",
                margin: 5,
                borderRadius: 5,
              }}
            >
              <MaterialIcons name="add-a-photo" size={30} color={Colors.grey} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={takeImage}
              style={{
                width: 100,
                height: 100,
                borderWidth: 1,
                borderColor: Colors.grey,
                justifyContent: "center",
                alignItems: "center",
                margin: 5,
                borderRadius: 5,
              }}
            >
              <MaterialIcons name="photo-camera" size={30} color={Colors.grey} />
            </TouchableOpacity>
          </View>
        </FieldContainer>

        <FieldContainer>
          <LabelText>{t("common.tag")}</LabelText>
          <InputField
            value={editedAnimal.tag}
            onChangeText={(text) => setEditedAnimal({ ...editedAnimal, tag: text })}
            placeholder={t("common.tag")}
            textAlign={isRTL ? "right" : "left"}
          />
        </FieldContainer>

        <FieldContainer>
          <LabelText>{t("common.price")}</LabelText>
          <InputField
            value={editedAnimal.price?.toString()}
            onChangeText={(text) => setEditedAnimal({ ...editedAnimal, price: parseFloat(text) })}
            keyboardType="numeric"
            placeholder={t("common.price")}
            textAlign={isRTL ? "right" : "left"}
          />
        </FieldContainer>

        <FieldContainer>
          <LabelText>{t("common.weight")}</LabelText>
          <InputField
            value={editedAnimal.weight?.toString()}
            onChangeText={(text) => setEditedAnimal({ ...editedAnimal, weight: parseFloat(text) })}
            keyboardType="numeric"
            placeholder={t("common.weight")}
            textAlign={isRTL ? "right" : "left"}
          />
        </FieldContainer>

        <FieldContainer>
          <LabelText>{t("common.sex")}</LabelText>
          <View style={{ flexDirection: isRTL ? "row-reverse" : "row", marginTop: 5 }}>
            <IconButton
              label={t("common.male")}
              selected={editedAnimal.sex}
              onPress={() => setEditedAnimal({ ...editedAnimal, sex: "Male" })}
              value="Male"
            />
            <IconButton
              label={t("common.female")}
              selected={editedAnimal.sex}
              onPress={() => setEditedAnimal({ ...editedAnimal, sex: "Female" })}
              value="Female"
            />
          </View>
        </FieldContainer>

        <FieldContainer>
          <LabelText>{t("common.birthDate")}</LabelText>
          <TouchableOpacity onPress={() => setShowBirthDatePicker(true)}>
            <InputField
              value={editedAnimal.birthDate}
              editable={false}
              placeholder={t("common.birthDate")}
              textAlign={isRTL ? "right" : "left"}
            />
          </TouchableOpacity>
          {showBirthDatePicker && (
            <DateTimePicker
              value={editedAnimal.birthDate ? new Date(editedAnimal.birthDate) : new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowBirthDatePicker(false);
                if (selectedDate) {
                  setEditedAnimal({
                    ...editedAnimal,
                    birthDate: selectedDate.toISOString().split("T")[0],
                  });
                }
              }}
            />
          )}
        </FieldContainer>

        <FieldContainer>
          <LabelText>{t("common.pickup_date")}</LabelText>
          <TouchableOpacity onPress={() => setShowPickUpDatePicker(true)}>
            <InputField
              value={editedAnimal.pickUpDate}
              editable={false}
              placeholder={t("common.pickup_date")}
              textAlign={isRTL ? "right" : "left"}
            />
          </TouchableOpacity>
          {showPickUpDatePicker && (
            <DateTimePicker
              value={editedAnimal.pickUpDate ? new Date(editedAnimal.pickUpDate) : new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowPickUpDatePicker(false);
                if (selectedDate) {
                  setEditedAnimal({
                    ...editedAnimal,
                    pickUpDate: selectedDate.toISOString().split("T")[0],
                  });
                }
              }}
            />
          )}
        </FieldContainer>

        <ActionButtons style={{ flexDirection: isRTL ? "row-reverse" : "row" }}>
          <SaveButton onPress={onSave}>
            <Text style={{ color: "white" }}>💾 {t("common.save")}</Text>
          </SaveButton>
          <CancelButton onPress={() => setEditing(false)}>
            <Text style={{ color: "white" }}>❌ {t("common.cancel")}</Text>
          </CancelButton>
        </ActionButtons>
      </ScrollView>
    </EditContainer>
  );
};