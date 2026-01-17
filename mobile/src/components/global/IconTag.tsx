import "../../../global.css";
import React from "react";
import { View } from "react-native";
import { LucideIcon } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import Text from "./Text";

interface IconTagProps {
  icon?: LucideIcon;
  color?: string;
  content: string;
  style?: object;
  textStyle?: object;
  hideIcon?: boolean;
  iconSize?: number;
}

const IconTag: React.FC<IconTagProps> = ({
  icon: Icon,
  color = "#F59E0B", // Warm Amber
  content,
  style,
  textStyle,
  hideIcon = false,
  iconSize = 16,
}) => {
  const { t } = useTranslation();
  const isRTL = t("dir") === "rtl";

  return (
    <View
      className="flex-row items-center gap-2.5 py-1 px-6 border border-slate-300 rounded"
      style={[
        isRTL && { flexDirection: "row-reverse" },
        style,
      ]}
    >
      {!hideIcon && Icon && (
        <Icon size={iconSize} color={color} className="mr-1" />
      )}
      <Text style={textStyle}>{content}</Text>
    </View>
  );
};

export default IconTag;
