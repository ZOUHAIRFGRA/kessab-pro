import React from "react";
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from "react-native";
import { Image } from "react-native";
import { getBaseURL } from "../api/axiosInstance"; 
const AddCategory = ({ newCategory, setNewCategory, selectedIcon, setSelectedIcon, icons, handleAddCategory }) => {
  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Add New Category</Text>
      <TextInput
        placeholder="Enter Category Name"
        value={newCategory}
        onChangeText={setNewCategory}
        style={styles.input}
      />

      <Text style={{ fontSize: 16, marginVertical: 10 }}>Select Icon</Text>
      <View style={styles.iconContainer}>
        {icons.map((icon) => (
          <TouchableOpacity key={icon.id} onPress={() => setSelectedIcon(icon)}>
            <Image
              source={{ uri: `${getBaseURL()}${icon.iconPath}` }}
              style={[
                styles.icon,
                selectedIcon?.id === icon.id && styles.selectedIcon,
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>

      <Button title="Add Category" onPress={handleAddCategory} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
  },
  iconContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  icon: {
    width: 50,
    height: 50,
    margin: 5,
    borderRadius: 25,
  },
  selectedIcon: {
    borderWidth: 3,
    borderColor: "green",
  },
});

export default AddCategory;
