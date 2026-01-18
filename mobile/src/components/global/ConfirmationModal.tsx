import "../../../global.css";
import React from "react";
import { View, TouchableOpacity, Text as RNText } from "react-native";
import Dialog from "./Dialog";
import Text from "./Text";
import { useTranslation } from "react-i18next";
import { LucideIcon, X } from "lucide-react-native";

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
  const IconComponent = btnParams.icon.IconComponent;

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
          className="flex-row justify-center gap-3"
          style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
        >
          <TouchableOpacity
            className="bg-amber-500 rounded-xl px-6 py-3 flex-row items-center gap-2"
            onPress={() => {
              action();
              toggleVisible(!visible);
            }}
            activeOpacity={0.8}
          >
            {IconComponent && <IconComponent size={20} color="#ffffff" />}
            <RNText className="text-white font-bold text-base">
              {btnParams.btnText}
            </RNText>
          </TouchableOpacity>
          
          {closable && (
            <TouchableOpacity
              className="bg-slate-700 rounded-xl px-6 py-3 flex-row items-center gap-2"
              onPress={() => {
                toggleVisible(!visible);
              }}
              activeOpacity={0.8}
            >
              <X size={20} color="#ffffff" />
              <RNText className="text-white font-bold text-base">
                {t("common.close")}
              </RNText>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Dialog>
  );
};

export default ConfirmationModal;
