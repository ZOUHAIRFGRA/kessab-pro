import "../../../global.css";
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { User, CreditCard, Phone } from "lucide-react-native";
import { getValue } from "../../helpers/gloablHelpers";

interface Buyer {
  id: number;
  fullName: string;
  CIN: string;
  phone: string;
}

interface BuyerCardViewProps {
  buyer: Buyer;
}

const BuyerCardView: React.FC<BuyerCardViewProps> = ({ buyer }) => {
  const navigator = useNavigation();
  
  const handleBuyerClick = () => {
    navigator.navigate("buyerDetail" as never, { buyerId: buyer.id } as never);
  };

  return (
    <TouchableOpacity onPress={handleBuyerClick}>
      <View className="flex-row bg-white rounded-2xl shadow-sm border border-surface-200 p-4 mx-2">
        <View className="justify-center items-center mr-3">
          <View className="bg-primary-700 rounded-full p-3">
            <User size={28} color="#ffffff" strokeWidth={2} />
          </View>
        </View>

        <View className="flex-1 flex-col justify-center gap-2">
          <Text className="text-lg font-bold text-primary-800">
            {getValue(buyer.fullName)}
          </Text>

          <View className="flex-row items-center gap-2">
            <CreditCard size={16} color="#64748b" strokeWidth={2} />
            <Text className="text-sm text-surface-600">
              {getValue(buyer.CIN)}
            </Text>
          </View>

          <View className="flex-row items-center gap-2">
            <Phone size={16} color="#64748b" strokeWidth={2} />
            <Text className="text-sm text-surface-600">
              {getValue(buyer.phone)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BuyerCardView;
