import React, { useEffect, useState } from 'react';
import {
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Platform,
  Alert,
  TextInput,
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAnimalMedicalLogs,
  modifyAnimalMedicalLog,
  createAnimalMedicalLog,
  deleteAnimalMedicalLog,
} from '../../features/animalMedicalLogSlice';
import {
  Calendar,
  Activity,
  PlusCircle,
  CheckCircle,
  XCircle,
  Save,
  Edit,
  Trash2,
  Stethoscope,
} from 'lucide-react-native';
import { useToast } from '../../hooks/useToast';
import { useTranslation } from 'react-i18next';
import FallBack, { FALLBACK_TYPE } from '../global/Fallback';
import Loading from '../global/Loading';

interface MedicalLog {
  id: string | number;
  description: string;
  vetName: string;
  logDate: string;
}

interface MedicalLogsState {
  medicalLogs: MedicalLog[];
  loading: boolean;
  error: string | null;
}

interface RootState {
  animalMedicalLogs: MedicalLogsState;
}

interface MedicalLogsTabProps {
  animalId: string | number;
}

export const MedicalLogsTab: React.FC<MedicalLogsTabProps> = ({ animalId }) => {
  const { t } = useTranslation();
  const isRTL = t('dir') === 'rtl';
  const { medicalLogs, loading, error } = useSelector(
    (state: RootState) => state.animalMedicalLogs
  );
  const dispatch = useDispatch();
  const [editing, setEditing] = useState<string | number | null>(null);
  const [editedLog, setEditedLog] = useState<Partial<MedicalLog>>({});
  const [newLogDescription, setNewLogDescription] = useState('');
  const [newVetName, setNewVetName] = useState('');
  const [logDate, setLogDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [adding, setAdding] = useState(false);
  const { showSuccessToast, showErrorToast } = useToast();

  useEffect(() => {
    dispatch(getAnimalMedicalLogs(animalId) as any);
  }, [dispatch, animalId]);

  const handleEdit = (log: MedicalLog) => {
    setEditing(log.id);
    setEditedLog({ ...log });
  };

  const handleSave = () => {
    if (editedLog.id) {
      dispatch(
        modifyAnimalMedicalLog({
          logId: editedLog.id,
          logData: editedLog,
        }) as any
      );
      setEditing(null);
    }
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
          }) as any
        );
        setNewLogDescription('');
        setNewVetName('');
        setAdding(false);
        showSuccessToast(t('common.Medical Log added successfully!'));
      }
    } catch (error) {
      console.error(`Error adding medical log for animal ${animalId}:`, error);
      showErrorToast(t('common.Error adding medical log!'));
    }
  };

  const handleDelete = (logId: string | number) => {
    Alert.alert(
      t('common.confirmDelete'),
      t('common.Are you sure you want to delete this medical log?'),
      [
        {
          text: t('common.cancel'),
          style: 'cancel',
        },
        {
          text: t('common.delete'),
          onPress: () => {
            try {
              dispatch(deleteAnimalMedicalLog(logId) as any);
              showSuccessToast(t('common.Medical Log deleted successfully!'));
            } catch (error) {
              console.error(
                `Error deleting medical log with id ${logId}:`,
                error
              );
              showErrorToast(t('common.Error deleting medical log!'));
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    setShowDatePicker(false);
    if (selectedDate) setLogDate(selectedDate);
  };

  if (loading) return <Loading />;
  if (error) return <FallBack type={FALLBACK_TYPE.ERROR} />;

  return (
    <View className="flex-1 bg-slate-50">
      <ScrollView className="p-4">
        {adding ? (
          <View className="mb-4">
            <TextInput
              value={newLogDescription}
              onChangeText={setNewLogDescription}
              placeholder={t('common.enter_new_activity')}
              className={`text-base text-slate-800 border border-gray-300 rounded-lg py-2.5 px-3 bg-white mb-4 ${
                isRTL ? 'text-right' : 'text-left'
              }`}
              placeholderTextColor="#9CA3AF"
            />
            <TextInput
              value={newVetName}
              onChangeText={setNewVetName}
              placeholder={t('common.enter_vet_name')}
              className={`text-base text-slate-800 border border-gray-300 rounded-lg py-2.5 px-3 bg-white mb-4 ${
                isRTL ? 'text-right' : 'text-left'
              }`}
              placeholderTextColor="#9CA3AF"
            />
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              className="items-center p-2.5 bg-gray-100 rounded-lg mt-2"
              style={{
                flexDirection: isRTL ? 'row-reverse' : 'row',
              }}
            >
              <Calendar size={24} color="#6B7280" />
              <Text
                className="text-slate-800"
                style={{
                  marginLeft: isRTL ? 0 : 8,
                  marginRight: isRTL ? 8 : 0,
                }}
              >
                {logDate.toDateString()}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={logDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleDateChange}
              />
            )}

            <View
              className="mt-2 justify-center items-center gap-5"
              style={{
                flexDirection: isRTL ? 'row-reverse' : 'row',
              }}
            >
              <TouchableOpacity
                onPress={handleAddLog}
                className="items-center justify-center bg-slate-700 py-3 px-6 rounded-lg shadow-lg"
              >
                <CheckCircle size={30} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setAdding(false)}
                className="items-center justify-center bg-red-500 py-3 px-6 rounded-lg shadow-lg"
              >
                <XCircle size={30} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => setAdding(true)}
            className="items-center justify-center bg-amber-500 py-3 rounded-lg mb-4 shadow-lg"
            style={{
              flexDirection: isRTL ? 'row-reverse' : 'row',
            }}
          >
            <PlusCircle size={24} color="white" />
            <Text
              className="text-white text-base font-bold"
              style={{
                marginLeft: isRTL ? 0 : 8,
                marginRight: isRTL ? 8 : 0,
              }}
            >
              {t('common.add')}
            </Text>
          </TouchableOpacity>
        )}

        {medicalLogs.length > 0 ? (
          medicalLogs.map((log) => (
            <View
              key={log.id}
              className="bg-white p-3.5 mb-2.5 rounded-lg"
              style={{
                direction: isRTL ? 'rtl' : 'ltr',
              }}
            >
              {editing === log.id ? (
                <>
                  <TextInput
                    value={editedLog.description}
                    onChangeText={(text) =>
                      setEditedLog({ ...editedLog, description: text })
                    }
                    className={`text-base text-slate-800 border border-gray-300 rounded-lg py-2.5 px-3 bg-gray-50 mb-4 ${
                      isRTL ? 'text-right' : 'text-left'
                    }`}
                  />
                  <TextInput
                    value={editedLog.vetName}
                    onChangeText={(text) =>
                      setEditedLog({ ...editedLog, vetName: text })
                    }
                    className={`text-base text-slate-800 border border-gray-300 rounded-lg py-2.5 px-3 bg-gray-50 mb-4 ${
                      isRTL ? 'text-right' : 'text-left'
                    }`}
                  />
                  <View
                    className="mt-2 justify-center items-center gap-5"
                    style={{
                      flexDirection: isRTL ? 'row-reverse' : 'row',
                    }}
                  >
                    <TouchableOpacity
                      onPress={handleSave}
                      className="items-center justify-center bg-slate-700 py-3 px-6 rounded-lg shadow-lg"
                    >
                      <Save size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setEditing(null)}
                      className="items-center justify-center bg-red-500 py-3 px-6 rounded-lg shadow-lg"
                    >
                      <XCircle size={20} color="white" />
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <>
                  <View
                    className="flex-row items-center mb-1.5"
                    style={{
                      flexDirection: isRTL ? 'row-reverse' : 'row',
                    }}
                  >
                    <Calendar size={16} color="#6B7280" />
                    <Text
                      className="text-base font-medium text-slate-800 ml-2"
                      style={{
                        marginLeft: isRTL ? 0 : 8,
                        marginRight: isRTL ? 8 : 0,
                      }}
                    >
                      {log.logDate}
                    </Text>
                  </View>
                  <View
                    className="flex-row items-center mb-1.5"
                    style={{
                      flexDirection: isRTL ? 'row-reverse' : 'row',
                    }}
                  >
                    <Activity size={16} color="#6B7280" />
                    <Text
                      className="text-base font-medium text-slate-800"
                      style={{
                        marginLeft: isRTL ? 0 : 8,
                        marginRight: isRTL ? 8 : 0,
                      }}
                    >
                      {log.description}
                    </Text>
                  </View>
                  <View
                    className="flex-row items-center mb-1.5"
                    style={{
                      flexDirection: isRTL ? 'row-reverse' : 'row',
                    }}
                  >
                    <Stethoscope size={16} color="#6B7280" />
                    <Text
                      className="text-base font-medium text-slate-800"
                      style={{
                        marginLeft: isRTL ? 0 : 8,
                        marginRight: isRTL ? 8 : 0,
                      }}
                    >
                      {log.vetName}
                    </Text>
                  </View>
                  <View
                    className="mt-2 justify-center items-center gap-5"
                    style={{
                      flexDirection: isRTL ? 'row-reverse' : 'row',
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => handleEdit(log)}
                      className="items-center justify-center bg-slate-700 py-3 px-6 rounded-lg shadow-lg"
                    >
                      <Edit size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDelete(log.id)}
                      className="items-center justify-center bg-red-500 py-3 px-6 rounded-lg shadow-lg"
                    >
                      <Trash2 size={20} color="white" />
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          ))
        ) : (
          <View className="items-center mt-5">
            <FallBack
              type={FALLBACK_TYPE.NO_RESULT}
              message={t('common.No_medical_logs_found')}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default MedicalLogsTab;
