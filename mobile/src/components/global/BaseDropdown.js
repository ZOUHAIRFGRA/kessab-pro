import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import Colors from "../../utils/Colors";
import { useTranslation } from "react-i18next";
import { useFocusEffect } from "@react-navigation/native";

const BaseDropdown = ({
  onValueChange,
  label,
  focusLabel,
  notFocusLabel,
  searchLabel,
  iconName,
  values: data,
  containerStyle = null,
  disable,
  search,
}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: Colors.secondary }]}>
          {label}
        </Text>
      );
    }
    return null;
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setValue("");
      };
    }, [])
  );

  const { t } = useTranslation();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      padding: 0,
    },
    dropdown: {
      height: 50,
      borderColor: "gray",
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: "absolute",
      backgroundColor: "white",
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
      textAlign: t("dir") === "rtl" ? "right" : "left",
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });
  return (
    <View style={containerStyle ? containerStyle : styles.container}>
      {value ? null : renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "border" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
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
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? "primary" : "black"}
            name={iconName}
            size={20}
          />
        )}
      />
    </View>
  );
};

export default BaseDropdown;
