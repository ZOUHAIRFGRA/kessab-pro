import "../../../global.css";
import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { User, Calendar, DollarSign } from "lucide-react-native";
import { getAnimalCategoryCounts } from "../../helpers/SaleHelpers";
import { getBaseURL } from "../../services";
import { getValue } from "../../helpers/gloablHelpers";

interface Animal {
  id: string; // UUID
  gallery: string[];
  [key: string]: any;
}

interface Buyer {
  id: string; // UUID
  fullName: string;
  [key: string]: any;
}

interface Sale {
  id: string; // UUID
  animals: Animal[];
  buyer: Buyer;
  saleDate: string;
  agreedAmount: number | string;
  [key: string]: any;
}

interface SaleCardViewProps {
  sale: Sale;
}

const SaleCardView: React.FC<SaleCardViewProps> = ({ sale }) => {
  const navigator = useNavigation();
  
  const handleSaleClick = () => {
    navigator.navigate("SellDetail" as never, { saleId: sale.id } as never);
  };

  return (
    <TouchableOpacity onPress={handleSaleClick}>
      <View className="flex-row bg-white rounded-2xl shadow-sm border border-surface-200 p-4 mx-2">
        <View className="relative w-20 h-20 mr-3">
          <Image
            source={{
              uri: getBaseURL() + sale?.animals[0]?.gallery[0],
            }}
            className="w-full h-full rounded-lg border border-primary-300"
          />
          <View className="absolute -bottom-1 -right-1 bg-primary-700 rounded-full w-6 h-6 items-center justify-center">
            <Text className="text-white text-xs font-bold">
              {sale.animals.length}
            </Text>
          </View>
        </View>

        <View className="flex-1 flex-col justify-center gap-2">
          <Text className="text-base font-bold text-primary-800">
            {getAnimalCategoryCounts(sale)}
          </Text>

          <View className="flex-row items-center gap-2">
            <User size={16} color="#64748b" strokeWidth={2} />
            <Text className="text-sm text-surface-600">
              {getValue(sale.buyer.fullName)}
            </Text>
          </View>

          <View className="flex-row gap-3">
            <View className="flex-1 flex-row items-center gap-1.5">
              <Calendar size={14} color="#64748b" strokeWidth={2} />
              <Text className="text-xs text-surface-600 flex-1" numberOfLines={1}>
                {getValue(sale.saleDate)}
              </Text>
            </View>
            <View className="flex-1 flex-row items-center gap-1.5">
              <DollarSign size={14} color="#d97706" strokeWidth={2} />
              <Text className="text-xs text-amber-600 font-semibold flex-1" numberOfLines={1}>
                {getValue(sale.agreedAmount)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SaleCardView;
