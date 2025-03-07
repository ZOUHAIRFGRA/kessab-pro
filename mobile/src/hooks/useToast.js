import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";
import Colors from "../utils/Colors";

export const useToast = () => {
  const { t } = useTranslation();
  const isRTL = t("dir") === "rtl";

  const showSuccessToast = useCallback(
    (message) => {
      Toast.show({
        type: "success",
        text1: isRTL ? "نجاح!" : "Success!",
        text2: message || "Action was successful!",
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 60,
        position: "top",
        style: {
          backgroundColor: Colors.primary,
          padding: 15,
          borderRadius: 8,
          flexDirection: isRTL ? "row-reverse" : "row",
        },
        text1Style: {
          fontSize: 16,
          textAlign: isRTL ? "right" : "left",
        },
        text2Style: {
          fontSize: 14,
          textAlign: isRTL ? "right" : "left",
        },
      });
    },
    [isRTL]
  );

  const showErrorToast = useCallback(
    (message) => {
      Toast.show({
        type: "error",
        text1: isRTL ? "خطأ" : "Error",
        text2: message || "Something went wrong.",
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 60,
        position: "top",
        style: {
          backgroundColor: Colors.danger,
          padding: 15,
          borderRadius: 8,
          flexDirection: isRTL ? "row-reverse" : "row",
        },
        text1Style: {
          fontSize: 16,
          textAlign: isRTL ? "right" : "left",
        },
        text2Style: {
          fontSize: 14,
          textAlign: isRTL ? "right" : "left",
        },
      });
    },
    [isRTL]
  );

  const showInfoToast = useCallback(
    (message) => {
      Toast.show({
        type: "info",
        text1: isRTL ? "معلومات" : "Info",
        text2: message || "This is an informational message.",
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 60,
        position: "top",
        style: {
          backgroundColor: "#3498db",
          padding: 15,
          borderRadius: 8,
          flexDirection: isRTL ? "row-reverse" : "row",
        },
        text1Style: {
          fontSize: 16,
          textAlign: isRTL ? "right" : "left",
        },
        text2Style: {
          fontSize: 14,
          textAlign: isRTL ? "right" : "left",
        },
      });
    },
    [isRTL]
  );

  return { showSuccessToast, showErrorToast, showInfoToast };
};
