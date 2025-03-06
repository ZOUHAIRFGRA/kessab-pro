import { Card, InfoRow, InfoText, EditButton } from "./sharedStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
import { View } from 'dripsy';

export const AnimalInfo = ({ animal, setEditing, onDelete, isRTL, t }) => {
  const animalStatus = animal?.saleId ? t("common.Sold") : t("common.Available");

  return (
    <Card style={{ direction: isRTL ? "rtl" : "ltr" }}>
      <InfoRow>
        <InfoText>🔖 {t("common.tag")}: {animal.tag}</InfoText>
      </InfoRow>
      <InfoRow>
        <InfoText>💰 {t("common.price")}: {animal.price} DH</InfoText>
      </InfoRow>
      <InfoRow>
        <InfoText>⚖️ {t("common.weight")}: {animal.weight} kg</InfoText>
      </InfoRow>
      <InfoRow>
        <InfoText>🚻 {t("common.sex")}: {animal.sex}</InfoText>
      </InfoRow>
      <InfoRow>
        <InfoText>📅 {t("common.birthDate")}: {animal.birthDate}</InfoText>
      </InfoRow>
      <InfoRow>
        <InfoText>📅 {t("common.pickup_date")}: {animal.pickUpDate ? animal.pickUpDate : t("Not Available")}</InfoText>
      </InfoRow>
      <InfoRow>
        <InfoText>  {t("common.Status")}: {animalStatus}</InfoText>
      </InfoRow>
      <View style={{ flexDirection: isRTL ? "row-reverse" : "row", justifyContent: "space-between", marginTop: 10 }}>
        <EditButton onPress={() => setEditing(true)}>
          <MaterialIcons name="edit" size={20} color="blue" />
        </EditButton>
        <TouchableOpacity
          onPress={onDelete}
          style={{
            backgroundColor: "red",
            padding: 10,
            borderRadius: 5,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialIcons name="delete" size={20} color="white" />
          <Text style={{ color: "white", marginLeft: 5 }}>{t("common.delete")}</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};