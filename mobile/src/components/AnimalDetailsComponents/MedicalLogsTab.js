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
  getAnimalMedicalLogs,
  modifyAnimalMedicalLog,
  createAnimalMedicalLog,
  deleteAnimalMedicalLog,
} from "../../features/animalMedicalLogSlice";
import { MaterialIcons, Feather, Fontisto } from "@expo/vector-icons";
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
import FallBack, { FALLBACK_TYPE } from "../global/Fallback";
import Loading from "../global/Loading";

export const MedicalLogsTab = ({ animalId }) => {
  const { t } = useTranslation();
  const isRTL = t("dir") === "rtl";
  const { medicalLogs ,loading,error} = useSelector((state) => state.animalMedicalLogs);
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
        showSuccessToast(t("common.Medical Log added successfully!"));
      }
    } catch (error) {
      console.error(`Error adding medical log for animal ${animalId}:`, error);
      showErrorToast(t("common.Error adding medical log!"));
    }
  };

  const handleDelete = (logId) => {
    Alert.alert(
      t("common.confirmDelete"),
      t("common.Are you sure you want to delete this medical log?"),
      [
        {
          text: t("common.cancel"),
          style: "cancel",
        },
        {
          text: t("common.delete"),
          onPress: () => {
            try {
              dispatch(deleteAnimalMedicalLog(logId));
              showSuccessToast(t("common.Medical Log deleted successfully!"));
            } catch (error) {
              console.error(`Error deleting medical log with id ${logId}:`, error);
              showErrorToast(t("common.Error deleting medical log!"));
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  if (loading) return <Loading />;
  if (error) return <FallBack type={FALLBACK_TYPE.ERROR} />;
  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {adding ? (
          <View style={{ marginBottom: 16 }}>
            <InputField
              value={newLogDescription}
              onChangeText={setNewLogDescription}
              placeholder={t("common.enter_new_activity")}
              style={isRTL ? { textAlign: "right" } : { textAlign: "left" }}
            />
            <InputField
              value={newVetName}
              onChangeText={setNewVetName}
              placeholder={t("common.enter_vet_name")}
              style={isRTL ? { textAlign: "right" } : { textAlign: "left" }}
            />
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={{
                flexDirection: isRTL ? "row-reverse" : "row",
                alignItems: "center",
                padding: 10,
                backgroundColor: "#f0f0f0",
                borderRadius: 5,
                marginTop: 8,
              }}
            >
              <MaterialIcons name="event" size={24} color="gray" />
              <Text style={{ marginLeft: isRTL ? 0 : 8, marginRight: isRTL ? 8 : 0 }}>
                {logDate.toDateString()}
              </Text>
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

            <ActionButtons style={isRTL ? { flexDirection: "row-reverse" } : { flexDirection: "row" }}>
              <SaveButton onPress={handleAddLog}>
                <MaterialIcons name="check-circle" size={30} color="white" />
              </SaveButton>
              <CancelButton onPress={() => setAdding(false)}>
                <MaterialIcons name="cancel" size={30} color="white" />
              </CancelButton>
            </ActionButtons>
          </View>
        ) : (
          <AddButton onPress={() => setAdding(true)} style={isRTL ? { flexDirection: "row-reverse" } : { flexDirection: "row" }}>
            <MaterialIcons name="add-circle-outline" size={24} color="white" />
            <AddButtonText style={isRTL ? { marginRight: 8, marginLeft: 0 } : { marginLeft: 8 }}>
              {t("common.add")}
            </AddButtonText>
          </AddButton>
        )}

        {medicalLogs.length > 0 ? (
          medicalLogs.map((log) => (
            <LogCard key={log.id} style={isRTL ? { direction: "rtl" } : { direction: "ltr" }}>
            {editing === log.id ? (
              <>
                <InputField
                  value={editedLog.description}
                  onChangeText={(text) => setEditedLog({ ...editedLog, description: text })}
                  style={isRTL ? { textAlign: "right" } : { textAlign: "left" }}
                />
                <InputField
                  value={editedLog.vetName}
                  onChangeText={(text) => setEditedLog({ ...editedLog, vetName: text })}
                  style={isRTL ? { textAlign: "right" } : { textAlign: "left" }}
                />
                <ActionButtons style={isRTL ? { flexDirection: "row-reverse" } : { flexDirection: "row" }}>
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
                <LogText style={isRTL ? { textAlign: "right" } : {}}>
                  {isRTL ? (
                    <>
                      {log.logDate}{" "}
                      <MaterialIcons name="event" size={16} color="gray" />
                    </>
                  ) : (
                    <>
                      <MaterialIcons name="event" size={16} color="gray" />{" "}
                      {log.logDate}
                    </>
                  )}
                </LogText>
                <LogText style={isRTL ? { textAlign: "right" } : {}}>
                  {isRTL ? (
                    <>
                      {log.description}{" "}
                      <Feather name="activity" size={16} color="gray" />
                    </>
                  ) : (
                    <>
                      <Feather name="activity" size={16} color="gray" />{" "}
                      {log.description}
                    </>
                  )}
                </LogText>
                <LogText style={isRTL ? { textAlign: "right" } : {}}>
                  {isRTL ? (
                    <>
                      {log.vetName}{" "}
                      <Fontisto name="doctor" size={16} color="gray" />
                    </>
                  ) : (
                    <>
                      <Fontisto name="doctor" size={16} color="gray" />{" "}
                      {log.vetName}
                    </>
                  )}
                </LogText>
                <ActionButtons style={isRTL ? { flexDirection: "row-reverse" } : { flexDirection: "row" }}>
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
              </>
            )}
          </LogCard>
          ))
        ) : (
          <EmptyState>
            <MaterialIcons name="error-outline" size={50} color="gray" />
            <Text>{t("common.No_medical_logs_found")}</Text>
          </EmptyState>
        )}
      </ScrollView>
    </Container>
  );
};

export default MedicalLogsTab;