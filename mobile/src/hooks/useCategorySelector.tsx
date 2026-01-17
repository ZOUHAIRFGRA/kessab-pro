import React, { ReactElement } from "react";
import { View, Image } from "react-native";
import { useDispatch } from "react-redux";
import { addCategory } from "../features/categorySlice";
import { getBaseURL } from "../services";
import { Picker } from "@react-native-picker/picker";
import { useToast } from "./useToast";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";

export interface Category {
  id: string;
  typeName: string;
  icon?: {
    id: string;
    iconPath: string;
  };
}

export interface Icon {
  id: string;
  iconPath?: string;
}

export interface UseCategorySelectorReturn {
  categoryPicker: ReactElement;
  handleAddCategory: () => void;
}

export const useCategorySelector = (
  categories: Category[],
  selectedCategory: string | null,
  setSelectedCategory: (category: string | null) => void,
  showAddCategory: boolean,
  setShowAddCategory: (show: boolean) => void,
  newCategory: string,
  setNewCategory: (category: string) => void,
  selectedIcon: Icon | null,
  setSelectedIcon: (icon: Icon | null) => void,
  iconsData: Icon[],
  handleSubmit: () => void,
  t: (key: string) => string
): UseCategorySelectorReturn => {
  const dispatch = useDispatch<Dispatch<AnyAction>>();
  const { showSuccessToast, showErrorToast } = useToast();

  const categoryPicker = (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {selectedCategory && (
        <Image
          source={{ uri: `${getBaseURL()}${categories.find((cat) => cat.id === selectedCategory)?.icon?.iconPath}` }}
          style={{ width: 30, height: 30, marginRight: 10 }}
        />
      )}
      <Picker
        selectedValue={selectedCategory}
        onValueChange={setSelectedCategory}
        style={{ flex: 1 }}
      >
        <Picker.Item label={t("common.select_category")} value={null} color="#888" />
        {categories.map((cat) => (
          <Picker.Item key={cat.id} label={cat.typeName} value={cat.id} color="black" />
        ))}
      </Picker>
    </View>
  );

  const handleAddCategory = (): void => {
    if (!newCategory || !newCategory.trim()) {
      showErrorToast(t("common.category_name_required"));
      return;
    }
    if (!selectedIcon) {
      showErrorToast(t("common.icon_required"));
      return;
    }

    dispatch(addCategory({ typeName: newCategory.trim(), icon: { id: selectedIcon.id } }))
      .then(() => {
        showSuccessToast(t("common.category_added_success"));
        setNewCategory("");
        setSelectedIcon(null);
        setShowAddCategory(false);
      })
      .catch(() => showErrorToast(t("common.category_add_failed")));
  };

  return { categoryPicker, handleAddCategory };
};
