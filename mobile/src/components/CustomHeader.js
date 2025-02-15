import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CountryFlag from "react-native-country-flag";
import i18n from "../localization/i18n"; 
import Colors from "../utils/Colors";
import Container from "./global/Container";
import { useTranslation } from "react-i18next";

const CustomHeader = ({ navigation, options }) => {
  const { t } = useTranslation(); 
  const [language, setLanguage] = useState(i18n.language); 

  
  const toggleLanguage = () => {
    const currentLang = i18n.language;
    const newLang = currentLang === "fr" ? "dr" : "fr"; 
    i18n.changeLanguage(newLang);
    setLanguage(newLang); 
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={24} color="#fff" />
      </TouchableOpacity>

      <Container
        sx={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.headerTitle}>
          {options.title || t("common.kessabPro")} 
        </Text>
      </Container>

      {/* Language Switcher */}
      <TouchableOpacity onPress={toggleLanguage} style={styles.languageButton}>
        {i18n.language === "fr" && <CountryFlag isoCode="MA" size={24}  />}
        {i18n.language === "dr" && <CountryFlag isoCode="FR" size={24} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: Colors.primary,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  languageButton: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: "transparent",
    marginLeft: "auto",
  },
});

export default CustomHeader;
