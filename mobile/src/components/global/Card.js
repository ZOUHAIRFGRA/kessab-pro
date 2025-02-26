import { styled } from "dripsy";
import { View, Text } from "react-native";
import { t } from "i18next";

const Card = styled(View)((props) => ({
  backgroundColor: "white",
  borderRadius: 8,
  padding: 12,
  shadowColor: "black",
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
  elevation: 3,
  flexDirection: t("dir") === "rtl" ? "row-reverse" : "row",
  justifyContent: "space-between",
  gap: 16,
}));

export default Card;
