import React from "react";
import "../../global.css";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface Category {
  id: string;
  typeName: string;
}

interface CategoryPickerProps {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (categoryId: string) => void;
}

const CategoryPicker: React.FC<CategoryPickerProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <View className="mb-2.5">
      <Text className="font-bold text-[#1e293b] mb-2">Select Category</Text>
      <View className="border border-[#cbd5e1] rounded-lg bg-[#f8fafc]">
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          style={{ height: 50 }}
        >
          {categories.map((category) => (
            <Picker.Item
              key={category.id}
              label={category.typeName}
              value={category.id}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default CategoryPicker;
