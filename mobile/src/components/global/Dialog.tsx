import "../../../global.css";
import React from "react";
import { Dialog as RNEDialog } from "@rneui/themed";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

interface DialogProps {
  title: string;
  visible: boolean;
  toggleDialog: () => void;
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({
  title,
  visible,
  toggleDialog,
  children,
}) => {
  const { t } = useTranslation();
  const isRTL = t("dir") === "rtl";

  return (
    <View>
      <RNEDialog isVisible={visible} onBackdropPress={toggleDialog}>
        <RNEDialog.Title
          title={title}
          titleStyle={{
            direction: isRTL ? "rtl" : "ltr",
            color: "#334155", // Deep Slate Blue
            fontSize: 18,
            fontWeight: "bold",
          }}
        />
        <View className="p-2">{children}</View>
      </RNEDialog>
    </View>
  );
};

export default Dialog;
