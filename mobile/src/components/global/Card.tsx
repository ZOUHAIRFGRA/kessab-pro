import React from 'react';
import { View, ViewProps, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import '../../../global.css';

interface CardProps extends ViewProps {
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'small' | 'medium' | 'large';
  pressable?: boolean;
  onPress?: () => void;
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'elevated',
  padding = 'medium',
  pressable = false,
  onPress,
  className = '',
  children,
  ...props
}) => {
  const variantStyles = {
    elevated: 'bg-white shadow-lg shadow-slate-300',
    outlined: 'bg-white border-2 border-slate-200',
    filled: 'bg-slate-50',
  };

  const paddingStyles = {
    none: '',
    small: 'p-2',
    medium: 'p-4',
    large: 'p-6',
  };

  const baseClassName = `rounded-xl ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`;

  if (pressable && onPress) {
    return (
      <TouchableOpacity
        className={`${baseClassName} active:opacity-80`}
        onPress={onPress}
        activeOpacity={0.9}
        {...(props as TouchableOpacityProps)}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View className={baseClassName} {...props}>
      {children}
    </View>
  );
};

export default Card;
