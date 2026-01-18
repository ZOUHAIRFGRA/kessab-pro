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
  Modal,
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
  Languages,
  Bell,
  Shield,
} from "lucide-react-native";
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from "../services";
import type { AppDispatch } from "../store/store";
import "../../global.css";

interface LanguageOption {
  code: string;
  label: string;
  flag: string;
}

const languages: LanguageOption[] = [
  { code: "dr", label: "Darija", flag: "🇲🇦" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
];

export default function ProfileScreen() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const isRTL = t("dir") === "rtl";

  // RTK Query hooks
  const { data: userProfile, isLoading: loading, error } = useGetUserProfileQuery();
  const [updateUserProfile] = useUpdateUserProfileMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
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

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setShowLanguageModal(false);
  };

  const getCurrentLanguage = () => {
    return languages.find((lang) => lang.code === i18n.language) || languages[0];
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
    rightText,
  }: {
    icon: any;
    label: string;
    onPress: () => void;
    danger?: boolean;
    rightText?: string;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      className={`bg-white rounded-2xl p-4 mb-3 shadow-sm flex-row items-center ${
        isRTL ? "flex-row-reverse" : ""
      }`}
    >
      <View
        className={`w-10 h-10 rounded-xl items-center justify-center ${
          danger ? "bg-danger-50" : "bg-surface-100"
        }`}
      >
        <Icon size={20} color={danger ? "#f43f5e" : "#627d98"} />
      </View>
      <Text
        className={`flex-1 ${isRTL ? "mr-3" : "ml-3"} text-base font-medium ${
          danger ? "text-danger-600" : "text-primary-700"
        } ${isRTL ? "text-right" : "text-left"}`}
      >
        {label}
      </Text>
      {rightText && (
        <Text className="text-surface-500 text-sm mr-2">{rightText}</Text>
      )}
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
        <View className="mt-4 items-center">
          <View className="w-20 h-20 bg-white/20 rounded-full items-center justify-center">
            <User size={40} color="white" />
          </View>
          <Text className="text-white text-lg font-bold mt-2">
            {userProfile?.username || "User"}
          </Text>
          <Text className="text-white/70 text-xs mt-0.5">
            {userProfile?.email || ""}
          </Text>
        </View>
      </LinearGradient>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 24, paddingTop: 16 }}
      >
        <View className="px-5">
          {/* Edit/Save Buttons */}
          {isEditing ? (
            <View className="flex-row mb-4">
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
              className="mb-4"
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
          <Text className="text-primary-800 text-lg font-bold mb-3">
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
          <Text className={`text-primary-800 text-lg font-bold mb-3 mt-6 ${isRTL ? "text-right" : "text-left"}`}>
            {t("common.Preferences")}
          </Text>

          <MenuButton
            icon={Languages}
            label={t("common.Language")}
            onPress={() => setShowLanguageModal(true)}
            rightText={getCurrentLanguage().label}
          />

          <MenuButton
            icon={Bell}
            label={t("common.Notifications")}
            onPress={() => Alert.alert(t("common.Notifications"), "Coming soon...")}
          />

          <MenuButton
            icon={Shield}
            label={t("common.Privacy")}
            onPress={() => Alert.alert(t("common.Privacy"), "Coming soon...")}
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

      {/* Language Selection Modal */}
      <Modal
        visible={showLanguageModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowLanguageModal(false)}
          className="flex-1 bg-black/50 items-center justify-center"
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl mx-6 p-6 w-80 max-w-full"
          >
            <View className={`flex-row items-center justify-between mb-6 ${isRTL ? "flex-row-reverse" : ""}`}>
              <Text className={`text-primary-900 text-xl font-bold ${isRTL ? "text-right" : "text-left"}`}>
                {t("common.Select_Language")}
              </Text>
              <TouchableOpacity
                onPress={() => setShowLanguageModal(false)}
                className="w-8 h-8 bg-surface-100 rounded-full items-center justify-center"
              >
                <X size={18} color="#52525b" />
              </TouchableOpacity>
            </View>

            <View className="gap-3">
              {languages.map((lang) => (
                <TouchableOpacity
                  key={lang.code}
                  onPress={() => handleLanguageChange(lang.code)}
                  className={`flex-row items-center gap-3 p-4 rounded-2xl border-2 ${
                    isRTL ? "flex-row-reverse" : ""
                  } ${
                    i18n.language === lang.code
                      ? "bg-amber-50 border-amber-500"
                      : "bg-surface-50 border-surface-200"
                  }`}
                >
                  <Text className="text-3xl">{lang.flag}</Text>
                  <View className={`flex-1 ${isRTL ? "items-end" : ""}`}>
                    <Text
                      className={`text-base font-bold ${
                        i18n.language === lang.code
                          ? "text-amber-700"
                          : "text-primary-800"
                      } ${isRTL ? "text-right" : "text-left"}`}
                    >
                      {lang.label}
                    </Text>
                  </View>
                  {i18n.language === lang.code && (
                    <View className="w-6 h-6 bg-amber-500 rounded-full items-center justify-center">
                      <Text className="text-white text-xs font-bold">✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 48,
    paddingBottom: 40,
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
