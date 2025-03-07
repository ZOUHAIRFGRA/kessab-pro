import { useEffect, useRef, useState } from "react";
import { View, Dimensions, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAnimalById, editAnimal, removeAnimal } from "../../features/animalSlice";
import { useTranslation } from "react-i18next";
import { useToast } from "../../hooks/useToast";
import { ImageCarousel } from "./ImageCarousel";
import { AnimalInfo } from "./AnimalInfo";
import { EditForm } from "./EditForm";
import { Container } from "./sharedStyles";
import { useNavigation } from "@react-navigation/native";
import Loading from "../global/Loading";
import FallBack, { FALLBACK_TYPE } from "../global/Fallback";
import ConfirmationModal from "../global/ConfirmationModal";
import Button from "../global/Button";

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
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
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
        imagesToDelete.forEach((path, index) => {
          formData.append("imagesToDelete", path);
        });
      } else {
      }

      for (let pair of formData._parts) {
      }

      dispatch(editAnimal({ id: editedAnimal.id, updatedAnimal: formData }))
        .then((response) => {
          showSuccessToast(t("common.Animal updated successfully"));
          setEditing(false);
          setEditedAnimal(response.payload);
          setNewImages([]);
          setImagesToDelete([]);
        })
        .catch((err) => {
          console.error("Save error:", err);
          showErrorToast(t("common.Failed to update animal"));
        });
    } catch (error) {
      console.error("HandleSave error:", error);
      showErrorToast(t("common.Failed to update animal"));
    }
  };

  const handleDeleteAnimal = () => {
    if (animal.saleId) {
      showErrorToast(t("common.Cannot delete an animal that is part of a sale"));
      return;
    }
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteAnimal = () => {
    dispatch(removeAnimal(animalId))
      .then(() => {
        showSuccessToast(t("common.Animal deleted successfully"));
        navigation.goBack();
      })
      .catch((err) => {
        console.error("Delete error:", err);
        showErrorToast(t("common.Failed to delete animal"));
      });
  };

  const startEditing = () => {
    setEditing(true);
    setImagesToDelete([]);
  };

  if (loading) return <Loading />;
  if (error) return <FallBack type={FALLBACK_TYPE.ERROR} />;

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
        {animal.saleId && (
          <Button
            type="primary"
            onPress={() => navigation.navigate("SellDetail", { saleId: animal.saleId })}
            children={t("common.viewSale")}
            textStyle={{ fontSize: 16 , color: "white" , fontWeight: "bold" }}
          />
        )}
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
      <ConfirmationModal
        visible={showDeleteConfirmation}
        toggleVisible={() => setShowDeleteConfirmation(false)}
        action={confirmDeleteAnimal}
        closable={true}
        btnParams={{ type: "danger", icon: { name: "check" }, btnText: t("common.delete") }}
        title={t("common.confirmDelete")}
        bodyText={t("common.Are you sure you want to delete this animal?")}
      />
    </Container>
  );
};