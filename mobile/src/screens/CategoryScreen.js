import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
  Image,
} from "react-native";
import { styled } from "dripsy";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  fetchCategories,
  addCategory,
  modifyCategory as updateCategory,
  removeCategory as deleteCategory,
} from "../features/categorySlice";
import { fetchCategoriesIcons } from "../features/iconsSlice";
import Colors from "../utils/Colors";
import { getBaseURL } from "../api/axiosInstance";

const BASE_URL = getBaseURL(); 

const CategoryScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { categories, loading: categoriesLoading, error: categoriesError } = useSelector(
    (state) => state.categories
  );
  const { icons, loading: iconsLoading, error: iconsError } = useSelector(
    (state) => state.icons
  );

  const [categoryName, setCategoryName] = useState("");
  const [selectedIconId, setSelectedIconId] = useState(null);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [isIconModalVisible, setIconModalVisible] = useState(false);
  const isRTL = t("dir") === "rtl";

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchCategoriesIcons());
  }, [dispatch]);

  const handleAddOrUpdateCategory = async () => {
    if (!categoryName.trim()) {
      Alert.alert(t("common.error"), t("common.categoryNameRequired"));
      return;
    }
    if (!selectedIconId) {
      Alert.alert(t("common.error"), t("common.iconRequired"));
      return;
    }

    try {
      const categoryData = {
        typeName: categoryName,
        iconId: selectedIconId,
      };
      if (editingCategoryId) {
        await dispatch(
          updateCategory({ id: editingCategoryId, categoryData })
        ).unwrap();
        setEditingCategoryId(null);
      } else {
        await dispatch(addCategory(categoryData)).unwrap();
      }
      setCategoryName("");
      setSelectedIconId(null);
    } catch (err) {
      Alert.alert(t("common.error"), err.message || t("common.operationFailed"));
    }
  };

  const handleEditCategory = (category) => {
    setCategoryName(category.typeName);
    setSelectedIconId(category.icon?.id || null);
    setEditingCategoryId(category.id);
  };

  const handleDeleteCategory = (id) => {
    Alert.alert(
      t("common.deleteCategory"),
      t("common.confirmDelete"),
      [
        { text: t("common.cancel"), style: "cancel" },
        {
          text: t("common.delete"),
          style: "destructive",
          onPress: async () => {
            try {
              await dispatch(deleteCategory(id)).unwrap();
            } catch (err) {
              Alert.alert(t("common.error"), err.message || t("common.operationFailed"));
            }
          },
        },
      ]
    );
  };

  const handleSelectIcon = (iconId) => {
    setSelectedIconId(iconId);
    setIconModalVisible(false);
  };

  const renderIconItem = ({ item }) => (
    <IconItem onPress={() => handleSelectIcon(item.id)}>
      <IconImage source={{ uri: `${BASE_URL}${item.iconPath}` }} />
      <IconText isRTL={isRTL}>{item.iconPath.split("/").pop()}</IconText>
    </IconItem>
  );

  const renderCategoryItem = ({ item }) => (
    <CategoryItem isRTL={isRTL}>
      <CategoryInfo>
        {item.icon?.iconPath ? (
          <IconImage source={{ uri: `${BASE_URL}${item.icon.iconPath}` }} />
        ) : (
          <PlaceholderIcon>No Icon</PlaceholderIcon>
        )}
        <CategoryText isRTL={isRTL}>{item.typeName}</CategoryText>
      </CategoryInfo>
      <ButtonContainer>
        <EditButton onPress={() => handleEditCategory(item)}>
          <ButtonText>{t("common.edit")}</ButtonText>
        </EditButton>
        <DeleteButton onPress={() => handleDeleteCategory(item.id)}>
          <ButtonText>{t("common.delete")}</ButtonText>
        </DeleteButton>
      </ButtonContainer>
    </CategoryItem>
  );

  useEffect(() => {
    if (!categoriesLoading && !iconsLoading) {
      dispatch(fetchCategories());
    }
  }, [categoriesLoading, iconsLoading, dispatch]);

  return (
    <ScreenContainer>
      <Title isRTL={isRTL}>{t("common.manageCategories")}</Title>

      {(categoriesLoading || iconsLoading) && (
        <ActivityIndicator size="large" color={Colors.primary} />
      )}
      {(categoriesError || iconsError) && (
        <ErrorText isRTL={isRTL}>
          {t("common.error")}: {categoriesError || iconsError}
        </ErrorText>
      )}

      <InputContainer>
        <CategoryInput
          placeholder={t("common.categoryName")}
          value={categoryName}
          onChangeText={setCategoryName}
          isRTL={isRTL}
        />
        <IconSelectButton onPress={() => setIconModalVisible(true)}>
          <ButtonText>
            {selectedIconId
              ? icons.find((icon) => icon.id === selectedIconId)?.iconPath || t("common.selectIcon")
              : t("common.selectIcon")}
          </ButtonText>
        </IconSelectButton>
        <AddButton onPress={handleAddOrUpdateCategory}>
          <ButtonText>{editingCategoryId ? t("common.update") : t("common.add")}</ButtonText>
        </AddButton>
      </InputContainer>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCategoryItem}
        ListEmptyComponent={<EmptyText isRTL={isRTL}>{t("common.noCategories")}</EmptyText>}
      />

      <Modal visible={isIconModalVisible} animationType="slide" transparent={true}>
        <ModalOverlay>
          <ModalContent>
            <ModalTitle isRTL={isRTL}>{t("common.selectIcon")}</ModalTitle>
            <FlatList
              data={icons}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderIconItem}
              ListEmptyComponent={<EmptyText isRTL={isRTL}>{t("common.noIcons")}</EmptyText>}
            />
            <CloseButton onPress={() => setIconModalVisible(false)}>
              <ButtonText>{t("common.close")}</ButtonText>
            </CloseButton>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </ScreenContainer>
  );
};


const ScreenContainer = styled(View)({
  flex: 1,
  backgroundColor: Colors.secondaryLight,
  padding: 16,
});

const Title = styled(Text)(({ isRTL }) => ({
  fontSize: 24,
  fontWeight: "700",
  color: Colors.primary,
  marginBottom: 16,
  textAlign: isRTL ? "right" : "left",
}));

const InputContainer = styled(View)({
  flexDirection: "column",
  alignItems: "stretch",
  marginBottom: 16,
  gap: 8,
});

const CategoryInput = styled(TextInput)(({ isRTL }) => ({
  borderWidth: 1,
  borderColor: Colors.primaryLight,
  borderRadius: 8,
  padding: 12,
  fontSize: 16,
  color: Colors.primary,
  backgroundColor: Colors.white,
  textAlign: isRTL ? "right" : "left",
}));

const IconSelectButton = styled(TouchableOpacity)({
  backgroundColor: Colors.info,
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderRadius: 8,
  alignItems: "center",
});

const AddButton = styled(TouchableOpacity)({
  backgroundColor: Colors.success,
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderRadius: 8,
  alignItems: "center",
});

const CategoryItem = styled(View)(({ isRTL }) => ({
  flexDirection: isRTL ? "row-reverse" : "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 12,
  backgroundColor: Colors.white,
  borderRadius: 8,
  marginBottom: 8,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 2,
}));

const CategoryInfo = styled(View)({
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
});

const IconImage = styled(Image)({
  width: 30,
  height: 30,
  resizeMode: "contain",
});

const PlaceholderIcon = styled(Text)({
  fontSize: 14,
  color: Colors.danger,
});

const CategoryText = styled(Text)(({ isRTL }) => ({
  fontSize: 16,
  color: Colors.primary,
  textAlign: isRTL ? "right" : "left",
}));

const ButtonContainer = styled(View)({
  flexDirection: "row",
  gap: 8,
});

const EditButton = styled(TouchableOpacity)({
  backgroundColor: Colors.info,
  paddingVertical: 8,
  paddingHorizontal: 12,
  borderRadius: 8,
});

const DeleteButton = styled(TouchableOpacity)({
  backgroundColor: Colors.danger,
  paddingVertical: 8,
  paddingHorizontal: 12,
  borderRadius: 8,
});

const ButtonText = styled(Text)({
  color: Colors.white,
  fontSize: 14,
  fontWeight: "600",
});

const EmptyText = styled(Text)(({ isRTL }) => ({
  fontSize: 16,
  color: Colors.primary,
  textAlign: isRTL ? "right" : "center",
  marginTop: 16,
}));

const ErrorText = styled(Text)(({ isRTL }) => ({
  fontSize: 16,
  color: Colors.danger,
  textAlign: isRTL ? "right" : "left",
  marginBottom: 16,
}));

const ModalOverlay = styled(View)({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,0.5)",
});

const ModalContent = styled(View)({
  width: "80%",
  backgroundColor: Colors.white,
  borderRadius: 12,
  padding: 16,
  maxHeight: "80%",
});

const ModalTitle = styled(Text)(({ isRTL }) => ({
  fontSize: 20,
  fontWeight: "700",
  color: Colors.primary,
  marginBottom: 16,
  textAlign: isRTL ? "right" : "left",
}));

const IconItem = styled(TouchableOpacity)({
  flexDirection: "row",
  alignItems: "center",
  padding: 12,
  borderBottomWidth: 1,
  borderBottomColor: Colors.primaryLight,
  gap: 8,
});

const IconText = styled(Text)(({ isRTL }) => ({
  fontSize: 16,
  color: Colors.primary,
  textAlign: isRTL ? "right" : "left",
}));

const CloseButton = styled(TouchableOpacity)({
  backgroundColor: Colors.danger,
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderRadius: 8,
  alignItems: "center",
  marginTop: 16,
});

export default CategoryScreen;