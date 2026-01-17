import "../../../global.css";
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
import { Calendar, Activity, Save, X, Edit, Trash2, Plus } from "lucide-react-native";
import { useToast } from "../../hooks/useToast";
import { useTranslation } from "react-i18next";
import FallBack, { FALLBACK_TYPE } from "../global/Fallback";
import Loading from "../global/Loading";

// TypeScript Interfaces
interface ActivityLog {
  id: string;
  activity: string;
  logDate: string;
  animalId: string;
}

interface ActivityLogsState {
  activitiesLogs: ActivityLog[];
  error: string | null;
  loading: boolean;
}

interface RootState {
  animalActivitiesLogs: ActivityLogsState;
}

interface ActivityLogsTabProps {
  animalId: string;
}

export const ActivityLogsTab = ({ animalId }: ActivityLogsTabProps) => {
  const { activitiesLogs, error, loading } = useSelector(
    (state: RootState) => state.animalActivitiesLogs
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isRTL = t("dir") === "rtl";
  const [editing, setEditing] = useState<string | null>(null);
  const [editedLog, setEditedLog] = useState<Partial<ActivityLog>>({});
  const [newLog, setNewLog] = useState("");
  const [logDate, setLogDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [adding, setAdding] = useState(false);
  const { showSuccessToast, showErrorToast } = useToast();

  useEffect(() => {
    dispatch(getAnimalActivitiesLogs(animalId) as any);
  }, [dispatch, animalId]);

  const handleEdit = (log: ActivityLog) => {
    setEditing(log.id);
    setEditedLog({ ...log });
  };

  const handleSave = () => {
    dispatch(
      modifyAnimalActivityLog({ logId: editedLog.id, logData: editedLog }) as any
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
          }) as any
        );
        setNewLog("");
        setAdding(false);
        showSuccessToast(t("common.Activity Log added successfully!"));
      } catch (error) {
        console.error(
          `Error adding activity log for animal ${animalId}:`,
          error
        );
        showErrorToast(t("common.Error adding activity log!"));
      }
    }
  };

  const handleDelete = (logId: string) => {
    Alert.alert(
      t("common.confirmDelete"),
      t("common.Are you sure you want to delete this activity log?"),
      [
        {
          text: t("common.cancel"),
          style: "cancel",
        },
        {
          text: t("common.delete"),
          onPress: () => {
            try {
              dispatch(deleteAnimalActivityLog(logId) as any);
              showSuccessToast(t("common.Activity Log deleted successfully!"));
            } catch (error) {
              console.error(
                `Error deleting activity log with id ${logId}:`,
                error
              );
              showErrorToast(t("common.Error deleting activity log!"));
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
    <View className="flex-1 bg-slate-50">
      <ScrollView className="p-4">
        {adding ? (
          <View className="mb-4 bg-white rounded-2xl p-4 shadow-md border border-slate-200">
            <Text className="text-slate-700 font-semibold mb-2 text-base">
              {t("common.add_activity")}
            </Text>
            <View className="bg-slate-50 rounded-xl p-3 mb-3 border border-slate-200">
              <Text
                className={`text-slate-800 ${isRTL ? "text-right" : "text-left"}`}
                style={{ fontSize: 15 }}
                onChangeText={(text: string) => setNewLog(text)}
              >
                {newLog || t("common.enter_new_activity")}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              className="bg-amber-50 rounded-xl p-3 mb-3 border border-amber-200 flex-row items-center"
              style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
            >
              <Calendar size={22} color="#f59e0b" />
              <Text
                className="text-slate-700 text-base"
                style={{ marginLeft: isRTL ? 0 : 10, marginRight: isRTL ? 10 : 0 }}
              >
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

            <View
              className="flex-row gap-3 mt-2"
              style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
            >
              <TouchableOpacity
                onPress={handleAddLog}
                className="flex-1 bg-emerald-500 rounded-xl p-3 items-center justify-center flex-row shadow-sm"
              >
                <Save size={20} color="white" />
                <Text className="text-white font-semibold ml-2">{t("common.save")}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setAdding(false)}
                className="flex-1 bg-rose-500 rounded-xl p-3 items-center justify-center flex-row shadow-sm"
              >
                <X size={20} color="white" />
                <Text className="text-white font-semibold ml-2">{t("common.cancel")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => setAdding(true)}
            className="mb-4 bg-gradient-to-r from-slate-700 to-slate-800 rounded-2xl p-4 flex-row items-center justify-center shadow-lg"
            style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
          >
            <Plus size={24} color="white" />
            <Text
              className="text-white font-bold text-base"
              style={{ marginLeft: isRTL ? 0 : 10, marginRight: isRTL ? 10 : 0 }}
            >
              {t("common.add_activity")}
            </Text>
          </TouchableOpacity>
        )}

        {activitiesLogs.length > 0 ? (
          activitiesLogs.map((log) => (
            <View
              key={log.id}
              className="bg-white rounded-2xl p-4 mb-3 shadow-md border border-slate-200"
              style={{ direction: isRTL ? "rtl" : "ltr" }}
            >
              {editing === log.id ? (
                <>
                  <View className="bg-slate-50 rounded-xl p-3 mb-3 border border-slate-200">
                    <Text
                      className={`text-slate-800 ${isRTL ? "text-right" : "text-left"}`}
                      style={{ fontSize: 15 }}
                      onChangeText={(text: string) =>
                        setEditedLog({ ...editedLog, activity: text })
                      }
                    >
                      {editedLog.activity}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setShowDatePicker(true)}
                    className="bg-amber-50 rounded-xl p-3 mb-3 border border-amber-200 flex-row items-center"
                    style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
                  >
                    <Calendar size={22} color="#f59e0b" />
                    <Text
                      className="text-slate-700 text-base"
                      style={{ marginLeft: isRTL ? 0 : 10, marginRight: isRTL ? 10 : 0 }}
                    >
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

                  <View
                    className="flex-row gap-3 mt-2"
                    style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
                  >
                    <TouchableOpacity
                      onPress={handleSave}
                      className="flex-1 bg-emerald-500 rounded-xl p-3 items-center flex-row justify-center shadow-sm"
                    >
                      <Save size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setEditing(null)}
                      className="flex-1 bg-rose-500 rounded-xl p-3 items-center flex-row justify-center shadow-sm"
                    >
                      <X size={20} color="white" />
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <>
                  <View className="flex-row items-center mb-2" style={{ flexDirection: isRTL ? "row-reverse" : "row" }}>
                    <Calendar size={18} color="#64748b" />
                    <Text
                      className="text-slate-600 text-sm ml-2"
                      style={{ marginLeft: isRTL ? 0 : 8, marginRight: isRTL ? 8 : 0 }}
                    >
                      {log.logDate}
                    </Text>
                  </View>
                  <View className="flex-row items-center mb-3" style={{ flexDirection: isRTL ? "row-reverse" : "row" }}>
                    <Activity size={18} color="#f59e0b" />
                    <Text
                      className="text-slate-800 text-base flex-1 ml-2"
                      style={{ marginLeft: isRTL ? 0 : 8, marginRight: isRTL ? 8 : 0 }}
                    >
                      {log.activity}
                    </Text>
                  </View>

                  <View className="flex-row gap-3 pt-3 border-t border-slate-100" style={{ flexDirection: isRTL ? "row-reverse" : "row" }}>
                    <TouchableOpacity
                      onPress={() => handleEdit(log)}
                      className="flex-1 bg-blue-500 rounded-xl p-3 items-center flex-row justify-center shadow-sm"
                    >
                      <Edit size={18} color="white" />
                      <Text className="text-white font-semibold ml-2 text-sm">
                        {t("common.edit")}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDelete(log.id)}
                      className="flex-1 bg-rose-500 rounded-xl p-3 items-center flex-row justify-center shadow-sm"
                    >
                      <Trash2 size={18} color="white" />
                      <Text className="text-white font-semibold ml-2 text-sm">
                        {t("common.delete")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          ))
        ) : (
          <View className="mt-10">
            <FallBack
              type={FALLBACK_TYPE.NO_RESULT}
              message={t("common.No_activity_logs_found")}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ActivityLogsTab;
