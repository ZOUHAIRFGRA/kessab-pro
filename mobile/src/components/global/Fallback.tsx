import React from 'react';
import { View, ViewProps } from 'react-native';
import { AlertCircle, Frown, RefreshCcw } from 'lucide-react-native';
import { Text } from './Text';
import { Button } from './Button';
import '../../../global.css';

interface FallbackProps extends ViewProps {
  type?: 'error' | 'empty' | 'offline';
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const Fallback: React.FC<FallbackProps> = ({
  type = 'error',
  title,
  message,
  onRetry,
  retryLabel = 'Try Again',
  icon,
  className = '',
  ...props
}) => {
  const defaultConfig = {
    error: {
      icon: <AlertCircle size={64} color="#f59e0b" />,
      title: 'Something went wrong',
      message: 'An unexpected error occurred. Please try again.',
    },
    empty: {
      icon: <Frown size={64} color="#94a3b8" />,
      title: 'No data found',
      message: 'There is nothing to display at the moment.',
    },
    offline: {
      icon: <AlertCircle size={64} color="#f59e0b" />,
      title: 'No connection',
      message: 'Please check your internet connection and try again.',
    },
  };

  const config = defaultConfig[type];
  const displayIcon = icon || config.icon;
  const displayTitle = title || config.title;
  const displayMessage = message || config.message;

  return (
    <View
      className={`flex-1 items-center justify-center px-6 bg-slate-50 ${className}`}
      {...props}
    >
      <View className="items-center">
        {displayIcon}
        <Text
          variant="subtitle"
          color="primary"
          weight="bold"
          className="mt-6 text-center"
        >
          {displayTitle}
        </Text>
        <Text
          variant="body"
          color="secondary"
          className="mt-2 text-center max-w-xs"
        >
          {displayMessage}
        </Text>
        {onRetry && (
          <Button
            variant="primary"
            onPress={onRetry}
            icon={<RefreshCcw size={18} color="#ffffff" />}
            className="mt-6"
          >
            {retryLabel}
          </Button>
        )}
      </View>
    </View>
  );
};

export default Fallback;
