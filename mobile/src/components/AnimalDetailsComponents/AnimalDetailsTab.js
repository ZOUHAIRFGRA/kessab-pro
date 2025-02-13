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
import IconButton from "../IconButton";
import { useToast } from "../../hooks/useToast";
import { useTranslation } from "react-i18next";
export const AnimalDetailsTab = ({ animalId }) => {
  const {t} = useTranslation();
    const { showSuccessToast, showErrorToast } = useToast();
  const screenWidth = Dimensions.get("window").width;
  const dispatch = useDispatch();
  const animal = useSelector((state) =>
    state.animals.animals.find((a) => a.id === animalId)
  );
  const loading = useSelector((state) => state.animals.loading);
  const error = useSelector((state) => state.animals.error);

  const [editing, setEditing] = useState(false);
  const [editedAnimal, setEditedAnimal] = useState({});
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const [showBirthDatePicker, setShowBirthDatePicker] = useState(false);
  const [showPickUpDatePicker, setShowPickUpDatePicker] = useState(false);
  useEffect(() => {
    if (animalId) {
      dispatch(getAnimalById(animalId));
    }
  }, [dispatch, animalId]);

  useEffect(() => {
    if (animal) {
      setEditedAnimal(animal);
    }
  }, [animal]);

  const handleSave = () => {
    try {
      dispatch(
        editAnimal({ id: editedAnimal.id, updatedAnimal: editedAnimal })
      );
      showSuccessToast("Animal updated successfully");
     setEditing(false);

    } catch (error) {
        showErrorToast("Failed to update animal");
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

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

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
                    source={{ uri: `${getBaseURL()}${item}` }}
                    onLoad={() => setImageLoading(false)}
                    onError={() => setImageLoading(false)}
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
          <EditContainer>
            <FieldContainer>
              <LabelText>{t("common.tag")}</LabelText>
              <InputField
                value={editedAnimal.tag}
                onChangeText={(text) =>
                  setEditedAnimal({ ...editedAnimal, tag: text })
                }
                placeholder="Tag"
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
                placeholder="Price"
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
                placeholder="Weight"
              />
            </FieldContainer>

            <FieldContainer>
              <LabelText>{t("common.sex")}</LabelText>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <IconButton
                  label={t("common.male")}
                  selected={editedAnimal.sex}
                  onPress={() =>
                    setEditedAnimal({ ...editedAnimal, sex: "Male" })
                  }
                />
                <IconButton
                  label={t("common.female")}
                  selected={editedAnimal.sex}
                  onPress={() =>
                    setEditedAnimal({ ...editedAnimal, sex: "Female" })
                  }
                />
              </View>
            </FieldContainer>

            <FieldContainer>
              <LabelText>{t("common.birthDate")}</LabelText>
              <TouchableOpacity onPress={() => setShowBirthDatePicker(true)}>
                <InputField
                  value={editedAnimal.birthDate}
                  editable={false}
                  placeholder="YYYY-MM-DD"
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
                  placeholder="YYYY-MM-DD"
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

            <ActionButtons>
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
            <Card>
              <InfoRow>
                <InfoText>🔖 Tag: {editedAnimal.tag}</InfoText>
              </InfoRow>
              <InfoRow>
                <InfoText>💰 Price: {editedAnimal.price} DH</InfoText>
              </InfoRow>
              <InfoRow>
                <InfoText>⚖️ Weight: {editedAnimal.weight} kg</InfoText>
              </InfoRow>
              <InfoRow>
                <InfoText>🚻 Sex: {editedAnimal.sex}</InfoText>
              </InfoRow>

              <InfoRow>
                <InfoText>📅 Birth Date: {editedAnimal.birthDate}</InfoText>
              </InfoRow>
              <InfoRow>
                <InfoText>
                  📅 Pickup Date:{" "}
                  {editedAnimal.pickUpDate
                    ? editedAnimal.pickUpDate
                    : "Not Available"}
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
