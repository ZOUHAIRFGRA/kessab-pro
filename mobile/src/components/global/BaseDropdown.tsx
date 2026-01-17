import "../../../global.css";
import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { ChevronDown } from "lucide-react-native";
import Text from "./Text";
import { useTranslation } from "react-i18next";
import { useFocusEffect } from "@react-navigation/native";

interface DropdownItem {
  label: string;
  value: string | number;
}

interface BaseDropdownProps {
  onValueChange: (value: string | number) => void;
  label: string;
  focusLabel: string;
  notFocusLabel: string;
  searchLabel?: string;
  values: DropdownItem[];
  containerStyle?: object;
  disable?: boolean;
  search?: boolean;
}

const BaseDropdown: React.FC<BaseDropdownProps> = ({
  onValueChange,
  label,
  focusLabel,
  notFocusLabel,
  searchLabel,
  values: data,
  containerStyle = null,
  disable = false,
  search = false,
}) => {
  const [value, setValue] = useState<string | number | null>(null);
  const [isFocus, setIsFocus] = useState(false);
  const { t } = useTranslation();
  const isRTL = t("dir") === "rtl";

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text
          className={`absolute left-5.5 top-2 z-50 px-2 text-sm bg-white ${
            isFocus ? "text-amber-500" : "text-slate-700"
          }`}
        >
          {label}
        </Text>
      );
    }
    return null;
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setValue(null);
      };
    }, [])
  );

  return (
    <View
      className="bg-white p-0"
      style={containerStyle}
    >
      {renderLabel()}
      <Dropdown
        style={{
          height: 50,
          borderColor: isFocus ? "#F59E0B" : "#94A3B8", // Warm Amber or Slate
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 8,
          backgroundColor: "white",
        }}
        placeholderStyle={{
          fontSize: 16,
          textAlign: isRTL ? "right" : "left",
          color: "#64748B", // Slate gray
        }}
        selectedTextStyle={{
          fontSize: 16,
          color: "#334155", // Deep Slate Blue
        }}
        inputSearchStyle={{
          height: 40,
          fontSize: 16,
          borderRadius: 8,
          borderColor: "#CBD5E1",
        }}
        iconStyle={{
          width: 20,
          height: 20,
        }}
        data={data}
        search={search}
        disable={disable}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? notFocusLabel : focusLabel}
        searchPlaceholder={searchLabel}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
          onValueChange(item.value);
        }}
        renderRightIcon={() => (
          <ChevronDown
            size={20}
            color={isFocus ? "#F59E0B" : "#334155"}
          />
        )}
      />
    </View>
  );
};

export default BaseDropdown;
