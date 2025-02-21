import { Text as ReactNativeText } from "react-native";
import { t } from "i18next";

const Text = ({ style, children }) => {
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
