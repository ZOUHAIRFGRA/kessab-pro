import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useDispatch } from "react-redux";
import axiosInstance from "../api/axiosInstance";
import { registerSuccess } from "../features/authSlice";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  const handleRegister = async () => {
    try {
      const response = await axiosInstance.post("/auth/register", {
        username,
        email,
        password,
      });

      dispatch(registerSuccess(response.data)); 
    } catch (error) {
      Alert.alert("Registration Failed", error.response?.data?.message || "Try again");
    }
  };

  return (
    <View>
      <Text>Username:</Text>
      <TextInput value={username} onChangeText={setUsername} />
      <Text>Email:</Text>
      <TextInput value={email} onChangeText={setEmail} />
      <Text>Password:</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Register" onPress={handleRegister} />
      <Button title="Go to Login" onPress={() => navigation.navigate("Login")} />
    </View>
  );
}
