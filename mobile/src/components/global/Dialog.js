import React, { useState } from "react";
import { Dialog } from "@rneui/themed";
import { View, StyleSheet } from "react-native";
import Text from "../../components/global/Text";
import Button from "../../components/global/Button";
const Dialogs = ({ title, visible, toggleDialog, children }) => {
  return (
    <View>
      <Dialog isVisible={visible} onBackdropPress={toggleDialog}>
        <Dialog.Title title={title} />
        {children}
      </Dialog>
    </View>
  );
};

export default Dialogs;
