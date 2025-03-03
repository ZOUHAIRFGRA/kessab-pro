import { useEffect, useRef, useState } from "react";
import { View, Dimensions, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAnimalById, editAnimal, deleteAnimal } from "../../features/animalSlice";
import { useTranslation } from "react-i18next";
import { useToast } from "../../hooks/useToast";
import { ImageCarousel } from "./ImageCarousel";
import { AnimalInfo } from "./AnimalInfo";
import { EditForm } from "./EditForm";
import { Container } from "./sharedStyles";
import { Text } from "dripsy";
import { useNavigation } from "@react-navigation/native";

export const AnimalDetailsTab = ({ animalId }) => {
  const { t } = useTranslation();
  const { showSuccessToast, showErrorToast } = useToast();
  const dispatch = useDispatch();
  const animal = useSelector((state) => state.animals.animals.find((a) => a.id === animalId));
  const loading = useSelector((state) => state.animals.loading);
  const error = useSelector((state) => state.animals.error);

  const [editing, setEditing] = useState(false);
  const [editedAnimal, setEditedAnimal] = useState({});
  const [newImages, setNewImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const flatListRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (animalId) {
      dispatch(getAnimalById(animalId));
    }
  }, [dispatch, animalId]);

  useEffect(() => {
    if (animal) {
      setEditedAnimal(animal);
      setNewImages([]);
      setImagesToDelete([]);
    }
  }, [animal]);

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
        console.log(`Appending new image[${index}]: ${uri}`);
        formData.append("images", {
          uri,
          name: fileName,
          type: "image/jpeg",
        });
      });

      if (imagesToDelete.length > 0) {
        imagesToDelete.forEach((path, index) => {
          console.log(`Appending imagesToDelete[${index}]: ${path}`);
          formData.append("imagesToDelete", path);
        });
      } else {
        console.log("No images to delete.");
      }

      for (let pair of formData._parts) {
        console.log(`FormData entry: ${pair[0]} = ${pair[1]}`);
      }

      dispatch(editAnimal({ id: editedAnimal.id, updatedAnimal: formData }))
        .then((response) => {
          console.log("Save response:", response);
          showSuccessToast(t("Animal updated successfully"));
          setEditing(false);
          setEditedAnimal(response.payload);
          setNewImages([]);
          setImagesToDelete([]);
        })
        .catch((err) => {
          console.error("Save error:", err);
          showErrorToast(t("Failed to update animal"));
        });
    } catch (error) {
      console.error("HandleSave error:", error);
      showErrorToast(t("Failed to update animal"));
    }
  };

  const handleDeleteAnimal = () => {
    dispatch(deleteAnimal(animalId))
      .then(() => {
        showSuccessToast(t("Animal deleted successfully"));
        navigation.goBack();
      })
      .catch((err) => {
        console.error("Delete error:", err);
        showErrorToast(t("Failed to delete animal"));
      });
  };

  const startEditing = () => {
    setEditing(true);
    setImagesToDelete([]);
  };

  if (loading) return <Text>{t("Loading...")}</Text>;
  if (error) return <Text>{t("Error")}: {error}</Text>;

  return (
    <Container>
      <ScrollView style={{ padding: 10 }}>
        <ImageCarousel
          imagePaths={editedAnimal.imagePaths}
          flatListRef={flatListRef}
          screenWidth={Dimensions.get("window").width}
          isRTL={t("dir") === "rtl"}
          t={t}
        />
        {editing ? (
          <EditForm
            editedAnimal={editedAnimal}
            setEditedAnimal={setEditedAnimal}
            newImages={newImages}
            setNewImages={setNewImages}
            imagesToDelete={imagesToDelete}
            setImagesToDelete={setImagesToDelete}
            setEditing={setEditing}
            onSave={handleSave}
            isRTL={t("dir") === "rtl"}
            t={t}
          />
        ) : (
          <AnimalInfo
            animal={editedAnimal}
            setEditing={startEditing}
            onDelete={handleDeleteAnimal}
            isRTL={t("dir") === "rtl"}
            t={t}
          />
        )}
      </ScrollView>
    </Container>
  );
};