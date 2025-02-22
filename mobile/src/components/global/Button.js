import { Text, TouchableOpacity } from "react-native";
import Colors from "../../utils/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const Button = ({
  type,
  children: text,
  style,
  textStyle,
  icon = null,
  onPress,
}) => {
  const { t } = useTranslation();
  return (
    <TouchableOpacity
      style={{
        backgroundColor: Colors[type],
        padding: 8,
        borderRadius: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: t("dir") === "rtl" ? "row-reverse" : "row",
        gap: 4,
        shadowColor: "black",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        ...style,
      }}
      onPress={onPress}
    >
      {icon != null && (
        <FontAwesome name={icon["name"]} size={16} color={icon["color"]} />
      )}
      <Text style={{ ...textStyle }}>{text}</Text>
    </TouchableOpacity>
  );
};
export default Button;
