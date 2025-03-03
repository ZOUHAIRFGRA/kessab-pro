import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getBaseURL } from "../../api/axiosInstance";
import { editAnimal, getAnimalById } from "../../features/animalSlice";
import {
  AnimalImage,
  EditButton,
  FieldContainer,
  InfoRow,
  Card,
  InfoText,
  InputField,
  Container,
  SaveButton,
  EditContainer,
  CancelButton,
  ActionButtons,
  LabelText,
} from "./sharedStyles";
import { Dimensions } from "react-native";
import Colors from "../../utils/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import IconButton from "./IconButton";
import { useToast } from "../../hooks/useToast";
import { useTranslation } from "react-i18next";
import { useImagePicker } from "../../hooks/useImagePicker";

export const AnimalDetailsTab = ({ animalId }) => {
  const { t } = useTranslation();
  const { showSuccessToast, showErrorToast } = useToast();
  const isRTL = t("dir") === "rtl";
  const screenWidth = Dimensions.get("window").width;
  const dispatch = useDispatch();
  const animal = useSelector((state) =>
    state.animals.animals.find((a) => a.id === animalId)
  );
  const loading = useSelector((state) => state.animals.loading);
  const error = useSelector((state) => state.animals.error);

  const [editing, setEditing] = useState(false);
  const [editedAnimal, setEditedAnimal] = useState({});
  const [newImages, setNewImages] = useState([]); // New images to upload
  const [imagesToDelete, setImagesToDelete] = useState([]); // Existing images marked for deletion
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const [showBirthDatePicker, setShowBirthDatePicker] = useState(false);
  const [showPickUpDatePicker, setShowPickUpDatePicker] = useState(false);

  const { pickImages, takeImage, removeImage } = useImagePicker(newImages, setNewImages);

  useEffect(() => {
    if (animalId) {
      dispatch(getAnimalById(animalId));
    }
  }, [dispatch, animalId]);

  useEffect(() => {
    if (animal) {
      setEditedAnimal(animal);
      setNewImages([]);
      setImagesToDelete([]); // Reset on animal change
    }
  }, [animal]);

  const handleRemoveExistingImage = (imagePath) => {
    if (!imagePath || typeof imagePath !== "string") {
      console.warn("Invalid image path:", imagePath);
      return;
    }
    setImagesToDelete([...imagesToDelete, imagePath]);
    const updatedImagePaths = editedAnimal.imagePaths.filter((path) => path !== imagePath);
    setEditedAnimal({
      ...editedAnimal,
      imagePaths: updatedImagePaths,
    });
  };

  const handleSave = () => {
    try {
        const formData = new FormData();
        formData.append("tag", editedAnimal.tag || "");
        formData.append("price", editedAnimal.price?.toString() || "");
        formData.append("weight", editedAnimal.weight?.toString() || "");
        formData.append("sex", editedAnimal.sex || "");
        formData.append("birthDate", editedAnimal.birthDate || "");
        if (editedAnimal.pickUpDate) {
            formData.append("pickUpDate", editedAnimal.pickUpDate);
        }
        if (editedAnimal.category) {
            formData.append("category", editedAnimal.category);
        }
        if (editedAnimal.saleId) {
            formData.append("saleId", editedAnimal.saleId);
        }

        if (editedAnimal.imagePaths && editedAnimal.imagePaths.length > 0) {
            const imagePathsJson = JSON.stringify(editedAnimal.imagePaths);
            console.log("Sending imagePaths:", imagePathsJson);
            formData.append("imagePaths", imagePathsJson);
        }

        newImages.forEach((uri, index) => {
            const uriParts = uri.split("/");
            const fileName = uriParts[uriParts.length - 1];
            formData.append("images", {
                uri,
                name: fileName,
                type: "image/jpeg",
            });
        });

        if (imagesToDelete.length > 0) {
            const imagesToDeleteJson = JSON.stringify(imagesToDelete);
            console.log("Sending imagesToDelete:", imagesToDeleteJson);
            formData.append("imagesToDelete", imagesToDeleteJson);
        }

        // Log FormData contents (for debugging, as FormData isn’t easily printable)
        for (let pair of formData._parts) {
            console.log(`FormData entry: ${pair[0]} = ${pair[1]}`);
        }

        dispatch(
            editAnimal({ id: editedAnimal.id, updatedAnimal: formData })
        ).then((response) => {
            console.log("Save response:", response);
            showSuccessToast(t("Animal updated successfully"));
            setEditing(false);
            setNewImages([]);
            setImagesToDelete([]);
        }).catch((err) => {
            console.error("Save error:", err);
            showErrorToast(t("Failed to update animal"));
        });
    } catch (error) {
        console.error("HandleSave error:", error);
        showErrorToast(t("Failed to update animal"));
    }
};

  const handleNext = () => {
    if (currentIndex < editedAnimal.imagePaths.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      flatListRef.current.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      flatListRef.current.scrollToIndex({
        index: currentIndex - 1,
        animated: true,
      });
    }
  };

  if (loading) return <Text>{t("Loading...")}</Text>;
  if (error) return <Text>{t("Error")}: {error}</Text>;
  const baseURL = getBaseURL();
  return (
    <Container>
      <ScrollView style={{ padding: 10 }}>
        {editedAnimal.imagePaths && editedAnimal.imagePaths.length > 0 && (
          <View style={{ alignItems: "center", width: screenWidth }}>
            <FlatList
              ref={flatListRef}
              data={editedAnimal.imagePaths}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              onMomentumScrollEnd={(event) => {
                const newIndex = Math.floor(
                  event.nativeEvent.contentOffset.x / screenWidth
                );
                setCurrentIndex(newIndex);
              }}
              renderItem={({ item }) => (
                <View
                  style={{
                    width: screenWidth,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {imageLoading && (
                    <ActivityIndicator
                      size="large"
                      color={Colors.primary}
                      style={{ position: "absolute" }}
                    />
                  )}
                  <AnimalImage
                    source={{ uri: `${baseURL}${item}` }}
                    onLoad={() => setImageLoading(false)}
                    onError={(e) => {
                      console.error("Image load error:", e.nativeEvent.error);
                      setImageLoading(false);
                    }}
                  />
                </View>
              )}
            />
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <TouchableOpacity
                onPress={handlePrev}
                disabled={currentIndex === 0}
                style={{ marginRight: 10 }}
              >
                <MaterialIcons
                  name="chevron-left"
                  size={50}
                  color={currentIndex === 0 ? "gray" : "black"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleNext}
                disabled={currentIndex === editedAnimal.imagePaths.length - 1}
              >
                <MaterialIcons
                  name="chevron-right"
                  size={50}
                  color={
                    currentIndex === editedAnimal.imagePaths.length - 1
                      ? "gray"
                      : "black"
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {editing ? (
          <EditContainer style={{ direction: isRTL ? "rtl" : "ltr" }}>
            {/* Existing and New Images */}
            <FieldContainer>
              <LabelText>{t("common.images")}</LabelText>
              <View
                style={{
                  flexDirection: isRTL ? "row-reverse" : "row",
                  flexWrap: "wrap",
                }}
              >
                {/* Existing Images */}
                {editedAnimal.imagePaths?.map((path, index) => {
                  const imageUri = `${baseURL}${path}`;
                  return (
                    <View key={`${path}-${index}`} style={{ margin: 5 }}>
                   <Image
  source={{ uri: imageUri }}
  style={{ width: 100, height: 100, borderRadius: 5 }}
  defaultSource={require('../../../assets/icon.png')} // Add a local placeholder image
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
                {/* New Images */}
                {newImages.map((uri, index) => (
                  <View key={index} style={{ margin: 5 }}>
                    <Image
                      source={{ uri }}
                      style={{ width: 100, height: 100, borderRadius: 5 }}
                      defaultSource={require('../../../assets/icon.png')} // Add a local placeholder image
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
                onChangeText={(text) =>
                  setEditedAnimal({ ...editedAnimal, tag: text })
                }
                placeholder={t("common.tag")}
                textAlign={isRTL ? "right" : "left"}
              />
            </FieldContainer>

            <FieldContainer>
              <LabelText>{t("common.price")}</LabelText>
              <InputField
                value={editedAnimal.price?.toString()}
                onChangeText={(text) =>
                  setEditedAnimal({ ...editedAnimal, price: parseFloat(text) })
                }
                keyboardType="numeric"
                placeholder={t("common.price")}
                textAlign={isRTL ? "right" : "left"}
              />
            </FieldContainer>

            <FieldContainer>
              <LabelText>{t("common.weight")}</LabelText>
              <InputField
                value={editedAnimal.weight?.toString()}
                onChangeText={(text) =>
                  setEditedAnimal({ ...editedAnimal, weight: parseFloat(text) })
                }
                keyboardType="numeric"
                placeholder={t("common.weight")}
                textAlign={isRTL ? "right" : "left"}
              />
            </FieldContainer>

            <FieldContainer>
              <LabelText>{t("common.sex")}</LabelText>
              <View
                style={{
                  flexDirection: isRTL ? "row-reverse" : "row",
                  marginTop: 5,
                }}
              >
                <IconButton
                  label={t("common.male")}
                  selected={editedAnimal.sex}
                  onPress={() =>
                    setEditedAnimal({ ...editedAnimal, sex: "Male" })
                  }
                  value="Male"
                />
                <IconButton
                  label={t("common.female")}
                  selected={editedAnimal.sex}
                  onPress={() =>
                    setEditedAnimal({ ...editedAnimal, sex: "Female" })
                  }
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
                  value={
                    editedAnimal.birthDate
                      ? new Date(editedAnimal.birthDate)
                      : new Date()
                  }
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
                  value={
                    editedAnimal.pickUpDate
                      ? new Date(editedAnimal.pickUpDate)
                      : new Date()
                  }
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

            <ActionButtons
              style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
            >
              <SaveButton onPress={handleSave}>
                <Text style={{ color: "white" }}>💾 {t("common.save")}</Text>
              </SaveButton>
              <CancelButton onPress={() => setEditing(false)}>
                <Text style={{ color: "white" }}>❌ {t("common.cancel")}</Text>
              </CancelButton>
            </ActionButtons>
          </EditContainer>
        ) : (
          <>
            <Card style={{ direction: isRTL ? "rtl" : "ltr" }}>
              <InfoRow>
                <InfoText>
                  🔖 {t("common.tag")}: {editedAnimal.tag}
                </InfoText>
              </InfoRow>
              <InfoRow>
                <InfoText>
                  💰 {t("common.price")}: {editedAnimal.price} DH
                </InfoText>
              </InfoRow>
              <InfoRow>
                <InfoText>
                  ⚖️ {t("common.weight")}: {editedAnimal.weight} kg
                </InfoText>
              </InfoRow>
              <InfoRow>
                <InfoText>
                  🚻 {t("common.sex")}: {editedAnimal.sex}
                </InfoText>
              </InfoRow>

              <InfoRow>
                <InfoText>
                  📅 {t("common.birthDate")}: {editedAnimal.birthDate}
                </InfoText>
              </InfoRow>
              <InfoRow>
                <InfoText>
                  📅 {t("common.pickup_date")}:{" "}
                  {editedAnimal.pickUpDate
                    ? editedAnimal.pickUpDate
                    : t("Not Available")}
                </InfoText>
              </InfoRow>

              <EditButton onPress={() => setEditing(true)}>
                <MaterialIcons name="edit" size={20} color="blue" />
              </EditButton>
            </Card>
          </>
        )}
      </ScrollView>
    </Container>
  );
};