import React from 'react';
import { Button as NativeButton } from 'react-native';
import { useDripsyTheme } from 'dripsy';

const Button = ({ title, onPress, style }) => {
  const { theme } = useDripsyTheme();
  return (
    <NativeButton
      title={title}
      onPress={onPress}
      color={theme.colors.primary}
      style={style}
    />
  );
};

export default Button;
