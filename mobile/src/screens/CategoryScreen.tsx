import React, { useState } from "react";
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
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Check,
  Image as ImageIcon,
  ArrowLeft,
  Layers,
} from "lucide-react-native";
import {
  useGetCategoriesQuery,
  useGetCategoryIconsQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../services";
import { getBaseURL } from "../services";
import FallBack, { FALLBACK_TYPE } from "../components/global/Fallback";
import type { Category, CategoryIcon } from "../types/api";
import "../../global.css";

const BASE_URL = getBaseURL();
const DEFAULT_CATEGORY_NAME = "Livestock";

export default function CategoryScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const isRTL = t("dir") === "rtl";

  // RTK Query hooks
  const { data: categories = [], isLoading: categoriesLoading, refetch: refetchCategories } = useGetCategoriesQuery();
  const { data: icons = [], isLoading: iconsLoading } = useGetCategoryIconsQuery();

  // Mutations
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [categoryName, setCategoryName] = useState("");
  const [selectedIconId, setSelectedIconId] = useState<number | null>(null);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [isIconModalVisible, setIconModalVisible] = useState(false);
  const [isAddOrEditVisible, setAddOrEditVisible] = useState(false);

  const handleAddOrUpdateCategory = async () => {
    if (!categoryName.trim()) {
      Alert.alert(t("common.error"), t("common.categoryNameRequired"));
      return;
    }
    if (!selectedIconId) {
      Alert.alert(t("common.error"), t("common.iconRequired"));
      return;
    }
    if (categoryName.trim().toLowerCase() === DEFAULT_CATEGORY_NAME.toLowerCase()) {
      Alert.alert(t("common.error"), t("common.defaultCategoryNameError"));
      return;
    }

    try {
      const categoryData = { typeName: categoryName, iconId: selectedIconId };
      if (editingCategoryId) {
        await updateCategory({ id: editingCategoryId, data: categoryData }).unwrap();
      } else {
        await createCategory(categoryData).unwrap();
      }
      handleCancel();
    } catch (err: any) {
      Alert.alert(t("common.error"), err.message || t("common.operationFailed"));
    }
  };

  const handleEditCategory = (category: Category) => {
    if (category.typeName.toLowerCase() === DEFAULT_CATEGORY_NAME.toLowerCase()) {
      Alert.alert(t("common.error"), t("common.defaultCategoryEditError"));
      return;
    }
    setCategoryName(category.typeName);
    setSelectedIconId(category.icon?.id || null);
    setEditingCategoryId(category.id);
    setAddOrEditVisible(true);
  };

  const handleDeleteCategory = (id: number, typeName: string) => {
    if (typeName.toLowerCase() === DEFAULT_CATEGORY_NAME.toLowerCase()) {
      Alert.alert(t("common.error"), t("common.defaultCategoryDeleteError"));
      return;
    }
    Alert.alert(t("common.deleteCategory"), t("common.confirmDelete"), [
      { text: t("common.cancel"), style: "cancel" },
      {
        text: t("common.delete"),
        style: "destructive",
        onPress: async () => {
          try {
            await deleteCategory(id).unwrap();
          } catch (err: any) {
            Alert.alert(t("common.error"), err.message || t("common.operationFailed"));
          }
        },
      },
    ]);
  };

  const handleCancel = () => {
    setAddOrEditVisible(false);
    setEditingCategoryId(null);
    setCategoryName("");
    setSelectedIconId(null);
  };

  const renderCategoryItem = ({ item }: { item: Category }) => {
    const icon = item.icon?.iconPath
      ? item.icon
      : icons.find((i: CategoryIcon) => i.id === item.icon?.id) || { iconPath: null };
    const isDefault = item.typeName.toLowerCase() === DEFAULT_CATEGORY_NAME.toLowerCase();

    return (
      <View className="bg-white rounded-2xl p-4 mb-3 shadow-sm flex-row items-center">
        <View className="w-12 h-12 bg-surface-100 rounded-xl items-center justify-center">
          {(icon as any)?.iconPath ? (
            <Image
              source={{ uri: `${BASE_URL}${(icon as any).iconPath}` }}
              className="w-8 h-8"
              resizeMode="contain"
            />
          ) : (
            <Layers size={24} color="#627d98" />
          )}
        </View>
        <Text className="flex-1 ml-4 text-primary-800 text-base font-medium">
          {item.typeName}
        </Text>
        {!isDefault && (
          <View className="flex-row">
            <TouchableOpacity
              onPress={() => handleEditCategory(item)}
              className="w-10 h-10 bg-info-100 rounded-xl items-center justify-center mr-2"
            >
              <Edit2 size={18} color="#0ea5e9" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDeleteCategory(item.id, item.typeName)}
              className="w-10 h-10 bg-danger-100 rounded-xl items-center justify-center"
            >
              <Trash2 size={18} color="#f43f5e" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const renderIconItem = ({ item }: { item: CategoryIcon }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedIconId(item.id);
        setIconModalVisible(false);
      }}
      className={`p-3 m-1 rounded-xl items-center justify-center ${
        selectedIconId === item.id ? "bg-accent-100 border-2 border-accent-500" : "bg-surface-100"
      }`}
      style={{ width: 80, height: 80 }}
    >
      <Image
        source={{ uri: `${BASE_URL}${(item as any).iconPath}` }}
        className="w-10 h-10"
        resizeMode="contain"
      />
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-surface-50">
      {/* Header */}
      <LinearGradient colors={["#334e68", "#243b53"]} style={styles.header}>
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="w-10 h-10 bg-white/10 rounded-full items-center justify-center"
          >
            <ArrowLeft size={22} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold">
            {t("common.manageCategories")}
          </Text>
          <View className="w-10" />
        </View>
      </LinearGradient>

      <View className="flex-1 px-5 pt-4">
        {/* Add Category Button */}
        {!isAddOrEditVisible && (
          <TouchableOpacity
            onPress={() => setAddOrEditVisible(true)}
            activeOpacity={0.8}
            className="mb-4"
          >
            <LinearGradient
              colors={["#f59e0b", "#d97706"]}
              style={styles.addButton}
            >
              <Plus size={20} color="white" />
              <Text className="text-white font-semibold ml-2">
                {t("common.add_category")}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}

        {/* Add/Edit Form */}
        {isAddOrEditVisible && (
          <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
            <Text className="text-primary-800 font-bold text-lg mb-4">
              {editingCategoryId ? t("common.edit") : t("common.add")} {t("common.category")}
            </Text>
            <TextInput
              placeholder={t("common.categoryName")}
              value={categoryName}
              onChangeText={setCategoryName}
              placeholderTextColor="#a1a1aa"
              className={`bg-surface-50 rounded-xl p-4 text-base text-primary-900 mb-3 ${
                isRTL ? "text-right" : "text-left"
              }`}
            />
            <TouchableOpacity
              onPress={() => setIconModalVisible(true)}
              className="bg-surface-50 rounded-xl p-4 flex-row items-center justify-between mb-4"
            >
              <View className="flex-row items-center">
                {selectedIconId ? (
                  <Image
                    source={{
                      uri: `${BASE_URL}${(icons.find((i: CategoryIcon) => i.id === selectedIconId) as any)?.iconPath}`,
                    }}
                    className="w-8 h-8 mr-3"
                    resizeMode="contain"
                  />
                ) : (
                  <ImageIcon size={24} color="#a1a1aa" />
                )}
                <Text className={`text-base ${selectedIconId ? "text-primary-800" : "text-surface-400"}`}>
                  {selectedIconId ? t("common.iconSelected") : t("common.selectIcon")}
                </Text>
              </View>
            </TouchableOpacity>
            <View className="flex-row">
              <TouchableOpacity
                onPress={handleAddOrUpdateCategory}
                className="flex-1 mr-2"
              >
                <LinearGradient
                  colors={["#14b8a6", "#0d9488"]}
                  style={styles.saveButton}
                >
                  <Check size={18} color="white" />
                  <Text className="text-white font-semibold ml-2">
                    {editingCategoryId ? t("common.update") : t("common.add")}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCancel}
                className="flex-1 ml-2 bg-surface-200 rounded-xl py-3 flex-row items-center justify-center"
              >
                <X size={18} color="#52525b" />
                <Text className="text-surface-700 font-semibold ml-2">
                  {t("common.cancel")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Categories List */}
        {(categoriesLoading || iconsLoading) ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#334e68" />
          </View>
        ) : (
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCategoryItem}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <FallBack message={t("common.noCategories")} type={FALLBACK_TYPE.NO_RESULT} />
            }
          />
        )}
      </View>

      {/* Icon Selection Modal */}
      <Modal visible={isIconModalVisible} animationType="slide" transparent>
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl p-5 max-h-[70%]">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-primary-800 text-xl font-bold">
                {t("common.selectIcon")}
              </Text>
              <TouchableOpacity onPress={() => setIconModalVisible(false)}>
                <X size={24} color="#52525b" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={icons}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderIconItem}
              numColumns={4}
              contentContainerStyle={{ paddingBottom: 20 }}
              ListEmptyComponent={
                <Text className="text-center text-surface-500 py-8">
                  {t("common.noIcons")}
                </Text>
              }
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 48,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  addButton: {
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
