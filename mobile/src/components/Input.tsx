import "../../global.css";
import React from "react";
import { TextInput, View, Text, KeyboardTypeOptions, StyleProp, TextStyle } from "react-native";
import { useTranslation } from "react-i18next";

interface InputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  editable?: boolean;
  style?: StyleProp<TextStyle>;
  keyboardType?: KeyboardTypeOptions;
  placeholderTextColor?: string;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  editable = true,
  style,
  keyboardType,
  placeholderTextColor = "#6b7280"
}) => {
  const { t } = useTranslation();
  const isRTL = t("dir") === "rtl";

  return (
    <View className="mb-2.5">
      <Text 
        className={`font-bold text-[#1e3a5f] ${isRTL ? 'text-right' : 'text-left'}`}
      >
        {placeholder}
      </Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        style={style}
        placeholderTextColor={placeholderTextColor}
        keyboardType={keyboardType}
        textAlign={isRTL ? "right" : "left"}
        className="border border-[#d4a574] p-2.5 rounded-lg mt-1.5 bg-white text-[#1e3a5f]"
      />
    </View>
  );
};

export default Input;
