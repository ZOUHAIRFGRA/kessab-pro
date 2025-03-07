import React, { useState, useEffect } from "react";
import { ScrollView, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  CommonActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Alert, BackHandler } from "react-native";
import { getBuyer, updateBuyer } from "../../features/buyerSlice";
import Container from "../../components/global/Container";
import Header from "../../components/global/Header";
import { Icon, Input } from "@rneui/base";
import Button from "../../components/global/Button";
import Colors from "../../utils/Colors";
import { useToast } from "../../hooks/useToast";

import Loading from "../../components/global/Loading";
import buyerApi from "../../api/buyerApi";

export default function UpdateBuyersScreen({ route }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { showSuccessToast, showErrorToast } = useToast();

  const { buyerId } = route.params;

  const { buyer, buyerLoading } = useSelector(({ buyers }) => buyers);

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

  useEffect(() => {
    dispatch(getBuyer(buyerId));
  }, [buyerId, dispatch]);

  useEffect(() => {
    if (buyer) {
      setBuyerData({
        fullName: buyer.fullName || "",
        CIN: buyer.CIN || "",
        phone: buyer.phone || "",
        address: buyer.address || "",
      });
    }
  }, [buyer]);

  const validateField = (field, value) => {
    switch (field) {
      case "fullName":
        if (!value) return t("validation.fullNameRequired");
        if (value.length < 4) return t("validation.fullNameMinLength");
        if (value.length > 50) return t("validation.fullNameMaxLength");
        return "";
      case "CIN":
        return "";
      case "phone":
        return value && !/^\d{10}$/.test(value)
          ? t("validation.phoneFormat")
          : "";
      case "address":
        return "";
      default:
        return "";
    }
  };

  const handleInputChange = (field, value) => {
    setBuyerData((prev) => ({
      ...prev,
      [field]: value,
    }));

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

    return !Object.values(formErrors).some((error) => error !== "");
  };
  const handleSubmit = () => {
    if (validateForm()) {
      const payload = {
        ...buyer,
        ...buyerData,
      };
      payload["cin"] = payload["CIN"];

      buyerApi
        .updateBuyer(buyerId, payload)
        .then(() => {
          dispatch(getBuyer(buyerId));
          showSuccessToast();
        })
        .catch(() => {
          showErrorToast();
        });

      showSuccessToast();
    }
  };

  if (buyerLoading) return <Loading />;

  return (
    <ScrollView>
      <Container
        sx={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../../../assets/hi2.png")}
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
        <Header level="h2">{t("common.updateBuyer")}</Header>

        <Input
          label={t("common.FullName")}
          value={buyerData.fullName}
          onChangeText={(text) => handleInputChange("fullName", text)}
          errorMessage={errors.fullName}
          errorStyle={{ color: Colors.danger}}
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
          errorStyle={{ color: Colors.danger}}
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
            name: "edit",
            color: Colors.white,
          }}
        >
          {t("common.Update")}
        </Button>
      </Container>
    </ScrollView>
  );
}
