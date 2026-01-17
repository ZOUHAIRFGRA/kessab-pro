import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../api/axiosInstance";
import { registerSuccess } from "../features/authSlice";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";
import {
  Eye,
  EyeOff,
  User,
  Lock,
  Mail,
  ArrowRight,
  ArrowLeft,
  UserPlus,
} from "lucide-react-native";
import type { NativeStackNavigationProp } from "@react-navigation/stack";
import type { RootState, AppDispatch } from "../store/store";
import "../../global.css";

type RegisterScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { error } = useSelector((state: RootState) => state.auth);
  const { t } = useTranslation();
  const isRTL = t("dir") === "rtl";

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/auth/register", {
        username,
        email,
        password,
      });

      if (response.data.message === "User registered successfully") {
        Alert.alert(
          t("common.Success") || "Success",
          t("common.Registration successful") || "Registration successful! Please login.",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("Login"),
            },
          ]
        );
      } else {
        dispatch(registerSuccess(response.data));
      }
    } catch (err: any) {
      Alert.alert(
        t("common.Registration Failed") || "Registration Failed",
        err.response?.data?.message || "Try again"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = username && email && password;

  return (
    <View className="flex-1 bg-surface-50">
      {/* Gradient Header */}
      <LinearGradient
        colors={["#334e68", "#243b53", "#102a43"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="h-[30%] rounded-b-[40px] items-center justify-center relative"
      >
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute top-12 left-6 w-10 h-10 bg-white/10 rounded-full items-center justify-center"
        >
          <ArrowLeft size={22} color="white" />
        </TouchableOpacity>

        {/* Decorative circles */}
        <View className="absolute top-10 right-10 w-24 h-24 rounded-full bg-white/5" />
        <View className="absolute bottom-16 left-8 w-20 h-20 rounded-full bg-accent-500/20" />

        <View className="w-20 h-20 bg-white/10 rounded-full items-center justify-center">
          <UserPlus size={40} color="white" />
        </View>
        <Text className="text-white text-2xl font-bold mt-4 tracking-wide">
          {t("common.Create Account")}
        </Text>
        <Text className="text-white/70 text-sm mt-2">
          Join Kessab Pro today
        </Text>
      </LinearGradient>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Register Form Card */}
          <View className="flex-1 px-6 -mt-8">
            <View className="bg-white rounded-3xl p-6 shadow-lg shadow-black/10">
              <Text className="text-primary-800 text-xl font-bold mb-1">
                {t("common.Register")}
              </Text>
              <Text className="text-surface-500 text-sm mb-5">
                Fill in your details to get started
              </Text>

              {/* Username Input */}
              <View className="mb-4">
                <Text
                  className={`text-surface-600 text-sm font-medium mb-2 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  {t("common.Username")}
                </Text>
                <View
                  className={`flex-row items-center bg-surface-50 rounded-2xl border-2 px-4 ${
                    focusedInput === "username"
                      ? "border-primary-500"
                      : "border-surface-200"
                  } ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                >
                  <User
                    size={20}
                    color={focusedInput === "username" ? "#334e68" : "#a1a1aa"}
                  />
                  <TextInput
                    value={username}
                    onChangeText={setUsername}
                    placeholder={t("common.Enter username")}
                    placeholderTextColor="#a1a1aa"
                    className={`flex-1 py-4 px-3 text-base text-primary-900 ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                    onFocus={() => setFocusedInput("username")}
                    onBlur={() => setFocusedInput(null)}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Email Input */}
              <View className="mb-4">
                <Text
                  className={`text-surface-600 text-sm font-medium mb-2 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  {t("common.Email")}
                </Text>
                <View
                  className={`flex-row items-center bg-surface-50 rounded-2xl border-2 px-4 ${
                    focusedInput === "email"
                      ? "border-primary-500"
                      : "border-surface-200"
                  } ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                >
                  <Mail
                    size={20}
                    color={focusedInput === "email" ? "#334e68" : "#a1a1aa"}
                  />
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder={t("common.Enter email")}
                    placeholderTextColor="#a1a1aa"
                    keyboardType="email-address"
                    className={`flex-1 py-4 px-3 text-base text-primary-900 ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                    onFocus={() => setFocusedInput("email")}
                    onBlur={() => setFocusedInput(null)}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Password Input */}
              <View className="mb-4">
                <Text
                  className={`text-surface-600 text-sm font-medium mb-2 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  {t("common.Password")}
                </Text>
                <View
                  className={`flex-row items-center bg-surface-50 rounded-2xl border-2 px-4 ${
                    focusedInput === "password"
                      ? "border-primary-500"
                      : "border-surface-200"
                  } ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                >
                  <Lock
                    size={20}
                    color={focusedInput === "password" ? "#334e68" : "#a1a1aa"}
                  />
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder={t("common.Enter password")}
                    placeholderTextColor="#a1a1aa"
                    secureTextEntry={!showPassword}
                    className={`flex-1 py-4 px-3 text-base text-primary-900 ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                    onFocus={() => setFocusedInput("password")}
                    onBlur={() => setFocusedInput(null)}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    {showPassword ? (
                      <EyeOff size={20} color="#a1a1aa" />
                    ) : (
                      <Eye size={20} color="#a1a1aa" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Error Message */}
              {error && (
                <View className="bg-danger-50 border border-danger-200 rounded-xl p-3 mb-4">
                  <Text className="text-danger-600 text-sm text-center">
                    {t(error)}
                  </Text>
                </View>
              )}

              {/* Register Button */}
              <TouchableOpacity
                onPress={handleRegister}
                disabled={isLoading || !isFormValid}
                activeOpacity={0.8}
                className="mt-2"
              >
                <LinearGradient
                  colors={
                    isLoading || !isFormValid
                      ? ["#a1a1aa", "#71717a"]
                      : ["#f59e0b", "#d97706"]
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className="rounded-2xl py-4 flex-row items-center justify-center"
                >
                  {isLoading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <>
                      <Text className="text-white text-lg font-semibold mr-2">
                        {t("common.Register")}
                      </Text>
                      <ArrowRight size={20} color="white" />
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Login Link */}
            <View className="flex-row items-center justify-center mt-6 mb-8">
              <Text className="text-surface-500 text-base">
                {t("common.Already have an account?")}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text className="text-accent-600 text-base font-semibold ml-1">
                  {t("common.Login")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
