import { useState, useEffect, Dispatch } from "react";
import { addAnimal } from "../features/animalSlice";
import * as ImagePicker from "expo-image-picker";
import { useToast } from "./useToast";
import { fetchCategories } from "../features/categorySlice";
import { AnyAction } from "@reduxjs/toolkit";

export interface UseAnimalFormReturn {
  tag: string;
  setTag: (tag: string) => void;
  sex: string;
  setSex: (sex: string) => void;
  birthDate: string;
  setBirthDate: (date: string) => void;
  price: string;
  setPrice: (price: string) => void;
  weight: string;
  setWeight: (weight: string) => void;
  images: string[];
  setImages: (images: string[]) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  newCategory: string;
  setNewCategory: (category: string) => void;
  selectedIcon: any | null;
  setSelectedIcon: (icon: any | null) => void;
  showAddCategory: boolean;
  setShowAddCategory: (show: boolean) => void;
  handleSubmit: () => Promise<void>;
}

export const useAnimalForm = (
  onClose: () => void,
  dispatch: Dispatch<AnyAction>
): UseAnimalFormReturn => {
  const [tag, setTag] = useState<string>("");
  const [sex, setSex] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [newCategory, setNewCategory] = useState<string>("");
  const [selectedIcon, setSelectedIcon] = useState<any | null>(null);
  const [showAddCategory, setShowAddCategory] = useState<boolean>(false);
  const { showSuccessToast, showErrorToast } = useToast();

  useEffect(() => {
    const getPermissions = async (): Promise<void> => {
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      const libraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (cameraPermission.status !== "granted") {
        alert("Camera permission is required.");
      }
      if (libraryPermission.status !== "granted") {
        alert("Gallery permission is required.");
      }
    };
    dispatch(fetchCategories());

    getPermissions();
  }, [dispatch]);

  const handleSubmit = async (): Promise<void> => {
    if (!tag || !sex || !birthDate || !price || !weight || !selectedCategory || images.length === 0) {
      alert("All fields and at least one image are required!");
      return;
    }

    let formData = new FormData();
    formData.append("tag", tag);
    formData.append("sex", sex);
    formData.append("birthDate", birthDate);
    formData.append("price", price);
    formData.append("weight", weight);
    formData.append("category", selectedCategory);

    images.forEach((imageUri: string) => {
      formData.append("images", {
        uri: imageUri,
        name: imageUri.split("/").pop(),
        type: `image/${imageUri.split(".").pop()}`,
      } as any);
    });

    try {
      await dispatch(addAnimal(formData));
      showSuccessToast('Animal added successfully!');
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      showErrorToast('Error adding animal!');
    }
  };

  return {
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
  };
};
