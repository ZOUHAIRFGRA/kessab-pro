import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/authSlice";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";
import { Eye, EyeOff, User, Lock, ArrowRight } from "lucide-react-native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootState, AppDispatch } from "../store/store";
import "../../global.css";

type LoginScreenProps = {
  navigation: StackNavigationProp<any>;
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const { t } = useTranslation();
  const isRTL = t("dir") === "rtl";

  const handleLogin = () => {
    dispatch(loginUser({ identifier, password }));
  };

  return (
    <View className="flex-1 bg-surface-50">
 
      {/* Gradient Header */}
      <LinearGradient
        colors={["#334e68", "#243b53", "#102a43"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        {/* Decorative circles */}
        <View className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white/5" />
        <View className="absolute top-32 right-8 w-32 h-32 rounded-full bg-white/5" />
        <View className="absolute bottom-20 left-20 w-16 h-16 rounded-full bg-accent-500/20" />

        <Image
          source={require("../../assets/logo.png")}
          className="w-28 h-28"
          resizeMode="contain"
        />
        <Text className="text-white text-3xl font-bold mt-4 tracking-wide">
          Kessab Pro
        </Text>
        <Text className="text-white/70 text-base mt-2">
          {t("common.Welcome")}
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
          {/* Login Form Card */}
          <View className="flex-1 px-6 mt-10">
            <View className="bg-white rounded-3xl p-6 shadow-lg shadow-black/10">
              <Text className="text-primary-800 text-2xl font-bold mb-1">
                {t("common.Login")}
              </Text>
              <Text className="text-surface-500 text-sm mb-6">
                {t("common.Already have an account? Login")}
              </Text>

              {/* Username/Phone Input */}
              <View className="mb-4">
                <Text
                  className={`text-surface-600 text-sm font-medium mb-2 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  {t("common.Username or Phone")}
                </Text>
                <View
                  className={`flex-row items-center bg-surface-50 rounded-2xl border-2 px-4 ${
                    focusedInput === "identifier"
                      ? "border-primary-500"
                      : "border-surface-200"
                  } ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                >
                  <User
                    size={20}
                    color={focusedInput === "identifier" ? "#334e68" : "#a1a1aa"}
                  />
                  <TextInput
                    value={identifier}
                    onChangeText={setIdentifier}
                    placeholder={t("common.Enter username or phone")}
                    placeholderTextColor="#a1a1aa"
                    className={`flex-1 py-4 px-3 text-base text-primary-900 ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                    onFocus={() => setFocusedInput("identifier")}
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

              {/* Login Button */}
              <TouchableOpacity
                onPress={handleLogin}
                disabled={loading || !identifier || !password}
                activeOpacity={0.8}
                className="mt-2"
              >
                <LinearGradient
                  colors={
                    loading || !identifier || !password
                      ? ["#a1a1aa", "#71717a"]
                      : ["#f59e0b", "#d97706"]
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.loginButton}
                >
                  {loading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <>
                      <Text className="text-white text-lg font-semibold mr-2">
                        {t("common.Login")}
                      </Text>
                      <ArrowRight size={20} color="white" />
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Register Link */}
            <View className="flex-row items-center justify-center mt-8">
              <Text className="text-surface-500 text-base">
                {t("common.Don't have an account?")}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Register")}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text className="text-accent-600 text-base font-semibold ml-1">
                  {t("common.Register")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: '28%',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
