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
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addAnimal } from "../features/animalSlice";
import { fetchCategories, addCategory } from "../features/categorySlice";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { styled } from "dripsy";
import { fetchCategoriesIcons } from "../features/iconsSlice";
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
  const { categories } = useSelector((state) => state.categories);
  const { icons } = useSelector((state) => state.icons);

  const [tag, setTag] = useState("");
  const [sex, setSex] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [images, setImages] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(null);
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
        alert("Camera permission is required.");
      }
      if (libraryPermission.status !== "granted") {
        alert("Gallery permission is required.");
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

      dispatch(addCategory(categoryData));

      setNewCategory("");
      setSelectedIcon(null);
    } else {
      alert("Please fill in both category name and select an icon!");
    }
  };

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true, 
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, ...result.assets.map((asset) => asset.uri)]);
    }
  };

  

  const takeImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

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
  
    
    images.forEach((imageUri, index) => {
      let fileName = imageUri.split("/").pop();
      let fileType = fileName.split(".").pop();
  
      formData.append("images", {
        uri: imageUri,
        name: fileName,
        type: `image/${fileType}`, 
      });
    });
  
    
    formData._parts.forEach(part => console.log(part[0], part[1]));
  
    try {
      await dispatch(addAnimal(formData));
      onClose();
      
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message);
      alert("Failed to add animal.");
    }
  };
  
  
  

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
          <Input placeholder="Tag" value={tag} onChangeText={setTag} placeholderTextColor="black"  />
          <Input placeholder="Sex" value={sex} onChangeText={setSex} placeholderTextColor="black"/>
          <Input placeholder="Birth Date (YYYY-MM-DD)" value={birthDate} onChangeText={setBirthDate} placeholderTextColor="black"/>
          <Input placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" placeholderTextColor="black"/>
          <Input placeholder="Weight" value={weight} onChangeText={setWeight} keyboardType="numeric" placeholderTextColor="black"/>

          <Picker selectedValue={selectedCategory} onValueChange={setSelectedCategory}>
            {categories.map((cat) => (
              <Picker.Item key={cat.id} label={cat.typeName} value={cat.id}  color="black"/>
            ))}
          </Picker>

          <IconButton onPress={() => setShowIconDropdown(!showIconDropdown)}>
            <Text>{selectedIcon ? "Icon Selected" : "Select Icon"}</Text>
          </IconButton>

          {showIconDropdown && (
            <FlatList
              data={icons}
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedIcon(item);
                    setShowIconDropdown(false);
                  }}
                >
                  <Image source={{ uri: `${getBaseURL()}${item.iconPath}` }} style={{ width: 50, height: 50, margin: 5 }} />
                </TouchableOpacity>
              )}
            />
          )}

          <Button title="Add Category" onPress={handleAddCategory} />

          <ImagePickerButton onPress={pickImages}>
            <Text>Select Images from Gallery</Text>
          </ImagePickerButton>
          <ImagePickerButton onPress={takeImage}>
            <Text>Take Image with Camera</Text>
          </ImagePickerButton>

          <ScrollView horizontal>
            {images.map((img, index) => (
              <Image key={index} source={{ uri: img }} style={{ width: 80, height: 80, margin: 5 }} />
            ))}
          </ScrollView>

          <Button title="Add Animal" onPress={handleSubmit} />
          <Button title="Close" onPress={onClose} color="red" />
        </Container>
      </View>
    </Modal>
  );
};

export default AddAnimalModal;
