import React from 'react';
import { View, ActivityIndicator, ViewProps } from 'react-native';
import { Loader2 } from 'lucide-react-native';
import { Text } from './Text';
import '../../../global.css';

interface LoadingProps extends ViewProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
  overlay?: boolean;
  color?: 'primary' | 'accent';
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'medium',
  message,
  overlay = false,
  color = 'accent',
  className = '',
  ...props
}) => {
  const sizeMap = {
    small: 24,
    medium: 36,
    large: 48,
  };

  const colorMap = {
    primary: '#1e293b',
    accent: '#f59e0b',
  };

  const spinnerSize = sizeMap[size];
  const spinnerColor = colorMap[color];

  const containerClassName = overlay
    ? 'absolute inset-0 bg-slate-900/50 items-center justify-center z-50'
    : 'flex-1 items-center justify-center';

  return (
    <View className={`${containerClassName} ${className}`} {...props}>
      <View className="items-center">
        <ActivityIndicator size="large" color={spinnerColor} />
        {message && (
          <Text
            variant="body"
            color={overlay ? 'white' : 'secondary'}
            weight="medium"
            className="mt-4 text-center"
          >
            {message}
          </Text>
        )}
      </View>
    </View>
  );
};

export default Loading;
