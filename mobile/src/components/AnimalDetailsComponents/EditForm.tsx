import "../../../global.css";
import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from "react-native";
import { X, Camera, ImagePlus, Save, XCircle } from "lucide-react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useImagePicker } from "../../hooks/useImagePicker";
import { getBaseURL } from "../../api/axiosInstance";

// TypeScript Interfaces
interface Animal {
  id?: string;
  tag?: string;
  price?: number;
  weight?: number;
  sex?: string;
  birthDate?: string;
  pickUpDate?: string;
  category?: string;
  saleId?: string;
  imagePaths?: string[];
}

interface EditFormProps {
  editedAnimal: Animal;
  setEditedAnimal: (animal: Animal) => void;
  newImages: string[];
  setNewImages: (images: string[]) => void;
  imagesToDelete: string[];
  setImagesToDelete: (images: string[]) => void;
  setEditing: (editing: boolean) => void;
  onSave: () => void;
  isRTL: boolean;
  t: (key: string) => string;
}

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
}: EditFormProps) => {
  const [showBirthDatePicker, setShowBirthDatePicker] = useState(false);
  const [showPickUpDatePicker, setShowPickUpDatePicker] = useState(false);
  const { pickImages, takeImage, removeImage } = useImagePicker(
    newImages,
    setNewImages
  );
  const baseURL = getBaseURL();

  const handleRemoveExistingImage = (imagePath: string) => {
    const totalImages =
      (editedAnimal.imagePaths?.length || 0) + newImages.length;
    const totalImagesAfterDeletion =
      totalImages - (imagesToDelete.length + 1);

    if (totalImagesAfterDeletion < 1) {
      Alert.alert(
        t("common.warning"),
        t("Cannot delete all images. At least one image must remain.")
      );
      return;
    }

    setImagesToDelete([...imagesToDelete, imagePath]);
  };

  const displayedImages =
    editedAnimal.imagePaths?.filter(
      (path) => !imagesToDelete.includes(path)
    ) || [];

  return (
    <View className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
      <ScrollView className="p-5">
        {/* Header */}
        <View className="mb-5 pb-4 border-b border-slate-100">
          <Text className="text-slate-800 font-bold text-xl">
            {t("common.Edit Animal")}
          </Text>
        </View>

        {/* Images Section */}
        <View className="mb-5">
          <Text className="text-slate-700 font-semibold text-base mb-3">
            {t("common.images")}
          </Text>
          <View
            className="flex-row flex-wrap"
            style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
          >
            {displayedImages.map((path, index) => {
              const imageUri = `${baseURL}${path}`;
              return (
                <View key={`${path}-${index}`} className="m-1.5 relative">
                  <Image
                    source={{ uri: imageUri }}
                    className="w-24 h-24 rounded-xl"
                    defaultSource={require("../../../assets/placeholder.png")}
                    onError={(e) =>
                      console.error("Preview image error:", e.nativeEvent.error)
                    }
                  />
                  <TouchableOpacity
                    onPress={() => handleRemoveExistingImage(path)}
                    className="absolute -top-1 -right-1 bg-rose-500 rounded-full p-1 shadow-md"
                  >
                    <X size={16} color="white" />
                  </TouchableOpacity>
                </View>
              );
            })}
            {newImages.map((uri, index) => (
              <View key={`new-${index}`} className="m-1.5 relative">
                <Image
                  source={{ uri }}
                  className="w-24 h-24 rounded-xl"
                  defaultSource={require("../../../assets/placeholder.png")}
                  onError={(e) =>
                    console.error("Preview image error:", e.nativeEvent.error)
                  }
                />
                <TouchableOpacity
                  onPress={() => removeImage(index)}
                  className="absolute -top-1 -right-1 bg-rose-500 rounded-full p-1 shadow-md"
                >
                  <X size={16} color="white" />
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity
              onPress={pickImages}
              className="w-24 h-24 border-2 border-dashed border-slate-300 rounded-xl justify-center items-center m-1.5 bg-slate-50"
            >
              <ImagePlus size={28} color="#64748b" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={takeImage}
              className="w-24 h-24 border-2 border-dashed border-slate-300 rounded-xl justify-center items-center m-1.5 bg-slate-50"
            >
              <Camera size={28} color="#64748b" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tag Field */}
        <View className="mb-4">
          <Text className="text-slate-700 font-semibold text-sm mb-2">
            {t("common.tag")}
          </Text>
          <View className="bg-slate-50 border border-slate-200 rounded-xl p-3">
            <Text
              className={`text-slate-800 text-base ${
                isRTL ? "text-right" : "text-left"
              }`}
              onChangeText={(text: string) =>
                setEditedAnimal({ ...editedAnimal, tag: text })
              }
            >
              {editedAnimal.tag}
            </Text>
          </View>
        </View>

        {/* Price Field */}
        <View className="mb-4">
          <Text className="text-slate-700 font-semibold text-sm mb-2">
            {t("common.price")} (DH)
          </Text>
          <View className="bg-amber-50 border border-amber-200 rounded-xl p-3">
            <Text
              className={`text-amber-700 font-semibold text-base ${
                isRTL ? "text-right" : "text-left"
              }`}
              onChangeText={(text: string) =>
                setEditedAnimal({ ...editedAnimal, price: parseFloat(text) })
              }
            >
              {editedAnimal.price?.toString()}
            </Text>
          </View>
        </View>

        {/* Weight Field */}
        <View className="mb-4">
          <Text className="text-slate-700 font-semibold text-sm mb-2">
            {t("common.weight")} (kg)
          </Text>
          <View className="bg-slate-50 border border-slate-200 rounded-xl p-3">
            <Text
              className={`text-slate-800 text-base ${
                isRTL ? "text-right" : "text-left"
              }`}
              onChangeText={(text: string) =>
                setEditedAnimal({ ...editedAnimal, weight: parseFloat(text) })
              }
            >
              {editedAnimal.weight?.toString()}
            </Text>
          </View>
        </View>

        {/* Sex Field */}
        <View className="mb-4">
          <Text className="text-slate-700 font-semibold text-sm mb-2">
            {t("common.sex")}
          </Text>
          <View
            className="flex-row gap-3"
            style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
          >
            <TouchableOpacity
              onPress={() => setEditedAnimal({ ...editedAnimal, sex: "Male" })}
              className={`flex-1 py-3 rounded-xl border-2 items-center ${
                editedAnimal.sex === "Male"
                  ? "bg-blue-500 border-blue-500"
                  : "bg-slate-50 border-slate-200"
              }`}
            >
              <Text
                className={`font-semibold ${
                  editedAnimal.sex === "Male"
                    ? "text-white"
                    : "text-slate-600"
                }`}
              >
                {t("common.male")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                setEditedAnimal({ ...editedAnimal, sex: "Female" })
              }
              className={`flex-1 py-3 rounded-xl border-2 items-center ${
                editedAnimal.sex === "Female"
                  ? "bg-pink-500 border-pink-500"
                  : "bg-slate-50 border-slate-200"
              }`}
            >
              <Text
                className={`font-semibold ${
                  editedAnimal.sex === "Female"
                    ? "text-white"
                    : "text-slate-600"
                }`}
              >
                {t("common.female")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Birth Date */}
        <View className="mb-4">
          <Text className="text-slate-700 font-semibold text-sm mb-2">
            {t("common.birthDate")}
          </Text>
          <TouchableOpacity
            onPress={() => setShowBirthDatePicker(true)}
            className="bg-slate-50 border border-slate-200 rounded-xl p-3"
          >
            <Text
              className={`text-slate-800 text-base ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {editedAnimal.birthDate || t("common.select_date")}
            </Text>
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
        </View>

        {/* Pickup Date */}
        <View className="mb-6">
          <Text className="text-slate-700 font-semibold text-sm mb-2">
            {t("common.pickup_date")}
          </Text>
          <TouchableOpacity
            onPress={() => setShowPickUpDatePicker(true)}
            className="bg-slate-50 border border-slate-200 rounded-xl p-3"
          >
            <Text
              className={`text-slate-800 text-base ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {editedAnimal.pickUpDate || t("common.select_date")}
            </Text>
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
        </View>

        {/* Action Buttons */}
        <View
          className="flex-row gap-3 pt-4 border-t border-slate-100"
          style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
        >
          <TouchableOpacity
            onPress={onSave}
            className="flex-1 bg-emerald-500 rounded-xl py-4 flex-row items-center justify-center shadow-lg"
          >
            <Save size={20} color="white" />
            <Text className="text-white font-bold text-base ml-2">
              {t("common.save")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setEditing(false)}
            className="flex-1 bg-rose-500 rounded-xl py-4 flex-row items-center justify-center shadow-lg"
          >
            <XCircle size={20} color="white" />
            <Text className="text-white font-bold text-base ml-2">
              {t("common.cancel")}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditForm;
