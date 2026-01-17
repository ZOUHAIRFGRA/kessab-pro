import React from "react";
import "../../global.css";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { getBaseURL } from "../api/axiosInstance";
import Input from "./Input";
import { Plus, ImageIcon } from "lucide-react-native";

interface Icon {
  id: string;
  iconPath: string;
}

interface AddCategoryProps {
  newCategory: string;
  t: (key: string) => string;
  setNewCategory: (value: string) => void;
  selectedIcon: Icon | null;
  setSelectedIcon: (icon: Icon) => void;
  icons: Icon[];
  handleAddCategory: () => void;
}

const AddCategory: React.FC<AddCategoryProps> = ({
  newCategory,
  t,
  setNewCategory,
  selectedIcon,
  setSelectedIcon,
  icons,
  handleAddCategory,
}) => {
  return (
    <View className="mb-4">
      <Text className="text-lg font-bold text-[#1e293b] mb-3">
        {t("common.add_new_category")}
      </Text>
      
      <Input
        placeholder={t("common.enter_category_name")}
        value={newCategory}
        onChangeText={setNewCategory}
      />

      <Text className="text-base text-[#64748b] my-2.5">
        {t("common.select_icon")}
      </Text>
      
      {icons.length === 0 ? (
        <View className="py-4 items-center">
          <ImageIcon size={32} color="#b0b0b0" />
          <Text className="text-sm text-[#b0b0b0] text-center mt-2">
            {t("common.no_icons_available")}
          </Text>
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          {icons.map((icon) => (
            <TouchableOpacity
              key={icon.id}
              onPress={() => setSelectedIcon(icon)}
              className={`p-1 mr-3 rounded-lg ${
                selectedIcon?.id === icon.id
                  ? "border-[3px] border-[#f59e0b]"
                  : "border border-[#e5e7eb]"
              }`}
            >
              <Image
                source={{ uri: `${getBaseURL()}${icon.iconPath}` }}
                defaultSource={{ uri: "https://placehold.co/50x50" }}
                className="w-[50px] h-[50px] rounded-md"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <TouchableOpacity
        onPress={handleAddCategory}
        className="bg-[#1e293b] p-3 rounded-lg items-center shadow-sm flex-row justify-center gap-2"
      >
        <Plus size={20} color="#f59e0b" />
        <Text className="text-[#f59e0b] text-base font-semibold">
          {t("common.add_category")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddCategory;
