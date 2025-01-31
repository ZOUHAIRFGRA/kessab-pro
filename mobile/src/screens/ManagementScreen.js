import { styled } from "dripsy";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  Button,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getAnimals } from "../features/animalSlice"; 

const Container = styled(View)({
  flex: 1,
  padding: 16,
  backgroundColor: "background",
});

const SearchInput = styled(TextInput)({
  borderWidth: 1,
  borderColor: "border",
  padding: 12,
  borderRadius: 8,
  marginVertical: 16,
  height: 48,
  backgroundColor: "inputBackground",
});

const SectionTitle = styled(Text)({
  fontSize: 18,
  fontWeight: "bold",
  color: "text",
  marginBottom: 12,
});

const ItemList = styled(ScrollView)({
  marginBottom: 16,
});

const ListItem = styled(TouchableOpacity)({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: 16,
  borderWidth: 1,
  borderColor: "border",
  borderRadius: 8,
  backgroundColor: "white",
  marginBottom: 8,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
});

const ListItemText = styled(Text)({
  fontSize: 16,
  fontWeight: "500",
  color: "text",
});

const QuickActionList = styled(ScrollView)({
  marginVertical: 16,
});

const QuickActionItem = styled(TouchableOpacity)({
  backgroundColor: "#f9f9f9",
  padding: 12,
  borderRadius: 16,
  width: 120,
  height: 100,
  justifyContent: "space-around",
  alignItems: "center",
  marginRight: 16,
  borderWidth: 1,
  borderColor: "#ddd",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
});

const ActionIcon = styled(Icon)({
  color: "#4A90E2",
  fontSize: 36,
});

const ActionText = styled(Text)({
  fontSize: 14,
  fontWeight: "600",
  color: "#333",
  textAlign: "center",
});

export default function ManagementScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [actionType, setActionType] = useState(""); // 'status' or 'modify'
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [modifiedAnimal, setModifiedAnimal] = useState({});

  const dispatch = useDispatch();

  const { animals, loading, error } = useSelector((state) => state.animals);

  useEffect(() => {
    dispatch(getAnimals());
  }, [dispatch]);

  const handleSearch = (text) => {
    console.log(`Search text: ${text}`);
  };

  const handleActionPress = (animal) => {
    setSelectedAnimal(animal);
    setModalVisible(true);
  };

  const handleStatusChange = () => {
    console.log("Change status for animal:", selectedAnimal);
    setModalVisible(false);
  };

  const handleModifyAnimal = () => {
    console.log("Modify animal:", selectedAnimal, modifiedAnimal);
    setModalVisible(false);
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <Container>
      <SearchInput
        placeholder="Search for animals"
        onSubmitEditing={(e) => handleSearch(e.nativeEvent.text)}
        placeholderTextColor="black"
      />

      <SectionTitle>Animals</SectionTitle>
      <ItemList>
        {animals.map((animal, index) => (
          <ListItem
            key={index}
            onPress={() => handleActionPress(animal)} 
          >
            <Image
              source={{ uri: `http://10.0.2.2:8080${animal.imagePaths}` }}  
              style={{ width: 50, height: 50, borderRadius: 8 }}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <ListItemText>{animal.tag}</ListItemText>
              <Text>{animal.category.typeName}</Text>
            </View>
            <TouchableOpacity onPress={() => handleActionPress(animal)}>
              <Text>Action</Text>
            </TouchableOpacity>
          </ListItem>
        ))}
      </ItemList>

      <SectionTitle>Transactions</SectionTitle>
      <ItemList>
      </ItemList>

      <SectionTitle>Quick Actions</SectionTitle>
      <QuickActionList horizontal showsHorizontalScrollIndicator={false}>
        {[{ name: "Add Animal", icon: "plus", route: "AddAnimal" }].map((action, index) => (
          <QuickActionItem key={index} onPress={() => navigation.navigate(action.route)}>
            <ActionIcon name={action.icon} />
            <ActionText>{action.name}</ActionText>
          </QuickActionItem>
        ))}
      </QuickActionList>

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
          <Text>Select Action for {selectedAnimal?.tag}</Text>
          <Button title="Change Status" onPress={() => handleStatusChange()} />
          <Button title="Modify Animal" onPress={() => setActionType("modify")} />

          {actionType === "modify" ? (
                 
                  <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
                    <Text>Edit Animal: {selectedAnimal?.tag}</Text>
                    <ScrollView>
                      <TextInput
                        placeholder="Tag"
                        value={modifiedAnimal.tag || selectedAnimal?.tag}
                        onChangeText={(text) =>
                          setModifiedAnimal((prev) => ({ ...prev, tag: text }))
                        }
                      />
                      <TextInput
                        placeholder="Sex"
                        value={modifiedAnimal.sex || selectedAnimal?.sex}
                        onChangeText={(text) =>
                          setModifiedAnimal((prev) => ({ ...prev, sex: text }))
                        }
                      />
                      <TextInput
                        placeholder="Birth Date (YYYY-MM-DD)"
                        value={modifiedAnimal.birthDate || selectedAnimal?.birthDate}
                        onChangeText={(text) =>
                          setModifiedAnimal((prev) => ({ ...prev, birthDate: text }))
                        }
                      />
                      <TextInput
                        placeholder="Price"
                        value={String(modifiedAnimal.price || selectedAnimal?.price)}
                        keyboardType="numeric"
                        onChangeText={(text) =>
                          setModifiedAnimal((prev) => ({ ...prev, price: parseFloat(text) || 0 }))
                        }
                      />
                      <TextInput
                        placeholder="Weight"
                        value={String(modifiedAnimal.weight || selectedAnimal?.weight)}
                        keyboardType="numeric"
                        onChangeText={(text) =>
                          setModifiedAnimal((prev) => ({ ...prev, weight: parseFloat(text) || 0 }))
                        }
                      />
                      <TextInput
                        placeholder="Pick-up Date (YYYY-MM-DD)"
                        value={modifiedAnimal.pickUpDate || selectedAnimal?.pickUpDate}
                        onChangeText={(text) =>
                          setModifiedAnimal((prev) => ({ ...prev, pickUpDate: text }))
                        }
                      />
                      <TextInput
                        placeholder="Image Path"
                        value={modifiedAnimal.imagePaths || selectedAnimal?.imagePaths}
                        onChangeText={(text) =>
                          setModifiedAnimal((prev) => ({ ...prev, imagePaths: text }))
                        }
                      />
                    </ScrollView>
                    <Button title="Save Changes" onPress={handleModifyAnimal} />
                    <Button title="Close" onPress={() => setModalVisible(false)} />
                  </View>
                
          
          ):null}
        </View>
      </Modal>
    </Container>
  );
}
