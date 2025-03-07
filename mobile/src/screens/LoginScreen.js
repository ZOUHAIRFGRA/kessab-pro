import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/authSlice";
import { styled } from "dripsy";
import Colors from "../utils/Colors";

const LoginScreen = ({ navigation }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = () => {
    dispatch(loginUser({ identifier, password }));
  };

  return (
    <Container>
      <Image
        source={require("../../assets/logo.png")}
        style={{
          height: 220,
          width: 220,
          resizeMode: "contain",
          marginBottom: 40,
        }}
      />
      <Title>Welcome</Title>

      <InputContainer>
        <Label>Username or Phone</Label>
        <Input
          value={identifier}
          onChangeText={setIdentifier}
          placeholder="Enter username or phone"
        />
      </InputContainer>

      <InputContainer>
        <Label>Password</Label>
        <Input
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          secureTextEntry
        />
      </InputContainer>

      {error && <ErrorText>{error}</ErrorText>}

      <LoginButton onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <ButtonText>Login</ButtonText>
        )}
      </LoginButton>

      <RegisterLink onPress={() => navigation.navigate("Register")}>
        <RegisterText>Don't have an account? Register</RegisterText>
      </RegisterLink>
    </Container>
  );
};

// Styled Components using Dripsy
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

const Label = styled(Text)({
  fontSize: 16,
  color: "#555",
  marginBottom: 5,
});

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

const LoginButton = styled(TouchableOpacity)({
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

const RegisterLink = styled(TouchableOpacity)({
  marginTop: 15,
});

const RegisterText = styled(Text)({
  color: Colors.secondary,
  fontSize: 16,
});

export default LoginScreen;
