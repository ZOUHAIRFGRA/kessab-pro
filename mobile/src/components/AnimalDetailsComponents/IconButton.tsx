import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface IconButtonProps {
  label: string;
  value: string | number;
  selected: string | number;
  onPress: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ label, value, selected, onPress }) => {
  const isSelected = selected === value;

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`px-5 py-2.5 rounded-lg border mx-1.5 items-center ${
        isSelected
          ? 'bg-amber-500 border-slate-700'
          : 'bg-gray-400 border-gray-400'
      }`}
    >
      <Text
        className={`font-bold ${
          isSelected ? 'text-white' : 'text-slate-800'
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default IconButton;
