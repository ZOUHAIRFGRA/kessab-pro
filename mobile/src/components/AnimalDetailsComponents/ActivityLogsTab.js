import { useEffect, useState } from "react";
import {
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Platform,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import {
  getAnimalActivitiesLogs,
  modifyAnimalActivityLog,
  createAnimalActivityLog,
  deleteAnimalActivityLog,
} from "../../features/animalActivitiesLogSlice";
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
} from "./sharedStyles";
import { useToast } from "../../hooks/useToast";
import { useTranslation } from "react-i18next";

export const ActivityLogsTab = ({ animalId }) => {
  const { activitiesLogs } = useSelector((state) => state.animalActivitiesLogs);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [editing, setEditing] = useState(null);
  const [editedLog, setEditedLog] = useState({});
  const [newLog, setNewLog] = useState("");
  const [logDate, setLogDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [adding, setAdding] = useState(false);
  const { showSuccessToast, showErrorToast } = useToast();

  useEffect(() => {
    dispatch(getAnimalActivitiesLogs(animalId));
  }, [dispatch, animalId]);

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

  const handleAddLog = () => {
    if (newLog.trim()) {
      try {
        dispatch(
          createAnimalActivityLog({
            animalId: animalId,
            activity: newLog,
            logDate: logDate,
          })
        );
        setNewLog("");
        setAdding(false);
        showSuccessToast("Activity Log added successfully!");
      } catch (error) {
        console.error(
          `Error adding activity log for animal ${animalId}:`,
          error
        );
        showErrorToast("Error adding activity log!");
      }
    }
  };

  const handleDelete = (logId) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this medical log?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            try {
              dispatch(deleteAnimalActivityLog(logId));
              showSuccessToast("Activity Log deleted successfully!");
            } catch (error) {
              console.error(
                `Error deleting activity log with id ${logId}:`,
                error
              );
              showErrorToast("Error deleting activity log!");
            }
          },
          style: "destructive",
        },
      ]
    );
  };
  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {adding ? (
          <View style={{ marginBottom: 16 }}>
            <InputField
              value={newLog}
              onChangeText={setNewLog}
              placeholder={t("common.enter_new_activity")}
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
            <AddButtonText>{t("common.add_activity")}</AddButtonText>
          </AddButton>
        )}

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
                    <Text style={{ marginLeft: 8 }}>
                      {editedLog.logDate || t("common.select_date")}
                    </Text>
                  </TouchableOpacity>

                  {showDatePicker && (
                    <DateTimePicker
                      value={logDate}
                      mode="date"
                      display={Platform.OS === "ios" ? "spinner" : "default"}
                      onChange={(event, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate)
                          setEditedLog({
                            ...editedLog,
                            logDate: selectedDate.toISOString().split("T")[0],
                          });
                      }}
                    />
                  )}

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
                    {log.activity}
                  </LogText>

                  <View
                    style={{
                      alignItems: "center",
                      marginTop: 10,
                      width: "100%",
                    }}
                  >
                    <ActionButtons>
                      <SaveButton
                        style={{ marginRight: 0 }}
                        onPress={() => handleEdit(log)}
                      >
                        <MaterialIcons name="edit" size={20} color="white" />
                      </SaveButton>
                      <CancelButton onPress={() => handleDelete(log.id)}>
                        <MaterialIcons name="delete" size={20} color="white" />
                      </CancelButton>
                    </ActionButtons>
                  </View>
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
    </Container>
  );
};
