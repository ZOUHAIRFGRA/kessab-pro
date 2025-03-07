import React, { useState } from "react";
import { Dialog } from "@rneui/themed";
import { View, StyleSheet } from "react-native";
import Text from "../../components/global/Text";
import Button from "../../components/global/Button";
import { useTranslation } from "react-i18next";
const Dialogs = ({ title, visible, toggleDialog, children }) => {
  const {t} = useTranslation();
  const isRTL = t("dir") === "rtl";
  return (
    <View>
      <Dialog isVisible={visible} onBackdropPress={toggleDialog}>
        <Dialog.Title title={title} titleStyle={{direction: isRTL ? "rtl" : "ltr"}}/>
        {children}
      </Dialog>
    </View>
  );
};

export default Dialogs;
