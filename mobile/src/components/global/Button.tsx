import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, ActivityIndicator, View } from 'react-native';
import { Text } from './Text';
import '../../../global.css';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  loading = false,
  icon,
  iconPosition = 'left',
  className = '',
  disabled,
  children,
  ...props
}) => {
  const variantStyles = {
    primary: 'bg-amber-500 active:bg-amber-600',
    secondary: 'bg-slate-700 active:bg-slate-800',
    outline: 'bg-transparent border-2 border-amber-500',
    ghost: 'bg-transparent',
  };

  const sizeStyles = {
    small: 'px-3 py-2',
    medium: 'px-4 py-3',
    large: 'px-6 py-4',
  };

  const disabledStyles = disabled || loading ? 'opacity-50' : '';

  const textColor =
    variant === 'primary'
      ? 'white'
      : variant === 'outline' || variant === 'ghost'
      ? 'accent'
      : 'white';

  return (
    <TouchableOpacity
      className={`rounded-lg flex-row items-center justify-center ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? '#ffffff' : '#f59e0b'}
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && <View className="mr-2">{icon}</View>}
          <Text
            variant={size === 'small' ? 'caption' : 'body'}
            color={textColor}
            weight="semibold"
          >
            {children}
          </Text>
          {icon && iconPosition === 'right' && <View className="ml-2">{icon}</View>}
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;
