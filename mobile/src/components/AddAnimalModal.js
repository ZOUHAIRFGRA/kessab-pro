import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addAnimal } from "../features/animalSlice";
import { fetchCategories, addCategory } from "../features/categorySlice";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { styled } from "dripsy";
import { fetchCategoriesIcons } from "../features/iconsSlice"; // Assuming you have an iconsSlice
import { getBaseURL } from "../api/axiosInstance";

const Container = styled(View)({
  width: "90%",
  backgroundColor: "white",
  padding: 20,
  borderRadius: 10,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 5,
});

const Input = styled(TextInput)({
  borderWidth: 1,
  borderColor: "#ccc",
  padding: 10,
  marginBottom: 10,
  borderRadius: 5,
  fontSize: 16,
  backgroundColor: "#f9f9f9",
});

const ImagePickerButton = styled(TouchableOpacity)({
  padding: 10,
  backgroundColor: "#ddd",
  alignItems: "center",
  marginBottom: 10,
  borderRadius: 5,
});

const IconButton = styled(TouchableOpacity)({
  padding: 10,
  backgroundColor: "#ddd",
  alignItems: "center",
  marginBottom: 10,
  borderRadius: 5,
  flexDirection: "row",
  justifyContent: "space-between",
});

const AddAnimalModal = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.categories);
  const { icons } = useSelector((state) => state.icons);

  const [tag, setTag] = useState("");
  const [sex, setSex] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [image, setImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(null); // Track selected icon
  const [showIconDropdown, setShowIconDropdown] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchCategoriesIcons());

    const getPermissions = async () => {
      const cameraPermission =
        await ImagePicker.requestCameraPermissionsAsync();
      const libraryPermission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (cameraPermission.status !== "granted") {
        alert("Camera permission is required to take a photo.");
      }
      if (libraryPermission.status !== "granted") {
        alert("Gallery permission is required to select a photo.");
      }
    };

    getPermissions();
  }, [dispatch]);

  const handleAddCategory = () => {
    if (newCategory.trim() && selectedIcon) {
      const categoryData = {
        typeName: newCategory,
        icon: { id: selectedIcon.id },  
      };
  
      // console.log("add category params ", categoryData);
  
      // Dispatch the action to add the new category
      dispatch(addCategory(categoryData));
  
      // Reset fields
      setNewCategory("");
      setSelectedIcon(null);
    } else {
      alert("Please fill in both category name and select an icon!");
    }
  };
  
  

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takeImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!tag || !sex || !birthDate || !price || !weight || !selectedCategory) {
      alert("All fields are required!");
      return;
    }

    const newAnimal = {
      tag,
      sex,
      birthDate,
      price: parseFloat(price),
      weight: parseFloat(weight),
      category: selectedCategory,
      imagePaths: image,
    };

    dispatch(addAnimal(newAnimal));
    onClose();
  };

  // useEffect(() => {
  //   if (selectedIcon) {
  //     console.log(selectedIcon);
  //   }
  // }, [selectedIcon]);

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <Container>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            Add New Animal
          </Text>
          <Input
            placeholder="Tag"
            value={tag}
            onChangeText={setTag}
            placeholderTextColor="gray"
          />
          <Input
            placeholder="Sex"
            value={sex}
            onChangeText={setSex}
            placeholderTextColor="gray"
          />
          <Input
            placeholder="Birth Date (YYYY-MM-DD)"
            value={birthDate}
            onChangeText={setBirthDate}
            placeholderTextColor="gray"
          />
          <Input
            placeholder="Price"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            placeholderTextColor="gray"
          />
          <Input
            placeholder="Weight"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
            placeholderTextColor="gray"
          />
          {/* Category Picker */}
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          >
            {Array.isArray(categories) && categories.length > 0 ? (
              categories.map((cat) => (
                <Picker.Item
                  key={cat.id}
                  label={cat.typeName}
                  value={cat.id}
                  color="black"
                />
              ))
            ) : (
              <Picker.Item label="No categories available" value="" />
            )}
          </Picker>

          <IconButton onPress={() => setShowIconDropdown(!showIconDropdown)}>
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    {selectedIcon ? (
      <Image
        source={{ uri: `${getBaseURL()}${selectedIcon.iconPath}` }} // Display selected icon's URI
        style={{ width: 20, height: 20, marginRight: 10 }}
      />
    ) : (
      <Text style={{ color: "#888" }}>Select Icon</Text>
    )}
    <Input
      placeholder="Category Name"
      value={newCategory}
      onChangeText={setNewCategory} // Updating the new category name
      placeholderTextColor="gray"
      style={{ flex: 1 }}
    />
  </View>
</IconButton>


          {showIconDropdown && (
            <FlatList
            data={icons}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedIcon(item); // Store the full icon object
                  setShowIconDropdown(false);
                }}
              >
                <Image
                  source={{ uri: `${getBaseURL()}${item.iconPath}` }} // Display icon image
                  style={{ width: 50, height: 50, margin: 5 }}
                />
              </TouchableOpacity>
            )}
          />
          
          )}
          {/* Add Category Button */}
          <Button
            title="Add Category"
            onPress={handleAddCategory}
            disabled={loading}
          />
          <ImagePickerButton onPress={pickImage}>
            <Text>Select Image from Gallery</Text>
          </ImagePickerButton>
          <ImagePickerButton onPress={takeImage}>
            <Text>Take Image with Camera</Text>
          </ImagePickerButton>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 100, height: 100, marginTop: 10 }}
            />
          )}
          <Button title="Add Animal" onPress={handleSubmit} />
          <Button title="Close" onPress={onClose} color="red" />
        </Container>
      </View>
    </Modal>
  );
};

export default AddAnimalModal;
