import { useState, useEffect } from "react";
import { format } from "date-fns";
import { addAnimal } from "../features/animalSlice";
import * as ImagePicker from "expo-image-picker";

export const useAnimalForm = (onClose, dispatch) => {
  const [tag, setTag] = useState("");
  const [sex, setSex] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [showAddCategory, setShowAddCategory] = useState(false);

  
  useEffect(() => {
    const getPermissions = async () => {
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      const libraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (cameraPermission.status !== "granted") {
        alert("Camera permission is required.");
      }
      if (libraryPermission.status !== "granted") {
        alert("Gallery permission is required.");
      }
    };

    getPermissions();
  }, []);

  const handleSubmit = async () => {
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

    images.forEach((imageUri) => {
      formData.append("images", {
        uri: imageUri,
        name: imageUri.split("/").pop(),
        type: `image/${imageUri.split(".").pop()}`,
      });
    });

    try {
      await dispatch(addAnimal(formData));
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to add animal.");
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
