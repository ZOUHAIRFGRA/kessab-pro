import { useEffect, useState } from "react";
import { Text, ScrollView, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAnimalMedicalLogs, modifyAnimalMedicalLog } from "../../features/animalMedicalLogSlice";
import { MaterialIcons } from "@expo/vector-icons";
import { EmptyState, InputField, LogCard, LogText } from "./sharedStyles";

export const MedicalLogsScreen = ({route}) => {
    const { animalId } = route.params;
    
    const { medicalLogs } = useSelector((state) => state.animalMedicalLogs);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAnimalMedicalLogs(animalId));
    }, [dispatch, animalId]);
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