import React from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image } from "react-native";
import { styled } from "dripsy";
import { getBaseURL } from "../api/axiosInstance";
import Input from "./Input";

const AddCategory = ({ newCategory, t,setNewCategory, selectedIcon, setSelectedIcon, icons, handleAddCategory }) => {
  return (
    <Container>
      <SectionTitle>{t("common.add_new_category")}</SectionTitle>
      <Input
        placeholder={t("common.enter_category_name")}
        value={newCategory}
        onChangeText={setNewCategory}
      />

      <SubTitle>{t("common.select_icon")}</SubTitle>
      {icons.length === 0 ? (
        <NoIconsText>{t("common.no_icons_available")}</NoIconsText>
      ) : (
        <IconScroll horizontal showsHorizontalScrollIndicator={false}>
          {icons.map((icon) => (
            <IconItem
              key={icon.id}
              onPress={() => setSelectedIcon(icon)}
              isSelected={selectedIcon?.id === icon.id}
            >
              <IconImage
                source={{ uri: `${getBaseURL()}${icon.iconPath}` }}
                defaultSource={{ uri: "https://placehold.co/50x50" }}
              />
            </IconItem>
          ))}
        </IconScroll>
      )}

      <AddButton onPress={handleAddCategory}>
        <ButtonText>{t("common.add_category")}</ButtonText>
      </AddButton>
    </Container>
  );
};

// Styled Components
const Container = styled(View)({
  marginBottom: 16,
});

const SectionTitle = styled(Text)({
  fontSize: 18,
  fontWeight: "700",
  color: "#2c3e50",
  marginBottom: 12,
});

const SubTitle = styled(Text)({
  fontSize: 16,
  color: "#64748b",
  marginVertical: 10,
});

const IconScroll = styled(ScrollView)({
  marginBottom: 16,
});

const IconItem = styled(TouchableOpacity)(({ isSelected }) => ({
  padding: 4,
  marginRight: 12,
  borderWidth: isSelected ? 3 : 1,
  borderColor: isSelected ? "#4A90E2" : "#e5e7eb",
  borderRadius: 8,
}));

const IconImage = styled(Image)({
  width: 50,
  height: 50,
  borderRadius: 6,
});

const NoIconsText = styled(Text)({
  fontSize: 14,
  color: "#b0b0b0",
  textAlign: "center",
  marginBottom: 16,
});

const AddButton = styled(TouchableOpacity)({
  backgroundColor: "#4A90E2",
  padding: 12,
  borderRadius: 8,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
});

const ButtonText = styled(Text)({
  color: "#fff",
  fontSize: 16,
  fontWeight: "600",
});

export default AddCategory;