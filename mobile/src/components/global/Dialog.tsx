import "../../../global.css";
import React from "react";
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react-native";

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
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={toggleDialog}
    >
      <Pressable
        className="flex-1 justify-center items-center bg-black/50"
        onPress={toggleDialog}
      >
        <Pressable
          className="bg-white rounded-3xl w-[90%] max-w-[500px] shadow-2xl"
          onPress={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <View className="flex-row items-center justify-between p-5 pb-3 border-b border-surface-200">
            <Text
              className="text-primary-800 text-lg font-bold flex-1"
              style={{ textAlign: isRTL ? "right" : "left" }}
            >
              {title}
            </Text>
            <TouchableOpacity
              onPress={toggleDialog}
              className="w-8 h-8 rounded-full bg-surface-100 items-center justify-center"
            >
              <X size={20} color="#64748b" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView className="max-h-[500px]">
            <View className="p-5">{children}</View>
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default Dialog;
