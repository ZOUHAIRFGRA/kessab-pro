import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../api/axiosInstance";
import { registerSuccess } from "../features/authSlice";
import { styled } from "dripsy";
import Colors from "../utils/Colors";
import { useTranslation } from "react-i18next";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const { t } = useTranslation();
  const isRTL = t("dir") === "rtl";

  const handleRegister = async () => {
    try {
      const response = await axiosInstance.post("/auth/register", {
        username,
        email,
        password,
      });

      // Check if registration was successful
      if (response.data.message === "User registered successfully") {
        // Show success message
        Alert.alert("Success", "Registration successful! Please login.", [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login"),
          },
        ]);
      } else {
        dispatch(registerSuccess(response.data));
      }
    } catch (error) {
      Alert.alert(
        "Registration Failed",
        error.response?.data?.message || "Try again"
      );
    }
  };

  return (
    <Container>
      <Title>{t("common.Register")}</Title>

      <InputContainer>
        <Label isRTL={isRTL}>{t("common.Username")}</Label>
        <Input
          value={username}
          onChangeText={setUsername}
          placeholder={t("common.Enter username")}
          textAlign={isRTL ? "right" : "left"}
        />
      </InputContainer>

      <InputContainer>
        <Label isRTL={isRTL}>{t("common.Email")}</Label>
        <Input
          value={email}
          onChangeText={setEmail}
          placeholder={t("common.Enter email")}
          textAlign={isRTL ? "right" : "left"}
        />
      </InputContainer>

      <InputContainer>
        <Label isRTL={isRTL}>{t("common.Password")}</Label>
        <Input
          value={password}
          onChangeText={setPassword}
          placeholder={t("common.Enter password")}
          secureTextEntry
          textAlign={isRTL ? "right" : "left"}
        />
      </InputContainer>

      {error && <ErrorText>{t(error)}</ErrorText>}

      <RegisterButton onPress={handleRegister} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <ButtonText>{t("common.Register")}</ButtonText>
        )}
      </RegisterButton>

      <LoginLink onPress={() => navigation.navigate("Login")}
        style={{ flexDirection: isRTL ? "row-reverse" : "row" }}>
        <LoginText>{t("common.Already have an account? Login")}</LoginText>
      </LoginLink>
    </Container>
  );
}

const Container = styled(View)({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  padding: 20,
  backgroundColor: "#f9f9f9",
});

const Title = styled(Text)({
  fontSize: 28,
  fontWeight: "bold",
  marginBottom: 20,
  color: "#333",
});

const InputContainer = styled(View)({
  width: "100%",
  marginBottom: 15,
});

const Label = styled(Text)(({ isRTL }) => ({
  fontSize: 16,
  color: "#555",
  marginBottom: 5,
  textAlign:isRTL ? "right" : "left"
}));

const Input = styled(TextInput)({
  width: "100%",
  padding: 10,
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 8,
  backgroundColor: "#fff",
});

const ErrorText = styled(Text)({
  color: Colors.danger,
  marginBottom: 10,
});

const RegisterButton = styled(TouchableOpacity)({
  width: "100%",
  padding: 15,
  backgroundColor: Colors.primary,
  borderRadius: 8,
  alignItems: "center",
  marginTop: 10,
});

const ButtonText = styled(Text)({
  color: "white",
  fontSize: 18,
  fontWeight: "bold",
});

const LoginLink = styled(TouchableOpacity)({
  marginTop: 15,
});

const LoginText = styled(Text)({
  color: Colors.secondary,
  fontSize: 16,
});
