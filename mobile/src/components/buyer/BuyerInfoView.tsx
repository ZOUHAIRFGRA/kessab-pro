import "../../../global.css";
import React from "react";
import { Linking, Pressable, ScrollView, View, Text } from "react-native";
import FallBack, { FALLBACK_TYPE } from "../global/Fallback";
import Loading from "../global/Loading";
import { useGetBuyerByIdQuery } from "../../services";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { getValue } from "../../helpers/gloablHelpers";
import { User, CreditCard, MapPin, Phone, ArrowRight } from "lucide-react-native";

interface BuyerInfoViewProps {
  id: number;
  hideLinkButton?: boolean;
}

const BuyerInfoView: React.FC<BuyerInfoViewProps> = ({ id, hideLinkButton = false }) => {
  const { t } = useTranslation();
  const navigator = useNavigation();

  const { data: buyer, isLoading, isError } = useGetBuyerByIdQuery(id, {
    skip: !id,
  });
  
  const handleBuyerLinkClick = () => {
    if (buyer) {
      navigator.navigate("buyerDetail" as never, { buyerId: buyer.id } as never);
    }
  };

  if (isLoading || !buyer) return <Loading />;
  if (isError) return <FallBack type={FALLBACK_TYPE.NOT_FOUND} />;

  return (
    <ScrollView className="flex-1 bg-surface-50">
      <View className="flex-1 gap-3 p-4">
        <View className="bg-white rounded-2xl shadow-sm border border-surface-200 p-6 gap-6">
          <View className="flex-row justify-center">
            <View className="bg-primary-700 rounded-full p-4">
              <User size={36} color="#ffffff" strokeWidth={2} />
            </View>
          </View>

          <View className="gap-1">
            <Text className="text-sm text-surface-500 font-medium">
              {t("common.FullName")}
            </Text>
            <Text className="text-xl font-bold text-primary-800">
              {getValue(buyer?.fullName)}
            </Text>
          </View>

          <View className="gap-1">
            <View className="flex-row items-center gap-2">
              <CreditCard size={18} color="#334e68" strokeWidth={2} />
              <Text className="text-sm text-surface-500 font-medium">
                {t("common.CIN")}
              </Text>
            </View>
            <Text className="text-lg font-semibold text-primary-700">
              {getValue(buyer?.CIN)}
            </Text>
          </View>

          <View className="gap-1">
            <View className="flex-row items-center gap-2">
              <MapPin size={18} color="#334e68" strokeWidth={2} />
              <Text className="text-sm text-surface-500 font-medium">
                {t("common.Address")}
              </Text>
            </View>
            <Text className="text-lg font-semibold text-primary-700">
              {getValue(buyer?.address)}
            </Text>
          </View>

          <Pressable onPress={() => Linking.openURL(`tel:${buyer.phone}`)}>
            <View className="gap-1">
              <View className="flex-row items-center gap-2">
                <Phone size={18} color="#334e68" strokeWidth={2} />
                <Text className="text-sm text-surface-500 font-medium">
                  {t("common.Phone")}
                </Text>
              </View>
              <Text className="text-lg font-semibold text-primary-700 underline">
                {getValue(buyer?.phone)}
              </Text>
            </View>
          </Pressable>
        </View>

        {!hideLinkButton && (
          <Pressable
            onPress={handleBuyerLinkClick}
            className="bg-primary-700 rounded-xl shadow-sm p-4 mx-3 mb-2 flex-row justify-center items-center gap-2"
          >
            <ArrowRight size={20} color="#ffffff" strokeWidth={2} />
            <Text className="text-white font-bold text-center text-base">
              {t("common.SeeAllBuyerDetails")}
            </Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
};

export default BuyerInfoView;
