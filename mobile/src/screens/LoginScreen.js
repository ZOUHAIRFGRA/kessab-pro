import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import InputField from '../components/InputField';
import Button from '../components/Button';

const LoginScreen = ({ navigation }) => {
  const [form, setForm] = useState({ cin: '', password: '' });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleLogin = () => {
    Alert.alert('Success', 'Welcome back!');
    navigation.navigate('Home');
  };

  return (
    <ScreenWrapper>
      <InputField placeholder="CIN" value={form.cin} onChangeText={(value) => handleChange('cin', value)} />
      <InputField placeholder="Password" value={form.password} onChangeText={(value) => handleChange('password', value)} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
    </ScreenWrapper>
  );
};

export default LoginScreen;
