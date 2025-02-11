import React from "react";
import { Picker, View, Text } from "react-native";

const CategoryPicker = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={{ fontWeight: "bold" }}>Select Category</Text>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        style={{ height: 50, width: "100%" }}
      >
        {categories.map((category) => (
          <Picker.Item key={category.id} label={category.typeName} value={category.id} />
        ))}
      </Picker>
    </View>
  );
};

export default CategoryPicker;
