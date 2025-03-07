import React, { useState } from "react";
import { ScrollView, Image } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import { addBuyer } from "../../features/buyerSlice";
import Container from "../../components/global/Container";
import Header from "../../components/global/Header";
import { Icon, Input } from "@rneui/base";
import Button from "../../components/global/Button";
import Colors from "../../utils/Colors";
import { useToast } from "../../hooks/useToast";

export default function AddBuyersScreen() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { showSuccessToast } = useToast();

  const [buyerData, setBuyerData] = useState({
    fullName: "",
    CIN: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    CIN: "",
    phone: "",
    address: "",
  });

  const validateField = (field, value) => {
    switch (field) {
      case "fullName":
        if (!value) return t("validation.fullNameRequired");
        if (value.length < 4) return t("validation.fullNameMinLength");
        if (value.length > 50) return t("validation.fullNameMaxLength");
        return "";
      case "CIN":
        return ""; // Optional field, no validation
      case "phone":
        return value && !/^\d{10}$/.test(value)
          ? t("validation.phoneFormat")
          : "";
      case "address":
        return ""; // Optional field, no validation
      default:
        return "";
    }
  };

  const handleInputChange = (field, value) => {
    // Update data
    setBuyerData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Validate field in real-time
    const errorMessage = validateField(field, value);
    setErrors((prev) => ({
      ...prev,
      [field]: errorMessage,
    }));
  };

  const validateForm = () => {
    const formErrors = {
      fullName: validateField("fullName", buyerData.fullName),
      phone: validateField("phone", buyerData.phone),
      CIN: validateField("CIN", buyerData.CIN),
      address: validateField("address", buyerData.address),
    };

    setErrors(formErrors);

    // Form is valid if no error messages exist
    return !Object.values(formErrors).some((error) => error !== "");
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const buyerPayload = { ...buyerData };

      dispatch(addBuyer(buyerPayload));
      showSuccessToast();
      navigation.goBack();
    }
  };

  return (
    <ScrollView>
      <Container
        sx={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../../../assets/hi.png")}
          style={{ height: 220, width: 220, resizeMode: "contain" }}
        />
      </Container>
      <Container
        sx={{
          gap: 12,
          justifyContent: "start",
          flex: 1,
          alignItems: "start",
          padding: 18,
        }}
      >
        <Header level="h2">{t("buyers.addNewBuyer")}</Header>

        <Input
          label={t("common.FullName")}
          value={buyerData.fullName}
          onChangeText={(text) => handleInputChange("fullName", text)}
          errorMessage={errors.fullName}
          errorStyle={{ color: Colors.danger }}
          required
          leftIcon={
            <Icon
              name="user"
              type="antdesign"
              size={24}
              color={Colors.secondary}
            />
          }
        />

        <Input
          label={t("common.CIN")}
          value={buyerData.CIN}
          onChangeText={(text) => handleInputChange("CIN", text)}
          errorMessage={errors.CIN}
          errorStyle={{ color: Colors.danger }}
          leftIcon={
            <Icon
              name="idcard"
              type="antdesign"
              size={24}
              color={Colors.secondary}
            />
          }
        />

        <Input
          label={t("common.Phone")}
          value={buyerData.phone}
          onChangeText={(text) => handleInputChange("phone", text)}
          keyboardType="number-pad"
          errorMessage={errors.phone}
          errorStyle={{ color: Colors.danger }}
          leftIcon={
            <Icon
              name="phone"
              type="antdesign"
              size={24}
              color={Colors.secondary}
            />
          }
        />

        <Input
          label={t("common.Address")}
          value={buyerData.address}
          onChangeText={(text) => handleInputChange("address", text)}
          multiline
          errorMessage={errors.address}
          errorStyle={{ color: Colors.danger }}
          leftIcon={
            <Icon
              name="map-outline"
              type="ionicon"
              size={24}
              color={Colors.secondary}
            />
          }
        />

        <Button
          type="primary"
          onPress={handleSubmit}
          style={{
            padding: 12,
            marginTop: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          textStyle={{
            color: Colors.white,
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 16,
          }}
          icon={{
            name: "plus",
            color: Colors.white,
          }}
        >
          {t("common.Save")}
        </Button>
      </Container>
    </ScrollView>
  );
}
