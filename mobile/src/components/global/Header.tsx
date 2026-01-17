import React from 'react';
import { View, TouchableOpacity, ViewProps } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { Text } from './Text';
import '../../../global.css';

interface HeaderProps extends ViewProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightComponent?: React.ReactNode;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  onBack,
  rightComponent,
  className = '',
  ...props
}) => {
  return (
    <View
      className={`bg-slate-800 px-4 py-4 flex-row items-center justify-between ${className}`}
      {...props}
    >
      <View className="flex-row items-center flex-1">
        {showBack && onBack && (
          <TouchableOpacity
            onPress={onBack}
            className="mr-3 p-2 -ml-2"
            activeOpacity={0.7}
          >
            <ChevronLeft size={24} color="#f59e0b" />
          </TouchableOpacity>
        )}
        <View className="flex-1">
          <Text variant="subtitle" color="white" weight="bold">
            {title}
          </Text>
          {subtitle && (
            <Text variant="caption" color="gray" className="mt-1">
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {rightComponent && <View>{rightComponent}</View>}
    </View>
  );
};

export default Header;
