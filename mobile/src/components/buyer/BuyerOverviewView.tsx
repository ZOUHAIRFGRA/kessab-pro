import "../../../global.css";
import React from "react";
import { ScrollView, View, Text } from "react-native";
import { useGetBuyerOverviewQuery } from "../../services";
import { useTranslation } from "react-i18next";
import Loading from "../global/Loading";
import FallBack, { FALLBACK_TYPE } from "../global/Fallback";
import { User, PawPrint, CheckCircle, Clock, DollarSign, CreditCard, Wallet } from "lucide-react-native";

interface BuyerOverviewViewProps {
  id: number;
}

const BuyerOverviewView: React.FC<BuyerOverviewViewProps> = ({ id }) => {
  const { t } = useTranslation();
  
  const { data, isLoading, isError } = useGetBuyerOverviewQuery(id, {
    skip: !id,
  });

  if (isLoading || !data) return <Loading />;
  if (isError) return <FallBack type={FALLBACK_TYPE.NOT_FOUND} />;

  const {
    buyer,
    animalsPickedUp,
    animalsNotPickedUp,
    totalAnimals,
    totalToPay,
    totalPaid,
  } = data;

  const formatCurrency = (value: number) => {
    return value.toFixed(2) + " MAD";
  };

  return (
    <ScrollView className="flex-1 bg-surface-50">
      <View className="flex-1 gap-4 p-4">
        {/* Buyer Info Card */}
        <View className="bg-white rounded-2xl shadow-sm border border-surface-200 p-6 gap-3">
          <View className="flex-row justify-center">
            <View className="bg-primary-700 rounded-full p-4">
              <User size={40} color="#ffffff" strokeWidth={2} />
            </View>
          </View>
          <View className="justify-center items-center">
            <Text className="text-2xl font-bold text-primary-700">
              {buyer.fullName}
            </Text>
          </View>
        </View>

        {/* Animals Statistics Card */}
        <View className="bg-white rounded-2xl shadow-sm border border-surface-200 p-6 gap-4">
          <Text className="text-lg font-bold text-primary-800 mb-2">
            {t("common.AnimalsStatistics")}
          </Text>

          <View className="flex-row justify-between items-center">
            <View className="flex-1 flex-col items-center gap-2">
              <PawPrint size={28} color="#334e68" strokeWidth={2} />
              <Text className="text-xl font-bold text-primary-700">
                {totalAnimals}
              </Text>
              <Text className="text-sm text-surface-600 text-center">
                {t("common.TotalAnimals")}
              </Text>
            </View>

            <View className="flex-1 flex-col items-center gap-2">
              <CheckCircle size={28} color="#16a34a" strokeWidth={2} />
              <Text className="text-xl font-bold text-green-600">
                {animalsPickedUp}
              </Text>
              <Text className="text-sm text-surface-600 text-center">
                {t("common.PickedUp")}
              </Text>
            </View>

            <View className="flex-1 flex-col items-center gap-2">
              <Clock size={28} color="#d97706" strokeWidth={2} />
              <Text className="text-xl font-bold text-accent-600">
                {animalsNotPickedUp}
              </Text>
              <Text className="text-sm text-surface-600 text-center">
                {t("common.NotPickedUp")}
              </Text>
            </View>
          </View>
        </View>

        {/* Payment Card */}
        <View className="bg-white rounded-2xl shadow-sm border border-surface-200 p-6 gap-4">
          <Text className="text-lg font-bold text-primary-800 mb-2">
            {t("common.PaymentSummary")}
          </Text>

          <View className="flex-row items-center mb-3 gap-3">
            <DollarSign size={24} color="#334e68" strokeWidth={2} />
            <View className="flex-1">
              <Text className="text-sm text-surface-600">
                {t("common.TotalToPay")}
              </Text>
              <Text className="text-xl font-bold text-primary-700">
                {formatCurrency(totalToPay)}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center mb-3 gap-3">
            <CreditCard size={24} color="#16a34a" strokeWidth={2} />
            <View className="flex-1">
              <Text className="text-sm text-surface-600">
                {t("common.TotalPaid")}
              </Text>
              <Text className="text-xl font-bold text-green-600">
                {formatCurrency(totalPaid)}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center bg-surface-100 p-4 rounded-xl gap-3">
            <Wallet size={24} color="#243b53" strokeWidth={2} />
            <View className="flex-1">
              <Text className="text-sm text-surface-600">
                {t("common.RemainingBalance")}
              </Text>
              <Text className="text-xl font-bold text-primary-800">
                {formatCurrency(totalToPay - totalPaid)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default BuyerOverviewView;
