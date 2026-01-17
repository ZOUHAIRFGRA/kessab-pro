import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit3,
  Save,
  X,
  LogOut,
  ChevronRight,
  Settings,
  Bell,
  Shield,
} from "lucide-react-native";
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from "../services";
import type { AppDispatch } from "../store/store";
import "../../global.css";

export default function ProfileScreen() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const isRTL = t("dir") === "rtl";

  // RTK Query hooks
  const { data: userProfile, isLoading: loading, error } = useGetUserProfileQuery();
  const [updateUserProfile] = useUpdateUserProfileMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [updatedUsername, setUpdatedUsername] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedPhone, setUpdatedPhone] = useState("");
  const [updatedAddress, setUpdatedAddress] = useState("");

  useEffect(() => {
    if (userProfile) {
      setUpdatedUsername(userProfile.username || "");
      setUpdatedEmail(userProfile.email || "");
      setUpdatedPhone(userProfile.phone || "");
      setUpdatedAddress(userProfile.address || "");
    }
  }, [userProfile]);

  const handleProfileUpdate = async () => {
    try {
      await updateUserProfile({
        username: updatedUsername,
        email: updatedEmail,
        phone: updatedPhone,
        address: updatedAddress,
      }).unwrap();
      setIsEditing(false);
    } catch (err) {
      Alert.alert(t("common.error"), t("common.updateFailed"));
    }
  };

  const handleLogout = () => {
    Alert.alert(
      t("common.Logout"),
      t("common.logout_confirm") || "Are you sure you want to logout?",
      [
        { text: t("common.cancel"), style: "cancel" },
        {
          text: t("common.Logout"),
          style: "destructive",
          onPress: () => dispatch(logout()),
        },
      ]
    );
  };

  if (loading) {
    return (
      <View className="flex-1 bg-surface-50 items-center justify-center">
        <ActivityIndicator size="large" color="#334e68" />
      </View>
    );
  }

  const ProfileField = ({
    icon: Icon,
    label,
    value,
    editable,
    onChangeText,
  }: {
    icon: any;
    label: string;
    value: string;
    editable?: boolean;
    onChangeText?: (text: string) => void;
  }) => (
    <View className="bg-white rounded-2xl p-4 mb-3 shadow-sm">
      <View className={`flex-row items-center ${isRTL ? "flex-row-reverse" : ""}`}>
        <View className="w-10 h-10 bg-primary-50 rounded-xl items-center justify-center">
          <Icon size={20} color="#334e68" />
        </View>
        <View className={`flex-1 ${isRTL ? "mr-3" : "ml-3"}`}>
          <Text
            className={`text-surface-500 text-xs mb-1 ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            {label}
          </Text>
          {editable ? (
            <TextInput
              value={value}
              onChangeText={onChangeText}
              className={`text-primary-800 text-base font-medium py-0 ${
                isRTL ? "text-right" : "text-left"
              }`}
              placeholderTextColor="#a1a1aa"
            />
          ) : (
            <Text
              className={`text-primary-800 text-base font-medium ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {value || "-"}
            </Text>
          )}
        </View>
      </View>
    </View>
  );

  const MenuButton = ({
    icon: Icon,
    label,
    onPress,
    danger,
  }: {
    icon: any;
    label: string;
    onPress: () => void;
    danger?: boolean;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-2xl p-4 mb-3 shadow-sm flex-row items-center"
    >
      <View
        className={`w-10 h-10 rounded-xl items-center justify-center ${
          danger ? "bg-danger-50" : "bg-surface-100"
        }`}
      >
        <Icon size={20} color={danger ? "#f43f5e" : "#627d98"} />
      </View>
      <Text
        className={`flex-1 ml-3 text-base font-medium ${
          danger ? "text-danger-600" : "text-primary-700"
        }`}
      >
        {label}
      </Text>
      <ChevronRight size={20} color={danger ? "#f43f5e" : "#a1a1aa"} />
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-surface-50">
      {/* Header */}
      <LinearGradient
        colors={["#334e68", "#243b53"]}
        style={styles.header}
      >
        <Text className="text-white/70 text-sm">{t("common.Account")}</Text>
        <Text className="text-white text-2xl font-bold mt-1">
          {t("common.Profile")}
        </Text>

        {/* Avatar */}
        <View className="mt-6 items-center">
          <View className="w-24 h-24 bg-white/20 rounded-full items-center justify-center">
            <User size={48} color="white" />
          </View>
          <Text className="text-white text-xl font-bold mt-3">
            {userProfile?.username || "User"}
          </Text>
          <Text className="text-white/70 text-sm mt-1">
            {userProfile?.email || ""}
          </Text>
        </View>
      </LinearGradient>

      <ScrollView
        className="flex-1 -mt-6"
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <View className="px-5">
          {/* Edit/Save Buttons */}
          {isEditing ? (
            <View className="flex-row mb-4 -mt-2">
              <TouchableOpacity
                onPress={handleProfileUpdate}
                className="flex-1 mr-2"
              >
                <LinearGradient
                  colors={["#14b8a6", "#0d9488"]}
                  style={styles.saveButton}
                >
                  <Save size={18} color="white" />
                  <Text className="text-white font-semibold ml-2">
                    {t("common.SaveProfile")}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsEditing(false)}
                className="flex-1 ml-2 bg-surface-200 rounded-xl py-3 flex-row items-center justify-center"
              >
                <X size={18} color="#52525b" />
                <Text className="text-surface-700 font-semibold ml-2">
                  {t("common.cancel")}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => setIsEditing(true)}
              className="mb-4 -mt-2"
            >
              <LinearGradient
                colors={["#f59e0b", "#d97706"]}
                style={styles.editButton}
              >
                <Edit3 size={18} color="white" />
                <Text className="text-white font-semibold ml-2">
                  {t("common.Edit_Profile")}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}

          {/* Profile Fields */}
          <Text className="text-primary-800 text-lg font-bold mb-3 mt-2">
            {t("common.Personal Info")}
          </Text>

          <ProfileField
            icon={User}
            label={t("common.Username")}
            value={isEditing ? updatedUsername : userProfile?.username || ""}
            editable={isEditing}
            onChangeText={setUpdatedUsername}
          />

          <ProfileField
            icon={Mail}
            label={t("common.Email")}
            value={isEditing ? updatedEmail : userProfile?.email || ""}
            editable={isEditing}
            onChangeText={setUpdatedEmail}
          />

          <ProfileField
            icon={Phone}
            label={t("common.Phone")}
            value={isEditing ? updatedPhone : userProfile?.phone || ""}
            editable={isEditing}
            onChangeText={setUpdatedPhone}
          />

          <ProfileField
            icon={MapPin}
            label={t("common.Address")}
            value={isEditing ? updatedAddress : userProfile?.address || ""}
            editable={isEditing}
            onChangeText={setUpdatedAddress}
          />

          {/* Settings Section */}
          <Text className="text-primary-800 text-lg font-bold mb-3 mt-6">
            {t("common.Settings")}
          </Text>

          <MenuButton
            icon={Bell}
            label={t("common.Notifications")}
            onPress={() => {}}
          />

          <MenuButton
            icon={Shield}
            label={t("common.Privacy")}
            onPress={() => {}}
          />

          <MenuButton
            icon={Settings}
            label={t("common.Preferences")}
            onPress={() => {}}
          />

          {/* Logout */}
          <View className="mt-4">
            <MenuButton
              icon={LogOut}
              label={t("common.Logout")}
              onPress={handleLogout}
              danger
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 48,
    paddingBottom: 64,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  saveButton: {
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
