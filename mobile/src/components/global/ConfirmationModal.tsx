import "../../../global.css";
import React from "react";
import { View } from "react-native";
import Button from "./Button";
import Dialog from "./Dialog";
import Text from "./Text";
import { useTranslation } from "react-i18next";
import { LucideIcon } from "lucide-react-native";

interface ButtonParams {
  type: string;
  icon: {
    name: string;
    IconComponent?: LucideIcon;
  };
  btnText: string;
}

interface ConfirmationModalProps {
  visible: boolean;
  toggleVisible: (value: boolean) => void;
  action: () => void;
  closable: boolean;
  btnParams: ButtonParams;
  title: string;
  bodyText: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  toggleVisible,
  action,
  closable,
  btnParams,
  title,
  bodyText,
}) => {
  const { t } = useTranslation();
  const isRTL = t("dir") === "rtl";

  return (
    <Dialog title={title} toggleDialog={() => toggleVisible(!visible)} visible={visible}>
      <View
        className="flex-col gap-2"
        style={{ direction: isRTL ? "rtl" : "ltr" }}
      >
        <Text
          className="text-center p-2.5 text-slate-700"
          style={{
            direction: isRTL ? "rtl" : "ltr",
          }}
        >
          {bodyText}
        </Text>
        <View
          className="flex-row justify-center"
          style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
        >
          <Button
            type={btnParams.type}
            style={{
              padding: 12,
              marginRight: 12,
              marginLeft: 12,
              marginBottom: 8,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#F59E0B", // Warm Amber
              borderRadius: 8,
            }}
            textStyle={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 16,
            }}
            icon={{
              name: btnParams.icon.name,
              color: "white",
            }}
            onPress={() => {
              action();
              toggleVisible(!visible);
            }}
          >
            {btnParams.btnText}
          </Button>
          {closable && (
            <Button
              type={"primary"}
              style={{
                padding: 12,
                marginRight: 12,
                marginLeft: 12,
                marginBottom: 8,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#334155", // Deep Slate Blue
                borderRadius: 8,
              }}
              textStyle={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 16,
              }}
              icon={{
                name: "close",
                color: "white",
              }}
              onPress={() => {
                toggleVisible(!visible);
              }}
            >
              {t("common.close")}
            </Button>
          )}
        </View>
      </View>
    </Dialog>
  );
};

export default ConfirmationModal;
