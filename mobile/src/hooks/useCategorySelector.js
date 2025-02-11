import { useEffect, useState } from "react";
import { Button, FlatList, TouchableOpacity, Image, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { addCategory } from "../features/categorySlice";
import { getBaseURL } from "../api/axiosInstance";
import { Picker } from "@react-native-picker/picker";

export const useCategorySelector = (
  categories,
  selectedCategory,
  setSelectedCategory,
  showAddCategory,
  setShowAddCategory,
  newCategory,
  setNewCategory,
  selectedIcon,
  setSelectedIcon,
  icons,
  handleSubmit
) => {
  const dispatch = useDispatch();

  const categoryPicker = (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {selectedCategory && (
        <Image
          source={{ uri: `${getBaseURL()}${categories.find((cat) => cat.id === selectedCategory)?.icon?.iconPath}` }}
          style={{ width: 30, height: 30, marginRight: 10 }}
        />
      )}
      <Picker selectedValue={selectedCategory} onValueChange={setSelectedCategory} style={{ flex: 1 }}>
        {categories.map((cat) => (
          <Picker.Item key={cat.id} label={cat.typeName} value={cat.id} color="black" />
        ))}
      </Picker>
    </View>
  );

  const handleAddCategory = () => {
    if (newCategory.trim() && selectedIcon) {
      dispatch(addCategory({ typeName: newCategory, icon: { id: selectedIcon.id } }));
      setNewCategory("");
      setSelectedIcon(null);
      setShowAddCategory(false);
    } else {
      alert("Please enter a category name and select an icon!");
    }
  };

  return { categoryPicker, handleAddCategory };
};
