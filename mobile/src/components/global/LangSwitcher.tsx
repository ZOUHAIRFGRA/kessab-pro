import "../../../global.css";
import React from "react";
import { useTranslation } from "react-i18next";
import { View, TouchableOpacity } from "react-native";
import { Languages } from "lucide-react-native";
import Text from "./Text";

interface LanguageOption {
  code: string;
  label: string;
}

const languages: LanguageOption[] = [
  { code: "dr", label: "Darija" },
  { code: "fr", label: "French" },
];

const LangSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  return (
    <View className="flex-row gap-2 p-2">
      {languages.map((lang) => (
        <TouchableOpacity
          key={lang.code}
          className={`flex-row items-center gap-2 px-4 py-2.5 rounded-lg border ${
            currentLanguage === lang.code
              ? "bg-amber-500 border-amber-600"
              : "bg-slate-100 border-slate-300"
          }`}
          onPress={() => i18n.changeLanguage(lang.code)}
        >
          <Languages
            size={18}
            color={currentLanguage === lang.code ? "white" : "#334155"}
          />
          <Text
            className={`text-sm font-semibold ${
              currentLanguage === lang.code ? "text-white" : "text-slate-700"
            }`}
          >
            {lang.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default LangSwitcher;
