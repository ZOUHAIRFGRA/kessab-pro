import { styled } from "dripsy";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getAnimalMedicalLogs,
  modifyAnimalMedicalLog,
} from "../features/animalMedicalLogSlice";
import {
  getAnimalActivitiesLogs,
  modifyAnimalActivityLog,
} from "../features/animalActivitiesLogSlice";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { getBaseURL } from "../api/axiosInstance";
import { editAnimal } from "../features/animalSlice";

const Tab = createMaterialTopTabNavigator();

const Container = styled(View)({ flex: 1, backgroundColor: "background" });
const AnimalImage = styled(Image)({
  width: "100%",
  height: 200,
  borderRadius: 10,
  marginBottom: 16,
});
const InfoText = styled(Text)({
  fontSize: 16,
  color: "text",
  paddingVertical: 4,
  fontWeight: "500",
});
const EmptyState = styled(View)({ alignItems: "center", marginTop: 20 });
const LogCard = styled(View)({
  backgroundColor: "cardBackground",
  padding: 14,
  marginBottom: 10,
  borderRadius: 8,
});
const LogText = styled(Text)({
  fontSize: 15,
  fontWeight: "500",
  color: "text",
});
const InputField = styled(TextInput)({
  fontSize: 15,
  color: "text",
  borderBottomWidth: 1,
  marginBottom: 6,
});
const AnimalDetailsScreen = ({ route, navigation }) => {
  const { animal: initialAnimal } = route.params; // Initial animal passed via route params
  const dispatch = useDispatch();
  const animals = useSelector((state) => state.animals.animals); // Get animals from the Redux store
  const [editing, setEditing] = useState(false);
  const [editedAnimal, setEditedAnimal] = useState({ ...initialAnimal });

  // Watch for updates in the animals state and update local state if necessary
  useEffect(() => {
    dispatch(getAnimalMedicalLogs(editedAnimal.id));
    dispatch(getAnimalActivitiesLogs(editedAnimal.id));
  }, [dispatch, editedAnimal.id]);

  useEffect(() => {
    const updatedAnimal = animals.find((a) => a.id === initialAnimal.id);
    if (updatedAnimal) {
      setEditedAnimal(updatedAnimal); // Update local animal state with the Redux store data
    }
  }, [animals, initialAnimal.id]); // Watch for changes in the animals list from Redux

  const handleSave = () => {
    dispatch(editAnimal({ id: editedAnimal.id, updatedAnimal: editedAnimal }));
    setEditing(false);
  };

  return (
    <Container>
      <Tab.Navigator>
        <Tab.Screen name="Details">
          {() => (
            <ScrollView style={{ padding: 16 }}>
              <AnimalImage source={{ uri: `${getBaseURL()}${editedAnimal.imagePaths}` }} />

              {editing ? (
                <>
                  <InputField
                    value={editedAnimal.tag}
                    onChangeText={(text) =>
                      setEditedAnimal((prevState) => ({
                        ...prevState,
                        tag: text,
                      }))
                    }
                  />
                  <InputField
                    value={editedAnimal.price.toString()} // Ensure price is a string
                    onChangeText={(text) =>
                      setEditedAnimal((prevState) => ({
                        ...prevState,
                        price: parseFloat(text),
                      }))
                    }
                    keyboardType="numeric"
                  />
                  <InputField
                    value={editedAnimal.weight.toString()} // Ensure weight is a string
                    onChangeText={(text) =>
                      setEditedAnimal((prevState) => ({
                        ...prevState,
                        weight: parseFloat(text),
                      }))
                    }
                    keyboardType="numeric"
                  />
                  <InputField
                    value={editedAnimal.sex}
                    onChangeText={(text) =>
                      setEditedAnimal((prevState) => ({
                        ...prevState,
                        sex: text,
                      }))
                    }
                  />
                  <InputField
                    value={editedAnimal.birthDate}
                    onChangeText={(text) =>
                      setEditedAnimal((prevState) => ({
                        ...prevState,
                        birthDate: text,
                      }))
                    }
                    placeholder="YYYY-MM-DD"
                  />
                  <InputField
                    value={editedAnimal.pickUpDate}
                    onChangeText={(text) =>
                      setEditedAnimal((prevState) => ({
                        ...prevState,
                        pickUpDate: text,
                      }))
                    }
                    placeholder="YYYY-MM-DD"
                  />
                  <TouchableOpacity onPress={handleSave}>
                    <Text>💾 Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setEditing(false)}>
                    <Text>❌ Cancel</Text>
                  </TouchableOpacity>
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
        <Tab.Screen name="Medical Logs" component={MedicalLogsScreen} />
        <Tab.Screen name="Activity Logs" component={ActivityLogsScreen} />
      </Tab.Navigator>
    </Container>
  );
};


const MedicalLogsScreen = () => {
  const { medicalLogs } = useSelector((state) => state.animalMedicalLogs);
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(null);
  const [editedLog, setEditedLog] = useState({});

  const handleEdit = (log) => {
    setEditing(log.id);
    setEditedLog({ ...log });
  };

  const handleSave = () => {
    dispatch(
      modifyAnimalMedicalLog({ logId: editedLog.id, logData: editedLog })
    );
    setEditing(null);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {medicalLogs.length > 0 ? (
        medicalLogs.map((log) => (
          <LogCard key={log.id}>
            {editing === log.id ? (
              <>
                <InputField
                  value={editedLog.description}
                  onChangeText={(text) =>
                    setEditedLog({ ...editedLog, description: text })
                  }
                />
                <TouchableOpacity onPress={handleSave}>
                  <Text>💾 Save</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setEditing(null)}>
                  <Text>❌ Cancel</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <LogText>📅 {log.logDate}</LogText>
                <LogText>📝 {log.description}</LogText>
                <TouchableOpacity onPress={() => handleEdit(log)}>
                  <MaterialIcons name="edit" size={20} color="blue" />
                </TouchableOpacity>
              </>
            )}
          </LogCard>
        ))
      ) : (
        <EmptyState>
          <MaterialIcons name="error-outline" size={50} color="gray" />
          <Text>No medical logs found.</Text>
        </EmptyState>
      )}
    </ScrollView>
  );
};

const ActivityLogsScreen = () => {
  const { activitiesLogs } = useSelector((state) => state.animalActivitiesLogs);
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(null);
  const [editedLog, setEditedLog] = useState({});

  const handleEdit = (log) => {
    setEditing(log.id);
    setEditedLog({ ...log });
  };

  const handleSave = () => {
    dispatch(
      modifyAnimalActivityLog({ logId: editedLog.id, logData: editedLog })
    );
    setEditing(null);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {activitiesLogs.length > 0 ? (
        activitiesLogs.map((log) => (
          <LogCard key={log.id}>
            {editing === log.id ? (
              <>
                <InputField
                  value={editedLog.activity}
                  onChangeText={(text) =>
                    setEditedLog({ ...editedLog, activity: text })
                  }
                />
                <TouchableOpacity onPress={handleSave}>
                  <Text>💾 Save</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <LogText>📅 {log.logDate}</LogText>
                <LogText>🏃 Activity: {log.activity}</LogText>
                <TouchableOpacity onPress={() => handleEdit(log)}>
                  <MaterialIcons name="edit" size={20} color="blue" />
                </TouchableOpacity>
              </>
            )}
          </LogCard>
        ))
      ) : (
        <EmptyState>
          <MaterialIcons name="error-outline" size={50} color="gray" />
          <Text>No activity logs found.</Text>
        </EmptyState>
      )}
    </ScrollView>
  );
};

export default AnimalDetailsScreen;
