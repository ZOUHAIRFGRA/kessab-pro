import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import InputField from '../components/InputField';
import Button from '../components/Button';

const RegisterScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    cin: '',
    password: '',
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleRegister = () => {
    Alert.alert('Success', 'You are registered!');
    navigation.navigate('Login');
  };

  return (
    <ScreenWrapper>
      <InputField placeholder="First Name" value={form.firstName} onChangeText={(value) => handleChange('firstName', value)} />
      <InputField placeholder="Last Name" value={form.lastName} onChangeText={(value) => handleChange('lastName', value)} />
      <InputField placeholder="Phone" value={form.phone} onChangeText={(value) => handleChange('phone', value)} />
      <InputField placeholder="CIN" value={form.cin} onChangeText={(value) => handleChange('cin', value)} />
      <InputField placeholder="Password" value={form.password} onChangeText={(value) => handleChange('password', value)} secureTextEntry />
      <Button title="Register" onPress={handleRegister} />
    </ScreenWrapper>
  );
};

export default RegisterScreen;
