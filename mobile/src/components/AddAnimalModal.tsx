import "../../global.css";
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
import { format } from "date-fns";
import { useImagePicker } from "../hooks/useImagePicker";
import { useCategorySelector } from "../hooks/useCategorySelector";
import { useAnimalForm } from "../hooks/useAnimalForm";
import IconButton from "./AnimalDetailsComponents/IconButton";
import Input from "./Input";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTranslation } from "react-i18next";
import { Calendar, Camera, Image as ImageIcon, X } from "lucide-react-native";
import { useGetCategoriesQuery, useGetCategoryIconsQuery } from "@/services";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

interface AddAnimalModalProps {
  visible: boolean;
  onClose: () => void;
}

interface RootState {
  categories: {
    categories: any[];
  };
  icons: {
    icons: any[];
  };
}

const AddAnimalModal: React.FC<AddAnimalModalProps> = ({ visible, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data: categoriesData } = useGetCategoriesQuery();
  const categories = categoriesData || [];
  const { data: icons } = useGetCategoryIconsQuery();
  console.log("Icons data in AddAnimalModal:", icons);
  const iconsData = icons || [];

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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
    iconsData,
    handleSubmit,
    t
  );

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      setBirthDate(format(selectedDate, "yyyy-MM-dd"));
    }
  };

  const handleImageClick = (imageUri: string) => setSelectedImage(imageUri);

  const closeModal = () => {
    setSelectedImage(null);
    onClose();
  };

  const exitViewer = () => setSelectedImage(null);

  const isRTL = t("dir") === "rtl";

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View className="flex-1 justify-center items-center bg-black/50">
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"} 
          className="flex-1 w-full"
        >
          <View className="w-[90%] bg-white p-10 rounded-xl shadow-2xl mt-11 mb-11 flex-1 self-center">
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
              <Text 
                className={`text-xl font-bold text-[#1e3a5f] mb-4 ${isRTL ? 'text-right' : 'text-left'}`}
              >
                {t("common.addAnimal")}
              </Text>

              <Input
                placeholder={t("common.tag")}
                value={tag}
                onChangeText={setTag}
                style={{ marginBottom: 12, width: "100%" }}
              />

              <View className={`flex-${isRTL ? 'row-reverse' : 'row'} items-center justify-evenly mb-3 w-full`}>
                <IconButton
                  label={t("common.male")}
                  value="Male"
                  selected={sex}
                  onPress={() => setSex("Male")}
                  color="#1e3a5f"
                  style={{ flex: 1, marginRight: isRTL ? 0 : 8 }}
                />
                <IconButton
                  label={t("common.female")}
                  value="Female"
                  selected={sex}
                  onPress={() => setSex("Female")}
                  color="#d4a574"
                  style={{ flex: 1, marginLeft: isRTL ? 8 : 0 }}
                />
              </View>

              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                className={`mb-3 flex-${isRTL ? 'row-reverse' : 'row'} items-center w-full`}
              >
                <Input
                  placeholder={t("common.birthDate")}
                  value={birthDate}
                  editable={false}
                  placeholderTextColor="black"
                  style={{ flex: 1, width: 250 }}
                />
                <View className="p-2 top-1.5">
                  <Calendar size={30} color="#1e3a5f" />
                </View>
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

              <View className={`flex-${isRTL ? 'row-reverse' : 'row'} justify-center gap-4 mb-3 w-full`}>
                <TouchableOpacity onPress={pickImages} className="p-2">
                  <ImageIcon size={40} color="#1e3a5f" />
                </TouchableOpacity>
                <TouchableOpacity onPress={takeImage} className="p-2">
                  <Camera size={40} color="#1e3a5f" />
                </TouchableOpacity>
              </View>

              <ScrollView horizontal className="mb-3 w-full">
                {images.map((img: string, index: number) => (
                  <View key={index} className="relative mr-2">
                    <TouchableOpacity onPress={() => handleImageClick(img)}>
                      <Image source={{ uri: img }} className="w-15 h-15 rounded-lg" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => removeImage(index)}
                      className="absolute -top-1 -right-1 bg-[#dc2626] rounded-full p-0.5"
                    >
                      <X size={16} color="#fff" />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>

              <View className={`flex-${isRTL ? 'row-reverse' : 'row'} justify-between gap-3 w-full`}>
                <TouchableOpacity
                  onPress={handleSubmit}
                  className="flex-1 bg-[#16a34a] py-3 rounded-lg items-center"
                >
                  <Text className="text-white text-base font-semibold">
                    {t("common.add")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={closeModal}
                  className="flex-1 bg-[#dc2626] py-3 rounded-lg items-center"
                >
                  <Text className="text-white text-base font-semibold">
                    {t("common.cancel")}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>

      {selectedImage && (
        <Modal visible={true} transparent={true} animationType="fade">
          <TouchableOpacity className="flex-1" onPress={exitViewer}>
            <View className="flex-1 justify-center items-center bg-black/80">
              <Image 
                source={{ uri: selectedImage }} 
                className="w-[90%] h-[80%]" 
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </Modal>
  );
};

export default AddAnimalModal;
