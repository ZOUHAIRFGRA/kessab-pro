import { useTranslation } from "react-i18next";
import { Text as ReactNativeText } from "react-native";


const Text = ({ style, children }) => {
    const { t } = useTranslation();
  return (
    <ReactNativeText
      style={{
        textAlign: t("dir") === "rtl" ? "right" : "left",
        fontSize: 16,
        ...style,
      }}
    >
      {children}
    </ReactNativeText>
  );
};

export default Text;
