import { useEffect, useState } from "react";
import {
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import {
  getAnimalMedicalLogs,
  modifyAnimalMedicalLog,
  createAnimalMedicalLog,
  deleteAnimalMedicalLog,
} from "../../features/animalMedicalLogSlice";
import { MaterialIcons } from "@expo/vector-icons";
import {
  EmptyState,
  InputField,
  LogCard,
  LogText,
  AddButton,
  AddButtonText,
  ActionButtons,
  CancelButton,
  SaveButton,
  Container,
  EditContainer,
} from "./sharedStyles";
import { useToast } from "../../hooks/useToast";

export const MedicalLogsTab = ({ animalId }) => {
  // const { animalId } = route.params;
  const { medicalLogs } = useSelector((state) => state.animalMedicalLogs);
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(null);
  const [editedLog, setEditedLog] = useState({});
  const [newLogDescription, setNewLogDescription] = useState("");
  const [newVetName, setNewVetName] = useState("");
  const [logDate, setLogDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [adding, setAdding] = useState(false);
  const { showSuccessToast, showErrorToast } = useToast();

  useEffect(() => {
    dispatch(getAnimalMedicalLogs(animalId));
  }, [dispatch, animalId]);

  const handleEdit = (log) => {
    setEditing(log.id);
    setEditedLog({ ...log });
  };

  const handleSave = () => {
    dispatch(
      modifyAnimalMedicalLog({
        logId: editedLog.id,
        logData: editedLog,
      })
    );
    setEditing(null);
  };

  const handleAddLog = () => {
    try {
      if (newLogDescription.trim() && newVetName.trim()) {
        dispatch(
          createAnimalMedicalLog({
            animalId: animalId,
            description: newLogDescription,
            vetName: newVetName,
            logDate: logDate,
          })
        );
        setNewLogDescription("");
        setAdding(false);
        showSuccessToast("Medical Log added successfully!");
      }
    } catch (error) {
      console.error(`Error adding medical log for animal ${animalId}:`, error);
      showErrorToast("Error adding medical log!");
    }
  };

  const handleDelete = (logId) => {
    try {
      dispatch(deleteAnimalMedicalLog(logId));
      showSuccessToast("Medical Log deleted successfully!");
    } catch (error) {
      console.error(`Error deleting medical log with id ${logId}:`, error);
      showErrorToast("Error deleting medical log!");
    }
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {adding ? (
          <View style={{ marginBottom: 16}}>
            <InputField
              value={newLogDescription}
              onChangeText={setNewLogDescription}
              placeholder="Enter new medical activity"
            />
            <InputField
              value={newVetName}
              onChangeText={setNewVetName}
              placeholder="Enter vet's name"
            />
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
                backgroundColor: "#f0f0f0",
                borderRadius: 5,
                marginTop: 8,
              }}
            >
              <MaterialIcons name="event" size={24} color="gray" />
              <Text style={{ marginLeft: 8 }}>{logDate.toDateString()}</Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={logDate}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) setLogDate(selectedDate);
                }}
              />
            )}

            <ActionButtons>
              <SaveButton onPress={handleAddLog}>
                <MaterialIcons name="check-circle" size={30} color="white" />
              </SaveButton>
              <CancelButton onPress={() => setAdding(false)}>
                <MaterialIcons name="cancel" size={30} color="white" />
              </CancelButton>
            </ActionButtons>
          </View>
        ) : (
          <AddButton onPress={() => setAdding(true)}>
            <MaterialIcons name="add-circle-outline" size={24} color="white" />
            <AddButtonText>Add Medical Log</AddButtonText>
          </AddButton>
        )}

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
                  <InputField
                    value={editedLog.vetName}
                    onChangeText={(text) =>
                      setEditedLog({ ...editedLog, vetName: text })
                    }
                  />
                  <ActionButtons>
                    <SaveButton onPress={handleSave}>
                      <MaterialIcons name="save" size={20} color="white" />
                    </SaveButton>
                    <CancelButton onPress={() => setEditing(null)}>
                      <MaterialIcons name="cancel" size={20} color="white" />
                    </CancelButton>
                  </ActionButtons>
                </>
              ) : (
                <>
                  <LogText>
                    <MaterialIcons name="event" size={16} color="gray" />{" "}
                    {log.logDate}
                  </LogText>
                  <LogText>
                    <MaterialIcons
                      name="fitness-center"
                      size={16}
                      color="gray"
                    />{" "}
                    {log.description}
                  </LogText>
                  <LogText>
                    <MaterialIcons
                      name="local-hospital"
                      size={16}
                      color="gray"
                    />{" "}
                    {log.vetName}
                  </LogText>

                  <ActionButtons>
                    <TouchableOpacity
                      style={{ marginRight: 15 }}
                      onPress={() => handleEdit(log)}
                    >
                      <MaterialIcons name="edit" size={20} color="blue" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(log.id)}>
                      <MaterialIcons name="delete" size={20} color="red" />
                    </TouchableOpacity>
                  </ActionButtons>
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
    </Container>
  );
};
