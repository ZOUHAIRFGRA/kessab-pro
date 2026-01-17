import React from 'react';
import { View, ViewProps, ScrollView, ScrollViewProps } from 'react-native';
import '../../../global.css';

interface ContainerProps extends ViewProps {
  scrollable?: boolean;
  centered?: boolean;
  padding?: 'none' | 'small' | 'medium' | 'large';
  backgroundColor?: 'white' | 'gray' | 'dark' | 'transparent';
  className?: string;
  children: React.ReactNode;
  scrollViewProps?: Partial<ScrollViewProps>;
}

export const Container: React.FC<ContainerProps> = ({
  scrollable = false,
  centered = false,
  padding = 'medium',
  backgroundColor = 'white',
  className = '',
  children,
  scrollViewProps,
  ...props
}) => {
  const paddingStyles = {
    none: '',
    small: 'p-2',
    medium: 'p-4',
    large: 'p-6',
  };

  const bgStyles = {
    white: 'bg-white',
    gray: 'bg-slate-100',
    dark: 'bg-slate-800',
    transparent: 'bg-transparent',
  };

  const centeredStyle = centered ? 'items-center justify-center' : '';

  const baseClassName = `flex-1 ${bgStyles[backgroundColor]} ${paddingStyles[padding]} ${centeredStyle} ${className}`;

  if (scrollable) {
    return (
      <ScrollView
        className={baseClassName}
        showsVerticalScrollIndicator={false}
        {...scrollViewProps}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View className={baseClassName} {...props}>
      {children}
    </View>
  );
};

export default Container;
