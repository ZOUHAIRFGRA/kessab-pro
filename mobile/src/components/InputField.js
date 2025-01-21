import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { useDripsyTheme } from 'dripsy';

const InputField = ({ placeholder, value, onChangeText, secureTextEntry }) => {
  const { theme } = useDripsyTheme();
  return (
    <TextInput
      style={[styles.input, { borderColor: theme.colors.border }]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});

export default InputField;
