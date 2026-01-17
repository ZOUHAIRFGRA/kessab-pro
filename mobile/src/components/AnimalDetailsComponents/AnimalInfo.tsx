import "../../../global.css";
import { Text, TouchableOpacity, View } from "react-native";
import { Tag, DollarSign, Weight, Users, Calendar, Package, Edit, Trash2 } from "lucide-react-native";

// TypeScript Interfaces
interface Animal {
  id?: string;
  tag?: string;
  price?: number;
  weight?: number;
  sex?: string;
  birthDate?: string;
  pickUpDate?: string;
  category?: string;
  saleId?: string;
  imagePaths?: string[];
}

interface AnimalInfoProps {
  animal: Animal;
  setEditing: (editing: boolean) => void;
  onDelete: () => void;
  isRTL: boolean;
  t: (key: string) => string;
}

export const AnimalInfo = ({
  animal,
  setEditing,
  onDelete,
  isRTL,
  t,
}: AnimalInfoProps) => {
  const animalStatus = animal?.saleId
    ? t("common.Sold")
    : t("common.Available");

  return (
    <View className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
      {/* Header with Status */}
      <View
        className={`px-5 py-4 border-b border-slate-100 ${
          animal?.saleId ? "bg-emerald-50" : "bg-amber-50"
        }`}
      >
        <View
          className="flex-row items-center justify-between"
          style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
        >
          <Text className="text-slate-800 font-bold text-xl">
            {t("common.Animal Details")}
          </Text>
          <View
            className={`px-4 py-1.5 rounded-full ${
              animal?.saleId ? "bg-emerald-500" : "bg-amber-500"
            }`}
          >
            <Text className="text-white font-semibold text-sm">
              {animalStatus}
            </Text>
          </View>
        </View>
      </View>

      {/* Info Rows */}
      <View className="p-5 space-y-3">
        {/* Tag */}
        <View
          className="flex-row items-center py-3 border-b border-slate-100"
          style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
        >
          <View className="bg-slate-100 rounded-xl p-2.5 mr-3">
            <Tag size={20} color="#334155" />
          </View>
          <View className="flex-1">
            <Text className="text-slate-500 text-xs font-medium mb-0.5">
              {t("common.tag")}
            </Text>
            <Text className="text-slate-800 font-semibold text-base">
              {animal.tag}
            </Text>
          </View>
        </View>

        {/* Price */}
        <View
          className="flex-row items-center py-3 border-b border-slate-100"
          style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
        >
          <View className="bg-amber-100 rounded-xl p-2.5 mr-3">
            <DollarSign size={20} color="#f59e0b" />
          </View>
          <View className="flex-1">
            <Text className="text-slate-500 text-xs font-medium mb-0.5">
              {t("common.price")}
            </Text>
            <Text className="text-amber-600 font-bold text-base">
              {animal.price} DH
            </Text>
          </View>
        </View>

        {/* Weight */}
        <View
          className="flex-row items-center py-3 border-b border-slate-100"
          style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
        >
          <View className="bg-blue-100 rounded-xl p-2.5 mr-3">
            <Weight size={20} color="#3b82f6" />
          </View>
          <View className="flex-1">
            <Text className="text-slate-500 text-xs font-medium mb-0.5">
              {t("common.weight")}
            </Text>
            <Text className="text-slate-800 font-semibold text-base">
              {animal.weight} kg
            </Text>
          </View>
        </View>

        {/* Sex */}
        <View
          className="flex-row items-center py-3 border-b border-slate-100"
          style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
        >
          <View className="bg-purple-100 rounded-xl p-2.5 mr-3">
            <Users size={20} color="#a855f7" />
          </View>
          <View className="flex-1">
            <Text className="text-slate-500 text-xs font-medium mb-0.5">
              {t("common.sex")}
            </Text>
            <Text className="text-slate-800 font-semibold text-base">
              {animal.sex}
            </Text>
          </View>
        </View>

        {/* Birth Date */}
        <View
          className="flex-row items-center py-3 border-b border-slate-100"
          style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
        >
          <View className="bg-green-100 rounded-xl p-2.5 mr-3">
            <Calendar size={20} color="#10b981" />
          </View>
          <View className="flex-1">
            <Text className="text-slate-500 text-xs font-medium mb-0.5">
              {t("common.birthDate")}
            </Text>
            <Text className="text-slate-800 font-semibold text-base">
              {animal.birthDate}
            </Text>
          </View>
        </View>

        {/* Pickup Date */}
        <View
          className="flex-row items-center py-3"
          style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
        >
          <View className="bg-orange-100 rounded-xl p-2.5 mr-3">
            <Package size={20} color="#f97316" />
          </View>
          <View className="flex-1">
            <Text className="text-slate-500 text-xs font-medium mb-0.5">
              {t("common.pickup_date")}
            </Text>
            <Text className="text-slate-800 font-semibold text-base">
              {animal.pickUpDate
                ? animal.pickUpDate
                : t("common.pickup_Date_not_set")}
            </Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View
        className="flex-row gap-3 p-5 pt-3 border-t border-slate-100 bg-slate-50"
        style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
      >
        <TouchableOpacity
          onPress={() => setEditing(true)}
          className="flex-1 bg-blue-500 rounded-xl py-3.5 flex-row items-center justify-center shadow-md"
        >
          <Edit size={20} color="white" />
          <Text className="text-white font-bold text-base ml-2">
            {t("common.edit")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDelete}
          className="flex-1 bg-rose-500 rounded-xl py-3.5 flex-row items-center justify-center shadow-md"
        >
          <Trash2 size={20} color="white" />
          <Text className="text-white font-bold text-base ml-2">
            {t("common.delete")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AnimalInfo;
