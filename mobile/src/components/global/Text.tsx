import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import '../../../global.css';

interface TextProps extends RNTextProps {
  variant?: 'title' | 'subtitle' | 'body' | 'caption' | 'label';
  color?: 'primary' | 'secondary' | 'accent' | 'white' | 'gray';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  className?: string;
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  color = 'primary',
  weight = 'normal',
  className = '',
  children,
  ...props
}) => {
  const variantStyles = {
    title: 'text-3xl',
    subtitle: 'text-xl',
    body: 'text-base',
    caption: 'text-sm',
    label: 'text-xs',
  };

  const colorStyles = {
    primary: 'text-slate-800',
    secondary: 'text-slate-600',
    accent: 'text-amber-500',
    white: 'text-white',
    gray: 'text-slate-400',
  };

  const weightStyles = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  return (
    <RNText
      className={`${variantStyles[variant]} ${colorStyles[color]} ${weightStyles[weight]} ${className}`}
      {...props}
    >
      {children}
    </RNText>
  );
};

export default Text;
