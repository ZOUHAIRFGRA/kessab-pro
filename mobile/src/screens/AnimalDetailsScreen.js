import { useEffect, useRef, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Dimensions, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { getBaseURL } from "../api/axiosInstance";
import { editAnimal, getAnimalById } from "../features/animalSlice";
import { AnimalImage, Container, InfoText, InputField } from "../components/AnimalDetailsComponents/sharedStyles";
import { MedicalLogsScreen } from "../components/AnimalDetailsComponents/MedicalLogsScreen";
import {ActivityLogsScreen} from "../components/AnimalDetailsComponents/ActivityLogsScreen";

const Tab = createMaterialTopTabNavigator();

const AnimalDetailsScreen = ({ route, navigation }) => {
  const { animalId } = route.params;
  const dispatch = useDispatch();
  const animal = useSelector((state) => state.animals.animals.find((a) => a.id === animalId));
  const loading = useSelector((state) => state.animals.loading);
  const error = useSelector((state) => state.animals.error);

  const [editing, setEditing] = useState(false);
  const [editedAnimal, setEditedAnimal] = useState({});
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (animalId) {
      dispatch(getAnimalById(animalId));
    }
  }, [dispatch, animalId]);

  useEffect(() => {
    if (animal) {
      setEditedAnimal(animal);
    }
  }, [animal]);

  const handleSave = () => {
    dispatch(editAnimal({ id: editedAnimal.id, updatedAnimal: editedAnimal }));
    setEditing(false);
  };

  const handleNext = () => {
    if (currentIndex < editedAnimal.imagePaths.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      flatListRef.current.scrollToIndex({ index: currentIndex + 1, animated: true });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      flatListRef.current.scrollToIndex({ index: currentIndex - 1, animated: true });
    }
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <Container>
      <Tab.Navigator>
        <Tab.Screen name="Details">
          {() => (
            <ScrollView style={{ padding: 16 }}>
              {editedAnimal.imagePaths && editedAnimal.imagePaths.length > 0 && (
                <View style={{ alignItems: "center" }}>
                  <FlatList
                    ref={flatListRef}
                    data={editedAnimal.imagePaths}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <AnimalImage source={{ uri: `${getBaseURL()}${item}` }} />
                    )}
                    scrollEnabled={false} 
                  />
                  <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <TouchableOpacity onPress={handlePrev} disabled={currentIndex === 0} style={{ marginRight: 10 }}>
                      <MaterialIcons name="chevron-left" size={30} color={currentIndex === 0 ? "gray" : "black"} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handleNext}
                      disabled={currentIndex === editedAnimal.imagePaths.length - 1}
                    >
                      <MaterialIcons
                        name="chevron-right"
                        size={30}
                        color={currentIndex === editedAnimal.imagePaths.length - 1 ? "gray" : "black"}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {editing ? (
                <>
                  <InputField value={editedAnimal.tag} onChangeText={(text) => setEditedAnimal({ ...editedAnimal, tag: text })} />
                  <InputField value={editedAnimal.price.toString()} onChangeText={(text) => setEditedAnimal({ ...editedAnimal, price: parseFloat(text) })} keyboardType="numeric" />
                  <InputField value={editedAnimal.weight.toString()} onChangeText={(text) => setEditedAnimal({ ...editedAnimal, weight: parseFloat(text) })} keyboardType="numeric" />
                  <InputField value={editedAnimal.sex} onChangeText={(text) => setEditedAnimal({ ...editedAnimal, sex: text })} />
                  <InputField value={editedAnimal.birthDate} onChangeText={(text) => setEditedAnimal({ ...editedAnimal, birthDate: text })} placeholder="YYYY-MM-DD" />
                  <InputField value={editedAnimal.pickUpDate} onChangeText={(text) => setEditedAnimal({ ...editedAnimal, pickUpDate: text })} placeholder="YYYY-MM-DD" />
                  <TouchableOpacity onPress={handleSave}><Text>💾 Save</Text></TouchableOpacity>
                  <TouchableOpacity onPress={() => setEditing(false)}><Text>❌ Cancel</Text></TouchableOpacity>
                </>
              ) : (
                <>
                  <InfoText>🔖 Tag: {editedAnimal.tag}</InfoText>
                  <InfoText>💰 Price: {editedAnimal.price} DH</InfoText>
                  <InfoText>⚖️ Weight: {editedAnimal.weight} kg</InfoText>
                  <InfoText>🚻 Sex: {editedAnimal.sex}</InfoText>
                  <InfoText>📅 Birth Date: {editedAnimal.birthDate}</InfoText>
                  <InfoText>📅 Pickup Date: {editedAnimal.pickUpDate}</InfoText>
                  <TouchableOpacity onPress={() => setEditing(true)}>
                    <MaterialIcons name="edit" size={20} color="blue" />
                  </TouchableOpacity>
                </>
              )}
            </ScrollView>
          )}
        </Tab.Screen>
        <Tab.Screen name="Medical Logs" component={MedicalLogsScreen}  initialParams={{ animalId }} 
 />
        <Tab.Screen name="Activity Logs" component={ActivityLogsScreen} initialParams={{animalId}} />
      </Tab.Navigator>
    </Container>
  );
};

export default AnimalDetailsScreen;





