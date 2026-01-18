import "../../../global.css";
import { useEffect, useRef, useState } from "react";
import { View, Dimensions, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { useToast } from "../../hooks/useToast";
import { ImageCarousel } from "./ImageCarousel";
import { AnimalInfo } from "./AnimalInfo";
import { EditForm } from "./EditForm";
import { useNavigation } from "@react-navigation/native";
import Loading from "../global/Loading";
import FallBack, { FALLBACK_TYPE } from "../global/Fallback";
import ConfirmationModal from "../global/ConfirmationModal";
import Button from "../global/Button";
import { Check } from "lucide-react-native";
import { useGetAnimalByIdQuery, useUpdateAnimalMutation, useDeleteAnimalMutation } from "../../services";
import type { Animal } from "../../types/api";

interface AnimalDetailsTabProps {
  animalId: string;
}

export const AnimalDetailsTab = ({ animalId }: AnimalDetailsTabProps) => {
  const { t } = useTranslation();
  const { showSuccessToast, showErrorToast } = useToast();
  const navigation = useNavigation();
  
  // RTK Query hooks
  const { data: animal, isLoading, isError, refetch } = useGetAnimalByIdQuery(animalId, {
    skip: !animalId,
  });
  const [updateAnimal] = useUpdateAnimalMutation();
  const [deleteAnimal] = useDeleteAnimalMutation();

  const [editing, setEditing] = useState(false);
  const [editedAnimal, setEditedAnimal] = useState<Partial<Animal>>({});
  const [newImages, setNewImages] = useState<string[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    if (animal) {
      setEditedAnimal(animal);
      setNewImages([]);
      setImagesToDelete([]);
    }
  }, [animal]);

  const handleSave = async () => {
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

      newImages.forEach((uri) => {
        const uriParts = uri.split("/");
        const fileName = uriParts[uriParts.length - 1];
        formData.append("images", {
          uri,
          name: fileName,
          type: "image/jpeg",
        } as any);
      });

      if (imagesToDelete.length > 0) {
        imagesToDelete.forEach((path) => {
          formData.append("imagesToDelete", path);
        });
      }

      await updateAnimal({ id: animalId, data: formData }).unwrap();
      showSuccessToast(t("common.Animal updated successfully"));
      setEditing(false);
      setNewImages([]);
      setImagesToDelete([]);
      refetch();
    } catch (error) {
      console.error("Save error:", error);
      showErrorToast(t("common.Failed to update animal"));
    }
  };

  const handleDeleteAnimal = () => {
    if (animal?.saleId) {
      showErrorToast(
        t("common.Cannot delete an animal that is part of a sale")
      );
      return;
    }
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteAnimal = async () => {
    try {
      await deleteAnimal(animalId).unwrap();
      showSuccessToast(t("common.Animal deleted successfully"));
      navigation.goBack();
    } catch (error) {
      console.error("Delete error:", error);
      showErrorToast(t("common.Failed to delete animal"));
    }
  };

  const startEditing = () => {
    setEditing(true);
    setImagesToDelete([]);
  };

  if (isLoading) return <Loading />;
  if (isError || !animal) return <FallBack type={FALLBACK_TYPE.ERROR} />;

  return (
    <View className="flex-1 bg-slate-50">
      <ScrollView className="p-3">
        <ImageCarousel
          imagePaths={editedAnimal.imagePaths || []}
          flatListRef={flatListRef}
          screenWidth={Dimensions.get("window").width}
          isRTL={t("dir") === "rtl"}
          t={t}
        />
        {animal?.saleId && (
          <View className="mb-3">
            <Button
              onPress={() =>
                navigation.navigate("SellDetail", { saleId: animal.saleId })
              }
              children={t("common.viewSale")}
              textStyle={{ fontSize: 16, color: "white", fontWeight: "bold" }}
            />
          </View>
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
        btnParams={{
          type: "danger",
          icon: { name: "check", IconComponent: Check },
          btnText: t("common.delete"),
        }}
        title={t("common.confirmDelete")}
        bodyText={t("common.Are you sure you want to delete this animal?")}
      />
    </View>
  );
};

export default AnimalDetailsTab;
