import React, { useState } from "react";
import "../../global.css";
import { View, Text, TouchableOpacity } from "react-native";
import { Menu } from "lucide-react-native";
import CountryFlag from "react-native-country-flag";
import i18n from "../localization/i18n";
import { useTranslation } from "react-i18next";
import { DrawerNavigationProp } from "@react-navigation/drawer";

interface CustomHeaderProps {
  navigation: DrawerNavigationProp<any>;
  options: {
    title?: string;
  };
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ navigation, options }) => {
  const { t } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const toggleLanguage = () => {
    const currentLang = i18n.language;
    const newLang = currentLang === "fr" ? "dr" : "fr";
    i18n.changeLanguage(newLang);
    setLanguage(newLang);
  };

  const isRTL = language === "dr";

  return (
    <View
      className={`flex-row items-center p-4 bg-[#1e293b] ${
        isRTL ? "flex-row-reverse" : ""
      }`}
    >
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        className={`${isRTL ? "ml-auto" : "mr-auto"}`}
      >
        <Menu size={30} color="#f59e0b" />
      </TouchableOpacity>

      <View className="flex-1 flex-row justify-center items-center">
        <Text className="text-white text-lg font-bold">
          {options.title || t("common.kessabPro")}
        </Text>
      </View>

      <TouchableOpacity
        onPress={toggleLanguage}
        className="p-2 rounded-md bg-transparent ml-auto"
      >
        {i18n.language === "fr" && <CountryFlag isoCode="MA" size={24} />}
        {i18n.language === "dr" && <CountryFlag isoCode="FR" size={24} />}
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;
